import os
from datetime import datetime
import pyodbc
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="*")
CONN_STR = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-M3BEQUA\\SQLEXPRESS;"
    "Database=ShowroomDb;"
    "Trusted_Connection=yes;"
)

def obtener_o_crear_cliente(nombre):
    conn = pyodbc.connect(CONN_STR)
    try:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT TOP 1 cliente_id FROM ventas_whatsapp WHERE cliente = ?",
                (nombre,)
            )
            resultado = cursor.fetchone()
            if resultado:
                cliente_id = resultado[0]
                print(f"👤 [CLIENTE EXISTENTE] ID: {cliente_id} | Nombre: {nombre}")
            else:
                cursor.execute("SELECT ISNULL(MAX(cliente_id), 0) + 1 FROM ventas_whatsapp")
                cliente_id = cursor.fetchone()[0]
                print(f"🆔 [CLIENTE NUEVO] ID generado: {cliente_id} | Nombre: {nombre}")
            return cliente_id
        finally:
            cursor.close()
    finally:
        conn.close()

@app.route('/api/agregar_pedido', methods=['POST'])
def agregar_pedido():
    try:
        datos = request.json
        print("\n🔎 [CONTROL] DATOS RECIBIDOS:", datos)

        if not datos:
            return jsonify({"status": "error", "message": "No JSON received"}), 400

        nombre_cliente = datos.get('cliente', 'Cliente Anónimo')
        productos      = datos.get('productos', [])
        total_general  = datos.get('total', 0)

        cliente_id   = obtener_o_crear_cliente(nombre_cliente)
        fecha_actual = datetime.now().strftime('%Y-%m-%d')

        conn = pyodbc.connect(CONN_STR)
        try:
            cursor = conn.cursor()
            try:
                for item in productos:
                    cursor.execute("""
                        INSERT INTO ventas_whatsapp (
                            fecha, cliente_id, cliente, producto_id, producto_nombre,
                            categoria, cantidad, total_costo, estado
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente')
                    """, (
                        fecha_actual,
                        cliente_id,
                        nombre_cliente,
                        item.get('producto_id',     'SIN_ID'),
                        item.get('producto_nombre', 'Sin nombre'),
                        item.get('categoria',       'General'),
                        item.get('cantidad',         1),
                        item.get('total_costo',      0)
                    ))
                conn.commit()
                print(f"✅ [{len(productos)} producto(s)] guardados para cliente_id {cliente_id}")
                return jsonify({"status": "success", "message": f"{len(productos)} producto(s) guardados"}), 200
            finally:
                cursor.close()
        finally:
            conn.close()

    except Exception as e:
        print(f"❌ [ERROR] {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)