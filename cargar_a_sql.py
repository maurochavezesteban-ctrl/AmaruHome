from flask import Flask, render_template, request, redirect
import urllib
from sqlalchemy import create_engine
import pandas as pd
import datetime

app = Flask(__name__)

# Configuración de tu conexión a SQL Server
SERVER = 'DESKTOP-M3BEQUA\\SQLEXPRESS'
DATABASE = 'ShowroomDb'
params = urllib.parse.quote_plus(
    f"DRIVER={{ODBC Driver 17 for SQL Server}};"
    f"SERVER={SERVER};"
    f"DATABASE={DATABASE};"
    f"Trusted_Connection=yes;"
)
engine = create_engine(f"mssql+pyodbc:///?odbc_connect={params}")

@app.route('/')
def home():
    # Levanta el archivo index.html que creamos adentro de templates
    return render_template('index.html')

@app.route('/comprar', methods=['POST'])
def comprar():
    # 1. Capturar los datos del formulario de la web
    producto = request.form['producto']
    categoria = request.form['categoria']
    precio = float(request.form['precio'])
    cantidad = int(request.form['cantidad'])
    
    # 2. Calcular métricas financieras automáticas
    costo_estimado = precio * 0.60
    total_venta = precio * cantidad
    ganancia_neta = total_venta - (costo_estimado * cantidad)
    
    fecha_actual = datetime.date.today().strftime('%Y-%m-%d')
    mes_actual = datetime.date.today().strftime('%B')

    # 3. Armar la fila para SQL
    nueva_fila = {
        'fecha': [fecha_actual],
        'mes': [mes_actual],
        'producto_nombre': [producto],
        'categoria': [categoria],
        'precio_unitario': [precio],
        'cantidad': [cantidad],
        'total_venta': [total_venta],
        'ganancia_neta': [ganancia_neta]
    }
    
    df = pd.DataFrame(nueva_fila)
    
    # 4. Insertar en SQL Server directo
    df.to_sql('ventas_whatsapp', con=engine, if_exists='append', index=False)
    
    # Cartelito de éxito simple
    return f"""
    <div style="font-family:Arial; text-align:center; margin-top:100px;">
        <h2 style="color:green;">¡Venta registrada con éxito en tu SQL Server!</h2>
        <p>Se guardó: {cantidad} unidad/es de {producto}.</p>
        <a href="/" style="background:black; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Volver al Catálogo</a>
    </div>
    """

if __name__ == '__main__':
    app.run(debug=True, port=8080)