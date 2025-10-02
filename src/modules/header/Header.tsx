import styles from './Header.module.css'
import React from 'react'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Mi Página de Prueba Tecnica</h1>
      <img src="/logo.png" alt="logo" className={styles.imagen} />
    </header>
  )
}
