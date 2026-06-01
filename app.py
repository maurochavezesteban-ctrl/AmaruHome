import os
from datetime import datetime
import pyodbc
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CONN_STR = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-M3BEQUA\\SQLEXPRESS;"
    "Database=ShowroomDb;"
    "Trusted_Connection=yes;"
)

def obtener_o_crear_cliente(nombre, telefono):
    conn = pyodbc.connect(CONN_STR)
    cursor = conn.cursor()
    
    # Clean up phone number to avoid format mismatches
    telefono_limpio = str(telefono).strip()

    # 1. Buscamos si el cliente ya existe por su teléfono
    cursor.execute("SELECT cliente_id, nombre FROM clientes WHERE telefono = ?", (telefono_limpio,))
    resultado = cursor.fetchone()
    
    if resultado:
        cliente_id = resultado[0]
        print(f"👤 [CLIENTE EXISTENTE] ID: {cliente_id} | Nombre: {resultado[1]}")
    else:
        # 2. Si no existe, lo insertamos en la tabla maestra de clientes
        print(f"✨ [CLIENTE NUEVO] Registrando a {nombre} con tel {telefono_limpio}...")
        cursor.execute(
            "INSERT INTO clientes (nombre, telefono, zona) VALUES (?, ?, 'Web')",
            (nombre, telefono_limpio)
        )
        conn.commit()
        
        # Otenemos el ID que SQL Server le asignó automáticamente
        cursor.execute("SELECT @@IDENTITY")
        cliente_id = int(cursor.fetchone()[0])
        print(f"🆔 [ID ASIGNADO] Se generó el cliente_id: {cliente_id}")
        
    cursor.close()
    conn.close()
    return cliente_id

@app.route('/agregar_pedido', methods=['POST'])
def agregar_pedido():
    try:
        datos = request.json
        print("\n🔎 [CONTROL] DATOS DE WEB RECIBIDOS:", datos)

        if not datos:
            return jsonify({"status": "error", "message": "No JSON received"}), 400

        # Capturamos los datos del formulario de la web
        nombre_cliente = datos.get('cliente_nombre', 'Cliente Anónimo')
        telefono_cliente = datos.get('cliente_telefono', '00000000')
        
        # Lógica inteligente: Obtener ID real de la base de datos
        cliente_id = obtener_o_crear_cliente(nombre_cliente, telefono_cliente)

        producto_id = str(datos.get('producto_id', 'PROD_GENERICO'))
        producto_nombre = datos.get('producto_nombre', 'Producto Web')
        categoria = datos.get('categoria', 'General')
        cantidad = datos.get('cantidad', 1)
        total_costo = datos.get('total_costo', 0)
        
        fecha_actual = datetime.now().strftime('%Y-%m-%d')

        # Insertamos la venta vinculando el cliente_id correcto
        conn = pyodbc.connect(CONN_STR)
        cursor = conn.cursor()
        query = """
            INSERT INTO ventas_whatsapp (
                fecha, cliente_id, cliente, producto_id, producto_nombre, 
                categoria, cantidad, total_costo, estado
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente')
        """
        cursor.execute(query, (fecha_actual, cliente_id, nombre_cliente, producto_id, producto_nombre, categoria, cantidad, total_costo))
        conn.commit()
        
        print(f"✅ [ÉXITO] Venta guardada. Venta vinculada al Cliente ID: {cliente_id}")
        
        cursor.close()
        conn.close()
        
        return jsonify({"status": "success", "message": "Pedido procesado"}), 200

    except Exception as e:
        print(f"❌ [ERROR] Falló en el proceso: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)