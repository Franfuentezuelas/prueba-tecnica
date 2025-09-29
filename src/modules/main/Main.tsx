import styles from "./Main.module.css";
import ProductList from "../products";
import Formulario from "../formulario";
import Pago from "../pago";
import Finalizar from "../finalizar";
import Envio from "../envio";

type MainProps = {
  setReloadCart: React.Dispatch<React.SetStateAction<boolean>>;
  pasoActual: "inicio" | "datos"| "envio" | "pago" | "final";

};

export default function Main({ setReloadCart, pasoActual }: MainProps) {
  return (
    <main className={styles.container}>
      <div className={styles.secondRow}>
        {pasoActual === "inicio" && <ProductList setReloadCart={setReloadCart} />}
        {pasoActual === "datos" && <Formulario />}
        {pasoActual === "envio" && <Envio />}
        {pasoActual === "pago" && <Pago />}
        {pasoActual === "final" && <Finalizar />}
      </div>
    </main>
  );
}