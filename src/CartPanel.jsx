import React, { useState } from 'react'
import styles from './CartPanel.module.css'

const NUMERO_WSP = "5491140643880"

export default function CartPanel({ isOpen, onClose, cart = [], onChangeQty, onRemove, total = 0 }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  const formatearDinero = (numero) => {
    if (!numero) return '$ 0'
    return '$ ' + numero.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  const guardarPedidoEnServidor = async () => {
    try {
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5000/api/agregar_pedido'
        : 'http://192.168.0.1/api/agregar_pedido'

      const partesNombre = nombre.trim().split(' ')
      const nombreLimpio = partesNombre[0] || 'Cliente'
      const apellidoLimpio = partesNombre.slice(1).join(' ') || 'Anonimo'

      const productosMapeados = cart.map((item) => ({
        producto_id:     String(item.id || 'SIN_ID'),
        producto_nombre: item.name     || 'Sin nombre',
        categoria:       item.category || 'General',
        cantidad:        item.qty      || 1,
        precio_venta:    item.price    || 0,
      }))

      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:     email.trim().toLowerCase(),
          nombre:    nombreLimpio,
          apellido:  apellidoLimpio,
          telefono:  telefono.trim(),
          productos: productosMapeados,
          total:     total
        })
      })
    } catch (err) {
      console.warn('No se pudo guardar en el servidor:', err.message)
    }
  }

  let mensajeTexto = '*Cliente:* ' + (nombre.trim() || 'Cliente') + '\n'
  mensajeTexto += 'Hola! Quiero hacer el siguiente pedido en AmaruHome:\n\n'

  cart.forEach(item => {
    const subtotalItem = (item.price || 0) * (item.qty || 1)
    mensajeTexto += '- ' + (item.name || 'Producto') + ' x' + (item.qty || 1) + ' - ' + formatearDinero(subtotalItem) + '\n'
  })

  mensajeTexto += '\n*Total: ' + formatearDinero(total) + '*'

  const textoCodificado = encodeURIComponent(mensajeTexto)
  const linkWhatsApp = 'https://wa.me/' + NUMERO_WSP + '?text=' + textoCodificado

  if (!isOpen) return null

  return (
    <div
      className={styles.panel}
      style={{
        position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '380px',
        height: '100vh', backgroundColor: '#fff',
        boxShadow: '-5px 0 25px rgba(0,0,0,0.15)', zIndex: 9999,
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #f2ece4' }}>
          <h5 style={{ margin: 0, fontFamily: 'serif', fontSize: '1.4rem', color: '#423830' }}>Tu carrito</h5>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
              <i className="bi bi-bag" style={{ fontSize: '32px' }} />
              <p style={{ marginTop: '10px' }}>Tu carrito esta vacio</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={item.id || index}
                style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 0', borderBottom: '1px solid #f9f8f6' }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f2ece4' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#8b715b', fontWeight: '600', marginTop: '2px' }}>{formatearDinero(item.price)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => onChangeQty && onChangeQty(item.id, -1)}
                      style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ebdccb', background: '#fff', cursor: 'pointer' }}
                    >-</button>
                    <span style={{ fontSize: '14px' }}>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQty && onChangeQty(item.id, 1)}
                      style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ebdccb', background: '#fff', cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove && onRemove(item.id)}
                  style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #f2ece4', backgroundColor: '#fbf9f6' }}>

            <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Nombre y Apellido:</label>
              <input
                type="text"
                name="cart_customer_name"
                autoComplete="name"
                placeholder="Ej: Maria Perez"
                value={nombre}
                onChange={(e) => { e.stopPropagation(); setNombre(e.target.value) }}
                onKeyDown={(e) => e.stopPropagation()}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ebdccb', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Correo Electronico:</label>
              <input
                type="email"
                name="cart_customer_email"
                autoComplete="email"
                placeholder="Ej: maria@correo.com"
                value={email}
                onChange={(e) => { e.stopPropagation(); setEmail(e.target.value) }}
                onKeyDown={(e) => e.stopPropagation()}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ebdccb', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Telefono Celular:</label>
              <input
                type="tel"
                name="cart_customer_tel"
                autoComplete="tel"
                placeholder="Ej: 1140643880"
                value={telefono}
                onChange={(e) => { e.stopPropagation(); setTelefono(e.target.value.replace(/[^0-9]/g, '')) }}
                onKeyDown={(e) => e.stopPropagation()}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ebdccb', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#444' }}>Total:</span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#8b715b' }}>{formatearDinero(total)}</span>
            </div>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!nombre.trim() || !email.trim() || telefono.trim().length < 8) {
                  e.preventDefault()
                  alert('Por favor, completa todos los campos correctamente.')
                  return
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(email.trim())) {
                  e.preventDefault()
                  alert('Por favor, ingresa un Correo Electronico valido.')
                  return
                }
                guardarPedidoEnServidor()
              }}
              className={styles.wspBtn}
              style={{
                width: '100%', padding: '14px', backgroundColor: '#25d366',
                color: '#fff', border: 'none', borderRadius: '30px',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', boxShadow: '0 4px 12px rgba(37,211,102,0.2)',
                boxSizing: 'border-box', textDecoration: 'none'
              }}
            >
              <i className="bi bi-whatsapp" /> Pedir por WhatsApp
            </a>

          </div>
        )}

      </div>
    </div>
  )
}