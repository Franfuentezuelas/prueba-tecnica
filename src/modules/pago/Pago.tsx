import { useState, useEffect } from 'react'
import styles from './Pago.module.css'

type PagoProps = {
  setDatosPago: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Pago({ setDatosPago }: PagoProps) {
  const [metodo, setMetodo] = useState<'tarjeta' | 'paypal'>('tarjeta')

  const [formTarjeta, setFormTarjeta] = useState({
    numero: '',
    caducidad: '',
    cvv: '',
  })

  const [formPaypal, setFormPaypal] = useState({
    email: '',
    password: '',
  })

  const [erroresTarjeta, setErroresTarjeta] = useState<{ [key: string]: string }>({})
  const [erroresPaypal, setErroresPaypal] = useState<{ [key: string]: string }>({})
  const [datosCorrectos, setDatosCorrectos] = useState(false)

  // Validación automática
  useEffect(() => {
    if (metodo === 'tarjeta') {
      const nuevosErrores: { [key: string]: string } = {}
      const numeroLimpio = formTarjeta.numero.replace(/\s/g, '')
      if (!numeroLimpio || numeroLimpio.length !== 16) {
        nuevosErrores.numero = 'Número inválido (16 dígitos)'
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formTarjeta.caducidad)) {
        nuevosErrores.caducidad = 'MM/AA inválido'
      }
      if (!/^\d{3,4}$/.test(formTarjeta.cvv)) {
        nuevosErrores.cvv = 'CVV inválido'
      }
      setErroresTarjeta(nuevosErrores)
      setDatosCorrectos(Object.keys(nuevosErrores).length === 0)
    } else {
      const nuevosErrores: { [key: string]: string } = {}
      if (!formPaypal.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formPaypal.email)) {
        nuevosErrores.email = 'Email inválido'
      }
      if (!formPaypal.password) {
        nuevosErrores.password = 'Campo obligatorio'
      }
      setErroresPaypal(nuevosErrores)
      setDatosCorrectos(Object.keys(nuevosErrores).length === 0)
    }
  }, [metodo, formTarjeta, formPaypal])

  // Formato automático
  const handleChangeNumeroTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.match(/.{1,4}/g)?.join(' ') || ''
    setFormTarjeta(prev => ({ ...prev, numero: value }))
  }

  const handleChangeCaducidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2)
    setFormTarjeta(prev => ({ ...prev, caducidad: value }))
  }

  const handleChangeCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    setFormTarjeta(prev => ({ ...prev, cvv: value }))
  }

  const handleChangePaypal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormPaypal(prev => ({ ...prev, [name]: value }))
  }

  const handleConfirmarPago = () => {
    setDatosPago(datosCorrectos)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Pago</h1>

      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="metodo"
            value="tarjeta"
            checked={metodo === 'tarjeta'}
            onChange={() => setMetodo('tarjeta')}
          />
          Tarjeta
        </label>
        <label>
          <input
            type="radio"
            name="metodo"
            value="paypal"
            checked={metodo === 'paypal'}
            onChange={() => setMetodo('paypal')}
          />
          PayPal
        </label>
      </div>

      <div className={styles.formWrapper}>
        {metodo === 'tarjeta' && (
          <form className={styles.form}>
            <div className={styles.formItem}>
              <div className={styles.labelErrorRow}>
                <label htmlFor="numero">Número de tarjeta</label>
                <p className={`${styles.error} ${erroresTarjeta.numero ? styles.visible : ''}`}>
                  {erroresTarjeta.numero}
                </p>
              </div>
              <input
                type="text"
                id="numero"
                value={formTarjeta.numero}
                onChange={handleChangeNumeroTarjeta}
                className={`${styles.input} ${erroresTarjeta.numero ? styles.inputError : ''}`}
                maxLength={19}
              />
            </div>

            <div className={styles.rowInputs}>
              <div className={styles.formItem}>
                <div className={styles.labelErrorRow}>
                  <label htmlFor="caducidad">Fecha caducidad</label>
                  <p className={`${styles.error} ${erroresTarjeta.caducidad ? styles.visible : ''}`}>
                    {erroresTarjeta.caducidad}
                  </p>
                </div>
                <input
                  type="text"
                  id="caducidad"
                  value={formTarjeta.caducidad}
                  onChange={handleChangeCaducidad}
                  className={`${styles.input} ${erroresTarjeta.caducidad ? styles.inputError : ''}`}
                  maxLength={5}
                />
              </div>

              <div className={styles.formItem}>
                <div className={styles.labelErrorRow}>
                  <label htmlFor="cvv">CVV</label>
                  <p className={`${styles.error} ${erroresTarjeta.cvv ? styles.visible : ''}`}>{erroresTarjeta.cvv}</p>
                </div>
                <input
                  type="text"
                  id="cvv"
                  value={formTarjeta.cvv}
                  onChange={handleChangeCVV}
                  className={`${styles.input} ${erroresTarjeta.cvv ? styles.inputError : ''}`}
                  maxLength={4}
                />
              </div>
            </div>
          </form>
        )}

        {metodo === 'paypal' && (
          <form className={styles.form}>
            <div className={styles.formItem}>
              <div className={styles.labelErrorRow}>
                <label htmlFor="email">Email PayPal</label>
                <p className={`${styles.error} ${erroresPaypal.email ? styles.visible : ''}`}>{erroresPaypal.email}</p>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formPaypal.email}
                onChange={handleChangePaypal}
                className={`${styles.input} ${erroresPaypal.email ? styles.inputError : ''}`}
              />
            </div>

            <div className={styles.formItem}>
              <div className={styles.labelErrorRow}>
                <label htmlFor="password">Contraseña PayPal</label>
                <p className={`${styles.error} ${erroresPaypal.password ? styles.visible : ''}`}>
                  {erroresPaypal.password}
                </p>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formPaypal.password}
                onChange={handleChangePaypal}
                className={`${styles.input} ${erroresPaypal.password ? styles.inputError : ''}`}
              />
            </div>
          </form>
        )}
      </div>

      <p className={styles.datosCorrectos}>Datos correctos? {datosCorrectos ? '✅ Sí' : '❌ No'}</p>

      <button className={styles.botonPago} disabled={!datosCorrectos} onClick={handleConfirmarPago}>
        Confirmar Pago
      </button>
    </div>
  )
}
