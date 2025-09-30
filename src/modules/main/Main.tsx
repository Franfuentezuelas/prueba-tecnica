import styles from "./Main.module.css";
import ProductList from "../products";
import Formulario from "../formulario";
import Pago from "../pago";
import Finalizar from "../finalizar";
import Envio from "../envio";
import { useState, useEffect } from "react";

type MainProps = {
  setReloadCart: React.Dispatch<React.SetStateAction<boolean>>;
  pasoActual: "inicio" | "datos" | "envio" | "pago" | "final";
  setMainState: React.Dispatch<
    React.SetStateAction<{
      datosForm: boolean;
      datosEnvio: boolean;
      datosPago: boolean;
      datosFinal: boolean;
    }>
  >;
  mainState: {
    datosForm: boolean;
    datosEnvio: boolean;
    datosPago: boolean;
    datosFinal: boolean;
  };
};


export default function Main({ setReloadCart, pasoActual, setMainState }: MainProps) {
  // Estados locales de cada paso
  const [datosForm, setDatosForm] = useState(false);
  const [datosEnvio, setDatosEnvio] = useState(false);
  const [datosPago, setDatosPago] = useState(false);
  const [datosFinal, setDatosFinal] = useState(false);

  // Cada vez que cambie algo, informamos al padre (Home)
  useEffect(() => {
    setMainState({ datosForm, datosEnvio, datosPago, datosFinal });
  }, [datosForm, datosEnvio, datosPago, datosFinal]);

  return (
    <main className={styles.container}>
      <div className={styles.secondRow}>
        {pasoActual === "inicio" && <ProductList setReloadCart={setReloadCart} />}

        {pasoActual === "datos" && (
          <Formulario setDatosCorrectos={setDatosForm} />
        )}

        {pasoActual === "envio" && (
          <Envio setDatosEnvio={setDatosEnvio} />
        )}

        {pasoActual === "pago" && (
          <Pago setDatosPago={setDatosPago} />
        )}

        {pasoActual === "final" && (
          <Finalizar setDatosFinal={setDatosFinal} />
        )}
      </div>
    </main>
  );
}
