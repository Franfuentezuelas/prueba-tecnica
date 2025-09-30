import styles from "./Finalizar.module.css";

type FinalizarProps = {
  setDatosFinal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Finalizar({ setDatosFinal }: FinalizarProps) {
  const handleFinalizar = () => {
    setDatosFinal(true); // marcar finalizado
  };

  return (
    <div>
      <h2>Finalizar Compra</h2>
      <button onClick={handleFinalizar}>Finalizar</button>
    </div>
  );
}
