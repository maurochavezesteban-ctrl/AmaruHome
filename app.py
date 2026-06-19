from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "server":   r"localhost\SQLEXPRESS",
    "database": "AmaruHomeDb",
    "driver":   "ODBC Driver 17 for SQL Server",
}

def get_connection():
    conn_str = (
        f"DRIVER={{{DB_CONFIG['driver']}}};"
        f"SERVER={DB_CONFIG['server']};"
        f"DATABASE={DB_CONFIG['database']};"
        f"Trusted_Connection=yes;"
    )
    return pyodbc.connect(conn_str)


@app.route('/api/agregar_pedido', methods=['POST'])
def agregar_pedido():
    data = request.get_json()

    # Validacion
    for campo in ['email', 'nombre', 'apellido', 'telefono', 'productos', 'total']:
        if campo not in data:
            return jsonify({"error": "Falta el campo: " + campo}), 400

    email     = data['email'].strip().lower()
    nombre    = data['nombre'].strip()
    apellido  = data['apellido'].strip()
    telefono  = data['telefono'].strip()
    productos = data['productos']
    total     = float(data['total'] or 0)

    if not productos:
        return jsonify({"error": "El carrito esta vacio"}), 400

    conn   = None
    cursor = None

    try:
        conn   = get_connection()
        cursor = conn.cursor()

        # ── 1. UPSERT CLIENTE ─────────────────────────────────────────────
        cursor.execute(
            "SELECT cliente_id FROM dbo.clientes WHERE email = ?",
            (email,)
        )
        row = cursor.fetchone()

        if row:
            cliente_id = row[0]
            cursor.execute(
                "UPDATE dbo.clientes SET nombre = ?, apellido = ?, telefono = ? WHERE cliente_id = ?",
                (nombre, apellido, telefono, cliente_id)
            )
            print("Cliente existente actualizado, id:", cliente_id)
        else:
            cursor.execute(
                "INSERT INTO dbo.clientes (email, nombre, apellido, telefono) OUTPUT INSERTED.cliente_id VALUES (?, ?, ?, ?)",
                (email, nombre, apellido, telefono)
            )
            cliente_id = int(cursor.fetchone()[0])
            print("Cliente nuevo insertado, id:", cliente_id)

        # ── 2. INSERTAR PEDIDO ────────────────────────────────────────────
        cursor.execute(
            "INSERT INTO dbo.pedidos (cliente_id, total, estado) OUTPUT INSERTED.pedido_id VALUES (?, ?, ?)",
            (cliente_id, total, 'Pendiente')
        )
        pedido_id = int(cursor.fetchone()[0])
        print("Pedido insertado, id:", pedido_id)

        # ── 3. INSERTAR DETALLES ──────────────────────────────────────────
        for item in productos:
            producto_id     = str(item.get('producto_id', 'SIN_ID'))
            producto_nombre = str(item.get('producto_nombre', 'Sin nombre'))
            categoria       = str(item.get('categoria', 'General'))
            cantidad        = int(item.get('cantidad', 1))
            precio_venta    = float(item.get('precio_venta', 0))

            cursor.execute(
                """INSERT INTO dbo.pedido_detalles
                   (pedido_id, producto_id, producto_nombre, categoria, cantidad, precio_venta)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (pedido_id, producto_id, producto_nombre, categoria, cantidad, precio_venta)
            )
            print("Detalle insertado:", producto_nombre, "x", cantidad)

        conn.commit()
        print("Commit exitoso")

        return jsonify({
            "success":    True,
            "pedido_id":  pedido_id,
            "cliente_id": cliente_id,
            "mensaje":    "Pedido #" + str(pedido_id) + " registrado correctamente."
        }), 201

    except pyodbc.Error as e:
        print("ERROR pyodbc:", str(e))
        if conn:
            conn.rollback()
        return jsonify({"error": "Error de base de datos", "detalle": str(e)}), 500

    except Exception as e:
        print("ERROR general:", str(e))
        if conn:
            conn.rollback()
        return jsonify({"error": "Error interno", "detalle": str(e)}), 500

    finally:
        if cursor: cursor.close()
        if conn:   conn.close()


@app.route('/api/pedidos', methods=['GET'])
def ver_pedidos():
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT p.pedido_id, c.nombre, c.apellido, c.email,
                   p.fecha_pedido, p.total, p.estado
            FROM dbo.pedidos p
            JOIN dbo.clientes c ON p.cliente_id = c.cliente_id
            ORDER BY p.fecha_pedido DESC
        """)
        rows = cursor.fetchall()
        conn.close()

        pedidos = [
            {
                "pedido_id":    r[0],
                "nombre":       r[1],
                "apellido":     r[2],
                "email":        r[3],
                "fecha_pedido": r[4].strftime("%d/%m/%Y %H:%M") if r[4] else '',
                "total":        float(r[5]),
                "estado":       r[6]
            }
            for r in rows
        ]
        return jsonify(pedidos), 200

    except Exception as e:
        print("ERROR ver_pedidos:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
    # forzar reinicio de puerto