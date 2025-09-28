import styles from "./Main.module.css";
import ProductList from "../products";
import Formulario from "../formulario";

type MainProps = {
  setReloadCart: React.Dispatch<React.SetStateAction<boolean>>;
  pasoActual: "inicio" | "datos" | "pago" | "final";

};

export default function Main({ setReloadCart, pasoActual }: MainProps) {
  return (
    <main className={styles.container}>
      <div className={styles.secondRow}>
        {pasoActual === "inicio" && <ProductList setReloadCart={setReloadCart} />}
        {pasoActual === "datos" && <Formulario />}
        {pasoActual === "pago" && <h2>Sección de Pago</h2>}
        {pasoActual === "final" && <h2>Resumen final 🎉</h2>}
      </div>
    </main>
  );
}