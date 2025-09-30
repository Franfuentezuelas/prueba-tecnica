import { useState, useEffect } from "react";
import styles from "./Finalizar.module.css";
import { postRequest } from "../../services/api";

type FinalizarProps = {
  setDatosFinal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Item = {
  productId: string;
  title: string;
  price: number;
  qty: number;
};

type Pedido = {
  id: string;
  accountId: string;
  items: Item[];
  total: number;
  createdAt: string;
};

export default function Finalizar({ setDatosFinal }: FinalizarProps) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(true);

  const urlOrder = "order";

  useEffect(() => {
    // Mostramos "Procesando pago..." durante 1 segundo antes de hacer la petición
    const timer = setTimeout(async () => {
      try {
        const user = process.env.NEXT_PUBLIC_USER;
        if (!user) throw new Error("Usuario no definido en variables de entorno");

        const data = await postRequest<Pedido>(urlOrder, { account: user });
        setPedido(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener el pedido");
      } finally {
        setLoading(false);
        setProcesando(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCerrar = () => {

    window.location.href = "/"; // redirige a home
  };

  if (procesando) {
    return <div className={styles.procesando}>Procesando pago...</div>;
  }

  if (loading) return <p className={styles.loading}>Cargando resumen del pedido...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!pedido) return <p className={styles.error}>No hay pedidos disponibles.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Resumen del Pedido</h2>

      <p className={styles.detalle}><strong>Número de pedido:</strong> {pedido.id}</p>
     
      <p className={styles.detalle}><strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleString()}</p>

      <h3 className={styles.subtitulo}>Products:</h3>
      <ul className={styles.lista}>
        {pedido.items.map((item) => (
          <li key={item.productId} className={styles.item}>
            {item.title} - ${item.price} x {item.qty} = ${item.price * item.qty}
          </li>
        ))}
      </ul>
        <p className={styles.detalle}><strong>Total:</strong> ${pedido.total}</p>

      <button className={styles.botonCerrar} onClick={handleCerrar}>
        Cerrar
      </button>
    </div>
  );
}
