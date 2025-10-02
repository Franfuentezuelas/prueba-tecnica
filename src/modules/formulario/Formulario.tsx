'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Formulario.module.css'
import { buscarCiudad } from '../../services/ciudad'

export default function Formulario({ setDatosCorrectos }: { setDatosCorrectos: (val: boolean) => void }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion1: '',
    direccion2: '',
    codigoPostal: '',
    ciudad: '',
  })

  const [errores, setErrores] = useState<{ [key: string]: string }>({})
  const [datosCorrectosLocal, setDatosCorrectosLocal] = useState(false)

  // Solo buscar ciudad cuando cambie el código postal
  useEffect(() => {
    const fetchCiudad = async () => {
      if (form.codigoPostal.length === 5) {
        const ciudad = await buscarCiudad(form.codigoPostal)
        // Actualiza solo si la ciudad es diferente
        if (ciudad !== form.ciudad) {
          setForm(prev => ({ ...prev, ciudad }))
        }
      } else if (form.codigoPostal.length !== 5 && form.ciudad !== '') {
        // Limpiar ciudad si el código postal es inválido
        setForm(prev => ({ ...prev, ciudad: '' }))
      }
    }

    fetchCiudad()
  }, [form.codigoPostal]) // solo depende de código postal

  // Validación de todos los campos cada vez que cambie el form
  useEffect(() => {
    const nuevosErrores: { [key: string]: string } = {}
    ;['nombre', 'apellidos', 'email', 'telefono', 'direccion1', 'direccion2', 'codigoPostal', 'ciudad'].forEach(
      campo => {
        const valor = form[campo as keyof typeof form]
        let mensaje = ''

        if (!valor && ['nombre', 'apellidos', 'email', 'direccion1', 'codigoPostal'].includes(campo)) {
          mensaje = 'Campo obligatorio'
        } else if (campo === 'email' && valor && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor)) {
          mensaje = 'Email inválido'
        } else if (campo === 'telefono' && valor && !/^[6789]\d{8}$/.test(valor)) {
          mensaje = 'Teléfono inválido'
        } else if (campo === 'codigoPostal' && valor && !/^\d{5}$/.test(valor)) {
          mensaje = 'Código postal inválido'
        } else if (campo === 'ciudad' && (!valor || valor === 'CP ERRONEO')) {
          mensaje = 'Ciudad inválida'
        }

        nuevosErrores[campo] = mensaje
      },
    )

    setErrores(nuevosErrores)

    const todoCorrecto =
      Object.values(nuevosErrores).every(e => e === '') &&
      ['nombre', 'apellidos', 'email', 'direccion1', 'codigoPostal', 'ciudad'].every(
        campo => form[campo as keyof typeof form],
      )

    setDatosCorrectosLocal(todoCorrecto)
    setDatosCorrectos(todoCorrecto)
  }, [form, setDatosCorrectos])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Validación individual
    let mensaje = ''
    if (!value && ['nombre', 'apellidos', 'email', 'direccion1', 'codigoPostal'].includes(name))
      mensaje = 'Campo obligatorio'
    else if (name === 'email' && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) mensaje = 'Email inválido'
    else if (name === 'telefono' && value && !/^[6789]\d{8}$/.test(value)) mensaje = 'Teléfono inválido'
    else if (name === 'codigoPostal' && value && !/^\d{5}$/.test(value)) mensaje = 'Código postal inválido'
    else if (name === 'ciudad' && (!value || value === 'CP ERRONEO')) mensaje = 'Ciudad inválida'

    setErrores(prev => ({ ...prev, [name]: mensaje }))
  }

  return (
    <div className={styles.formulario}>
      <h1 className={styles.titulo}>Información de facturación</h1>
      <form className={styles.list}>
        {Object.entries(form).map(([campo, valor]) => (
          <div key={campo} className={styles.cartItem}>
            <label className={styles.label} htmlFor={campo}>
              {campo}
            </label>
            <input
              type={campo === 'email' ? 'email' : 'text'}
              name={campo}
              id={campo}
              value={valor}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={campo === 'ciudad'}
              className={`${styles.input} ${errores[campo] ? styles.inputError : ''}`}
            />
            <p className={`${styles.error} ${errores[campo] ? styles.visible : ''}`}>{errores[campo]}</p>
          </div>
        ))}
      </form>
      <p className={styles.datosCorrectos}>¿Datos correctos? {datosCorrectosLocal ? '✅ Sí' : '❌ No'}</p>
    </div>
  )
}
