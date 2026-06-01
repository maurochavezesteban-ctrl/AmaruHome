import React, { useState, useEffect } from 'react';

const API = 'http://localhost:3001';

export default function AdminPedidos() {
  const [pedidos,  setPedidos]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filtro,   setFiltro]   = useState('todos');
  const [buscador, setBuscador] = useState('');

  // ── Cargar pedidos ──────────────────────────────────────────────────────────
  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/pedidos`);
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPedidos(); }, []);

  // ── Cambiar estado ──────────────────────────────────────────────────────────
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`${API}/pedido/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ estado: nuevoEstado })
      });
      fetchPedidos();
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  // ── Filtros ─────────────────────────────────────────────────────────────────
  const pedidosFiltrados = pedidos
    .filter(p => filtro === 'todos' || p.Estado === (filtro === 'pendientes' ? 'Pendiente' : 'Confirmada'))
    .filter(p => !buscador || p.Cliente?.toLowerCase().includes(buscador.toLowerCase()));

  const totalPendientes  = pedidos.filter(p => p.Estado === 'Pendiente').length;
  const totalConfirmadas = pedidos.filter(p => p.Estado === 'Confirmada').length;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#fbf9f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ margin: 0, color: '#423830', fontSize: '1.8rem' }}>📦 Pedidos AmaruHome</h1>
            <p style={{ margin: '4px 0 0', color: '#888', fontSize: '13px' }}>
              Gestioná los pedidos recibidos por WhatsApp
            </p>
          </div>
          <button onClick={fetchPedidos} style={{
            padding: '10px 18px', backgroundColor: '#8b715b', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
          }}>
            🔄 Actualizar
          </button>
        </div>

        {/* ── Estadísticas ────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <Stat valor={totalPendientes}  label="Pendientes"  color="#856404" bg="#fff3cd" />
          <Stat valor={totalConfirmadas} label="Confirmadas" color="#0f5132" bg="#d1e7dd" />
          <Stat valor={pedidos.length}   label="Total"       color="#423830" bg="#f2ece4" />
        </div>

        {/* ── Buscador + Filtros ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            placeholder="🔍 Buscar por cliente..."
            value={buscador}
            onChange={e => setBuscador(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', padding: '8px 14px',
              border: '1px solid #ebdccb', borderRadius: '8px',
              fontSize: '14px', backgroundColor: '#fff', outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { key: 'todos',       label: 'Todos'       },
              { key: 'pendientes',  label: '⏳ Pendientes' },
              { key: 'confirmadas', label: '✅ Confirmadas' },
            ].map(f => (
              <button key={f.key} onClick={() => setFiltro(f.key)} style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                backgroundColor: filtro === f.key ? '#8b715b' : '#e9e3dd',
                color: filtro === f.key ? '#fff' : '#666',
                fontSize: '13px', fontWeight: '600'
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabla ───────────────────────────────────────────────────────── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            Cargando pedidos...
          </div>
        ) : pedidosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
            No hay pedidos para mostrar
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2ece4' }}>
                  {['#', 'Fecha', 'Cliente', 'Productos', 'Total', 'Estado', 'Acción'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left', fontSize: '13px',
                      fontWeight: '700', color: '#555', borderBottom: '2px solid #e9e3dd'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((p, i) => (
                  <tr key={p.ID} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fdfcfb', borderBottom: '1px solid #f2ece4' }}>
                    <td style={td}>{p.ID}</td>
                    <td style={{ ...td, color: '#888', fontSize: '12px' }}>{p.Fecha}</td>
                    <td style={{ ...td, fontWeight: '600' }}>{p.Cliente}</td>
                    <td style={{ ...td, fontSize: '12px', color: '#666', maxWidth: '260px' }}>{p.Productos}</td>
                    <td style={{ ...td, fontWeight: '700', color: '#8b715b' }}>{p.Total}</td>
                    <td style={td}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                        backgroundColor: p.Estado === 'Confirmada' ? '#d1e7dd' : '#fff3cd',
                        color:           p.Estado === 'Confirmada' ? '#0f5132' : '#856404'
                      }}>
                        {p.Estado}
                      </span>
                    </td>
                    <td style={td}>
                      {p.Estado === 'Pendiente' ? (
                        <button onClick={() => cambiarEstado(p.ID, 'Confirmada')} style={{
                          padding: '6px 14px', backgroundColor: '#25d366', color: '#fff',
                          border: 'none', borderRadius: '6px', cursor: 'pointer',
                          fontSize: '12px', fontWeight: '700'
                        }}>
                          ✓ Confirmar
                        </button>
                      ) : (
                        <button onClick={() => cambiarEstado(p.ID, 'Pendiente')} style={{
                          padding: '6px 14px', backgroundColor: '#f0f0f0', color: '#777',
                          border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
                        }}>
                          ↩ Revertir
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Componente Stat ─────────────────────────────────────────────────────────
function Stat({ valor, label, color, bg }) {
  return (
    <div style={{ backgroundColor: bg, padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.2rem', fontWeight: '700', color }}>{valor}</div>
      <div style={{ fontSize: '13px', color, marginTop: '4px' }}>{label}</div>
    </div>
  );
}

const td = {
  padding: '12px 16px', fontSize: '13px', color: '#333', verticalAlign: 'middle'
};
