import express from 'express';
import cors from 'cors';
import sql from 'mssql/msnodesqlv8.js';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Ahora apunta al archivo que usas con tus macros de Excel
const EXCEL_PATH = path.join(__dirname, 'pedidos_amaruhome.xlsx');

// ─── Configuración SQL Server (Windows Auth) ─────────────────────────────────
const dbConfig = {
  connectionString:
    'Driver={SQL Server};Server=localhost;Database=ShowroomDb;Trusted_Connection=yes;'
};

// ─── Inicializar Excel con tu nueva estructura ──────────────────────────────
async function inicializarExcel() {
  if (!fs.existsSync(EXCEL_PATH)) {
    const wb    = new ExcelJS.Workbook();
    const sheet = wb.addWorksheet('ventas_whatsapp'); // Mismo nombre que tus macros

    // Columnas idénticas a tu Excel "Gestion_Showroom.xlsm"
    sheet.columns = [
      { header: 'venta_id',        key: 'venta_id',        width: 10 },
      { header: 'fecha',           key: 'fecha',           width: 15 },
      { header: 'cliente_id',      key: 'cliente_id',      width: 12 },
      { header: 'cliente',         key: 'cliente',         width: 25 },
      { header: 'producto_id',     key: 'producto_id',     width: 12 },
      { header: 'producto_nombre', key: 'producto_nombre', width: 30 },
      { header: 'categoria',       key: 'categoria',       width: 15 },
      { header: 'cantidad',        key: 'cantidad',        width: 10 },
      { header: 'total_costo',     key: 'total_costo',     width: 15 },
      { header: 'estado',          key: 'estado',          width: 15 }
    ];

    // Estilo verde corporativo para los encabezados igual a tu imagen
    sheet.getRow(1).eachCell(cell => {
      cell.font      = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF198754' } };
      cell.alignment = { horizontal: 'center' };
    });

    await wb.xlsx.writeFile(EXCEL_PATH);
    console.log('✅ Excel estructurado creado: pedidos_amaruhome.xlsx');
  }
}

// ─── Helpers Excel ────────────────────────────────────────────────────────────
async function agregarFilaExcel(datosVenta) {
  const wb    = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL_PATH);
  const sheet = wb.getWorksheet('ventas_whatsapp');
  
  sheet.addRow({
    venta_id: datosVenta.venta_id,
    fecha: datosVenta.fecha,
    cliente_id: datosVenta.cliente_id,
    cliente: datosVenta.cliente,
    producto_id: datosVenta.producto_id,
    producto_nombre: datosVenta.producto_nombre,
    categoria: datosVenta.categoria,
    cantidad: datosVenta.cantidad,
    total_costo: datosVenta.total_costo,
    estado: 'Pendiente'
  });

  await wb.xlsx.writeFile(EXCEL_PATH);
}

async function actualizarExcel(venta_id, estado) {
  const wb    = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL_PATH);
  const sheet = wb.getWorksheet('ventas_whatsapp');
  sheet.eachRow(row => {
    if (String(row.getCell('venta_id').value) === String(venta_id)) {
      row.getCell('estado').value = estado;
    }
  });
  await wb.xlsx.writeFile(EXCEL_PATH);
}

// ─── POST /pedido (Inserta en SQL Server y escribe en Excel) ──────────────────
app.post('/pedido', async (req, res) => {
  const { cliente_id, cliente, producto_id, producto_nombre, categoria, cantidad, total_costo } = req.body;
  let pool;
  try {
    pool = await sql.connect(dbConfig);

    // Consulta adaptada a tu tabla de SQL vinculada al Excel de Macros
    const result = await pool.request()
      .input('cliente_id',      sql.Int,          cliente_id)
      .input('cliente',         sql.NVarChar(100), cliente)
      .input('producto_id',     sql.Int,          producto_id)
      .input('producto_nombre', sql.NVarChar(150), producto_nombre)
      .input('categoria',       sql.NVarChar(50),  categoria)
      .input('cantidad',        sql.Int,          cantidad)
      .input('total_costo',     sql.Decimal(18,2), total_costo)
      .query(`
        INSERT INTO ventas_whatsapp 
        (fecha, cliente_id, cliente, producto_id, producto_nombre, categoria, cantidad, total_costo, estado)
        OUTPUT INSERTED.venta_id,
               CONVERT(varchar, INSERTED.fecha, 103) AS fecha
        VALUES (GETDATE(), @cliente_id, @cliente, @producto_id, @producto_nombre, @categoria, @cantidad, @total_costo, 'Pendiente')
      `);

    const { venta_id, fecha } = result.recordset[0];
    
    // Guardar en el Excel local temporal de Node
    await agregarFilaExcel({
      venta_id, fecha, cliente_id, cliente, producto_id, producto_nombre, categoria, cantidad, total_costo
    });

    console.log(`📦 Venta #${venta_id} guardada en SQL Server y Excel — ${cliente}`);
    res.json({ ok: true, id: venta_id });

  } catch (err) {
    console.error('Error al guardar pedido:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (pool) pool.close();
  }
});

// ─── GET /pedidos ─────────────────────────────────────────────────────────────
app.get('/pedidos', async (req, res) => {
  let pool;
  try {
    pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT
        venta_id,
        FORMAT(fecha, 'dd/MM/yyyy') AS fecha,
        cliente_id,
        cliente,
        producto_id,
        producto_nombre,
        categoria,
        cantidad,
        total_costo,
        estado
      FROM ventas_whatsapp
      ORDER BY venta_id DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (pool) pool.close();
  }
});

// ─── PATCH /pedido/:id ────────────────────────────────────────────────────────
app.patch('/pedido/:id', async (req, res) => {
  const { id }     = req.params;
  const { estado } = req.body;
  let pool;
  try {
    pool = await sql.connect(dbConfig);

    await pool.request()
      .input('estado',   sql.NVarChar(20), estado)
      .input('venta_id', sql.Int,          parseInt(id))
      .query(`
        UPDATE ventas_whatsapp
        SET estado = @estado
        WHERE venta_id = @venta_id
      `);

    await actualizarExcel(id, estado);

    console.log(`✏️  Venta #${id} → Estado actualizado: ${estado}`);
    res.json({ ok: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (pool) pool.close();
  }
});

// ─── Arranque ─────────────────────────────────────────────────────────────────
inicializarExcel().then(() => {
  app.listen(3001, () => {
    console.log('🚀 Servidor AmaruHome en http://localhost:3001');
    console.log('📊 SQL Server conectado a la tabla: ventas_whatsapp');
    console.log('📁 Sincronizado para Gestion_Showroom.xlsm');
  });
});
