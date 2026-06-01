import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# 1. Maestro de productos real corregido con la categoría "Cama"
productos = [
    {"id": "PROD_01", "nombre": "Edredon Flannel con Corderito", "cat": "Cama", "precio": 75000, "costo": 62500},
    {"id": "PROD_02", "nombre": "Frazada Coreana 1 1/2", "cat": "Cama", "precio": 42000, "costo": 29500},
    {"id": "PROD_03", "nombre": "Mantas Piel de Conejo / Plush", "cat": "Cama", "precio": 30000, "costo": 17500},
    {"id": "PROD_04", "nombre": "Cortinas Goldsung Combinables", "cat": "Decoracion", "precio": 35000, "costo": 22500},
    {"id": "PROD_05", "nombre": "Cortinas Black Out", "cat": "Decoracion", "precio": 29999, "costo": 17499},
    {"id": "PROD_06", "nombre": "Sabanas Ajustable Full Torero", "cat": "Cama", "precio": 26000, "costo": 13500},
    {"id": "PROD_07", "nombre": "Sabanas Goldsung 2 1/2", "cat": "Cama", "precio": 20000, "costo": 7500},
    {"id": "PROD_08", "nombre": "Toallon Arcoiris", "cat": "Bano", "precio": 18000, "costo": 5500},
    {"id": "PROD_09", "nombre": "Toallon Secado Rapido 3 pz", "cat": "Bano", "precio": 22000, "costo": 9500}
]

# 2. Configuración de la simulación
fecha_inicio = datetime(2026, 1, 1)
fecha_fin = datetime(2026, 5, 30)
dias_totales = (fecha_fin - fecha_inicio).days

registros_ventas = []
venta_id = 1000

clientes_wa = ["María Laura", "Carlos Gómez", "Ana Sol", "Estela M.", "Monique", "Juan bautista", "Clara Rodríguez", "Vecina Planta Alta", "Gaby San Miguel", "Lorena Cuñada"]
metodos_pago = ["Transferencia", "Efectivo"]

# 3. Generación de datos con lógica de negocio
for _ in range(50):
    dias_random = random.randint(0, dias_totales)

    fecha_actual = fecha_inicio + timedelta(days=dias_random)
    
    mes = fecha_actual.month
    dia_mes = fecha_actual.day
    
    # Ponderación estacional ajustada por producto (IDs)
    # En meses de frío (4 y 5: Abril y Mayo), se venden más los abrigos pesados (PROD_01, PROD_02, PROD_03)
    if mes in [4, 5]:
        pesos_productos = [0.22, 0.18, 0.18, 0.08, 0.08, 0.08, 0.06, 0.06, 0.06]
    else:
        pesos_productos = [0.03, 0.03, 0.04, 0.15, 0.15, 0.20, 0.15, 0.13, 0.12]
        
    prod_elegido = random.choices(productos, weights=pesos_productos, k=1)[0]
    
    cantidad = random.choices([1, 2, 3], weights=[0.80, 0.15, 0.05], k=1)[0]
    if dia_mes <= 10 and random.random() > 0.5:
        cantidad += 1

    total_venta = prod_elegido["precio"] * cantidad
    total_costo = prod_elegido["costo"] * cantidad
    ganancia_neta = total_venta - total_costo
    
    registros_ventas.append({
        "venta_id": f"V-{venta_id}",
        "fecha": fecha_actual.strftime("%Y-%m-%d"),
        "cliente": random.choice(clientes_wa),
        "producto_id": prod_elegido["id"],
        "producto_nombre": prod_elegido["nombre"],
        "categoria": prod_elegido["cat"], # Acá impacta el cambio a "Cama"
        "cantidad": cantidad,
        "precio_unitario": prod_elegido["precio"],
        "total_venta": total_venta,
        "total_costo": total_costo,
        "ganancia_neta": ganancia_neta,
        "metodo_pago": random.choice(metodos_pago)
    })
    venta_id += 1

df_ventas = pd.DataFrame(registros_ventas)
df_ventas = df_ventas.sort_values(by="fecha").reset_index(drop=True)

df_ventas.to_csv("ventas_showroom_whatsapp.csv", index=False)
print(f"¡Dataset corregido con éxito! Archivo guardado como 'ventas_showroom_whatsapp.csv'.")