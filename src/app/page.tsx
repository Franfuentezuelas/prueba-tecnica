"use client";
import { useState, useEffect } from "react";
import Header from "../modules/header";
import Main from "../modules/main/Main";
import Cart from "../modules/cart/Cart";
import { getRequest } from "../services/api";
import { time, timeStamp } from "console";



const health = "health";

type HealthResponse = {
  status: string;
};

export default function Home() {
  const [reloadCart, setReloadCart] = useState(false);

  const pasos = ["inicio", "datos", "pago", "final"] as const;
  type Paso = typeof pasos[number];
  const [pasoActual, setPasoActual] = useState<Paso>("inicio");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getRequest<HealthResponse>(health)
        .then((data) => {
          if (data.status === "ok") {
            setLoading(false);
          } else {
            setLoading(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

  if (loading) return <h1 className="cargando">Conectando con el servidor...</h1>;

  return (
    
    <>
      <Header />
      <Main setReloadCart={setReloadCart} pasoActual={pasoActual} />
      <Cart reload={reloadCart} pasoActual={pasoActual} setPasoActual={setPasoActual} />
    </>
  );
}

