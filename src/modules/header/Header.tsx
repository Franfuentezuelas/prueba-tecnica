import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Mi Página de Prueba Tecnica</h1>
      <img src="/logo.png" alt="logo" width="100" height="100" />
    </header>
  );
}
