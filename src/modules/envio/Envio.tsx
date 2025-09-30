import { useState } from "react";
import styles from "./Envio.module.css";
import { buscarCiudad } from "../../services/ciudad";

type EnvioProps = {
  setDatosEnvio: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Envio({ setDatosEnvio }: EnvioProps) {
  // aquí validas tu formulario de envío
  const handleValidarEnvio = () => {
    const valido = true; // tu lógica real aquí
    setDatosEnvio(valido);
  };

 
  const [disabledCheckbox, setDisabled] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(e.target.checked);
  };

  const handleBuscarCiudad = async (codigoPostal: string) => {
    await buscarCiudad(codigoPostal);
  };

  return (
    <div className={styles.envio}> 
      <form>
        <div className={styles.cartCheckbox}>
          <input
            type="checkbox"
            id="checkbox"
            className={styles.checkbox}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox">Usar misma dirección que facturación</label>
        </div>

        <div className={styles.cartItem}>
          <label htmlFor="direccion">Dirección</label>
        </div>
        <div className={styles.cartItem}>
          <input
            type="text"
            placeholder="Dirección línea 1 (campo obligatorio)"
            className={styles.direccion1}
            disabled={disabledCheckbox}
          />
        </div>
        <div className={styles.cartItem}>
          <input
            type="text"
            placeholder="Dirección línea 2 (opcional)"
            className={styles.direccion2}
            disabled={disabledCheckbox}
          />
        </div>
        <div className={styles.cartItem}>
          <label htmlFor="codigoPostal">Código postal</label>
          <input
            type="text"
            placeholder="campo obligatorio"
            className={styles.codigoPostal}
            disabled={disabledCheckbox}
            onBlur={(e) => handleBuscarCiudad(e.target.value)}
          />
          <p className={styles.error}>Campo obligatorio</p>
        </div>
        <div className={styles.cartItem}>
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            placeholder="Ciudad"
            className={styles.ciudad}
            id="ciudad"
            readOnly
            disabled={disabledCheckbox}
          />
        </div>
      </form>
          <div>
      <h2>Datos de Envío</h2>
      <button onClick={handleValidarEnvio}>Validar envío</button>
    </div>
    </div>
  );
}

