# Pipeline ETL — AmaruHome 

## Descripción del Proyecto
Diseño e implementación de un pipeline de datos (ETL) completo para AmaruHome. El sistema automatiza la extracción de eventos interactivos desde el frontend en React, procesa y transforma los datos mediante Python y SQL, y los centraliza en una base de datos relacional para responder preguntas estratégicas de negocio.

## Arquitectura del Pipeline
* **Extracción (E):** Captura de eventos de usuario (clics, consultas, carritos) directamente desde la interfaz en **React**.
* **Transformación (T):** Scripts en **Python** y consultas **SQL** para la limpieza de datos, eliminación de duplicados y estructuración del modelo.
* **Carga (L):** Almacenamiento optimizado en una base de datos relacional.
* **Visualización:** Consolidación de métricas clave en paneles interactivos mediante **Power BI / Looker Studio**.

## Preguntas de Negocio Resueltas
El objetivo final de esta infraestructura es dar respuesta a:
1. ¿Qué productos o categorías generan el mayor volumen de consultas?
2. ¿Cuál es la tasa de conversión real de la plataforma?
3. ¿En qué punto exacto del embudo los usuarios abandonan el sitio?
4. ¿Qué perfil demográfico o de comportamiento define al cliente ideal?

## Tecnologías Utilizadas
* **Frontend:** React, JavaScript
* **Procesamiento:** Python (Pandas)
* **Base de Datos:** SQL (Joins complejos, agregaciones y modelado dimensional)
* **BI:** Power BI / Looker Studio
