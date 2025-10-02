import { useState, useEffect } from 'react'
import styles from './Envio.module.css'
import { buscarCiudad } from '../../services/ciudad'

type EnvioProps = {
  setDatosEnvio: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Envio({ setDatosEnvio }: EnvioProps) {
  const [form, setForm] = useState({
    direccion1: '',
    direccion2: '',
    codigoPostal: '',
    ciudad: '',
  })

  const [errores, setErrores] = useState<{ [key: string]: string }>({})
  const [datosCorrectosLocal, setDatosCorrectosLocal] = useState(false)
  const [mismaDireccion, setMismaDireccion] = useState(false)

  // Validar campos
  const validarCampos = (nuevoForm: typeof form, mismaDireccionLocal: boolean) => {
    const nuevosErrores: { [key: string]: string } = {}
    const camposObligatorios = ['direccion1', 'codigoPostal', 'ciudad']

    camposObligatorios.forEach(campo => {
      if (!mismaDireccionLocal && !nuevoForm[campo as keyof typeof form]) {
        nuevosErrores[campo] = 'Campo obligatorio'
      } else {
        nuevosErrores[campo] = ''
      }
    })

    setErrores(nuevosErrores)

    const todoCorrecto = mismaDireccionLocal || Object.values(nuevosErrores).every(e => e === '')

    setDatosCorrectosLocal(todoCorrecto)
    setDatosEnvio(todoCorrecto)
  }

  // Ejecutar validación cada vez que cambie el form o el checkbox
  useEffect(() => {
    validarCampos(form, mismaDireccion)
  }, [form, mismaDireccion])

  // Autocompletar ciudad cuando cambia el código postal
  useEffect(() => {
    const fetchCiudad = async () => {
      if (form.codigoPostal.length === 5) {
        const ciudad = await buscarCiudad(form.codigoPostal)
        setForm(prev => ({ ...prev, ciudad }))
      } else {
        setForm(prev => ({ ...prev, ciudad: '' }))
      }
    }
    fetchCiudad()
  }, [form.codigoPostal])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setMismaDireccion(checked)
  }

  return (
    <div className={styles.formulario}>
      <h1 className={styles.titulo}>Datos de envío</h1>
      <form className={`${styles.list} ${mismaDireccion ? styles.mismaDireccionActive : ''}`}>
        <div className={styles.cartItem}>
          <input type="checkbox" id="mismaDireccion" checked={mismaDireccion} onChange={handleCheckboxChange} />
          <label htmlFor="mismaDireccion">Usar misma dirección que facturación</label>
          <p></p>
        </div>

        <div className={styles.cartItem}>
          <label className={styles.label} htmlFor="direccion1">
            Dirección 1
          </label>
          <input
            type="text"
            id="direccion1"
            name="direccion1"
            value={form.direccion1}
            onChange={handleChange}
            disabled={mismaDireccion}
            className={`${styles.input} ${errores.direccion1 ? styles.inputError : ''}`}
          />
          <p className={`${styles.error} ${errores.direccion1 ? styles.visible : ''}`}>{errores.direccion1}</p>
        </div>

        <div className={styles.cartItem}>
          <label className={styles.label} htmlFor="direccion2">
            Dirección 2
          </label>
          <input
            type="text"
            id="direccion2"
            name="direccion2"
            value={form.direccion2}
            onChange={handleChange}
            disabled={mismaDireccion}
            className={styles.input}
          />
          <p className={styles.error}></p>
        </div>

        <div className={styles.cartItem}>
          <label className={styles.label} htmlFor="codigoPostal">
            Código Postal
          </label>
          <input
            type="text"
            id="codigoPostal"
            name="codigoPostal"
            value={form.codigoPostal}
            onChange={handleChange}
            disabled={mismaDireccion}
            className={`${styles.input} ${errores.codigoPostal ? styles.inputError : ''}`}
          />
          <p className={`${styles.error} ${errores.codigoPostal ? styles.visible : ''}`}>{errores.codigoPostal}</p>
        </div>

        <div className={styles.cartItem}>
          <label className={styles.label} htmlFor="ciudad">
            Ciudad
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={form.ciudad}
            readOnly
            disabled={mismaDireccion}
            className={`${styles.input} ${errores.ciudad ? styles.inputError : ''}`}
          />
          <p className={`${styles.error} ${errores.ciudad ? styles.visible : ''}`}>{errores.ciudad}</p>
        </div>
      </form>

      <p className={styles.datosCorrectos}>¿Datos correctos? {datosCorrectosLocal ? '✅ Sí' : '❌ No'}</p>
    </div>
  )
}
