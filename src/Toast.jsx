import { useState, useEffect } from 'react'
import styles from './Toast.module.css'

export function useToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const showToast = (msg) => {
    setMessage(msg)
    setVisible(true)
  }

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setVisible(false), 2500)
      return () => clearTimeout(t)
    }
  }, [visible])

  return { message, visible, showToast }
}

export default function Toast({ message, visible }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      {message}
    </div>
  )
}
