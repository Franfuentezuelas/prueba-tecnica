import { useState } from "react";
import styles from "./Formulario.module.css";
import { buscarCiudad } from "../../services/ciudad";

export default function Formulario() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion1: "",
    direccion2: "",
    codigoPostal: "",
    ciudad: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [datosCorrectos, setDatosCorrectos] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validarCampo = (name: string, value: string) => {
    let mensaje = "";
    if (!value && ["nombre", "apellidos", "email", "direccion1", "codigoPostal"].includes(name)) {
      mensaje = "Campo obligatorio";
    } else if (name === "email" && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      mensaje = "Email inválido";
    } else if (name === "telefono" && value && !/^\d{9}$/.test(value)) {
      mensaje = "Teléfono inválido";
    }

    setErrores((prev) => ({ ...prev, [name]: mensaje }));

    // Recalcular si todo está correcto
    const nuevosErrores = { ...errores, [name]: mensaje };
    const todoCorrecto =
      Object.values(nuevosErrores).every((e) => e === "") &&
      ["nombre", "apellidos", "email", "direccion1", "codigoPostal"].every((campo) => form[campo as keyof typeof form]);

    setDatosCorrectos(todoCorrecto);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validarCampo(name, value);
  };

  const handleBuscarCiudad = async (codigoPostal: string) => {
    await buscarCiudad(codigoPostal);
  };

  return (
  <div className={styles.formulario}>
    <h1>Información de facturación</h1>
    <form className={styles.list}>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.nombre ? styles.visible : ""}`}>
          {errores.nombre}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="apellidos">Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={form.apellidos}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errores.apellidos ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.apellidos ? styles.visible : ""}`}>
          {errores.apellidos}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errores.email ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.email ? styles.visible : ""}`}>
          {errores.email}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errores.telefono ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.telefono ? styles.visible : ""}`}>
          {errores.telefono}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="direccion1">Dirección 1</label>
        <input
          type="text"
          name="direccion1"
          value={form.direccion1}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errores.direccion1 ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.direccion1 ? styles.visible : ""}`}>
          {errores.direccion1}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="direccion2">Dirección 2</label>
        <input
          type="text"
          name="direccion2"
          value={form.direccion2}
          onChange={handleChange}
          className={styles.input}
        />
        <p className={styles.error}></p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="codigoPostal">Código Postal</label>
        <input
          type="text"
          name="codigoPostal"
          value={form.codigoPostal}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            handleBuscarCiudad(e.target.value);
          }}
          className={`${styles.input} ${errores.codigoPostal ? styles.inputError : ""}`}
        />
        <p className={`${styles.error} ${errores.codigoPostal ? styles.visible : ""}`}>
          {errores.codigoPostal}
        </p>
      </div>

      <div className={styles.cartItem}>
        <label className={styles.label} htmlFor="ciudad">Ciudad</label>
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={form.ciudad}
          readOnly
          className={styles.input}
        />
        <p className={styles.error}></p>
      </div>
    </form>

    <p>¿Datos correctos? {datosCorrectos ? "✅ Sí" : "❌ No"}</p>
  </div>
);

}

