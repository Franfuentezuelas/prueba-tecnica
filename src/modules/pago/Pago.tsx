import styles from "./Pago.module.css";

type PagoProps = {
  setDatosPago: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Pago({ setDatosPago }: PagoProps) {
  const handleValidarPago = () => {
    const valido = true; // tu lógica de validación de pago
    setDatosPago(valido);
  };

  return (
    <div>
      <h2>Pago</h2>
      <button onClick={handleValidarPago}>Confirmar Pago</button>
    </div>
  );
}

