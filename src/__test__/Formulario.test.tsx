// @vitest-environment jsdom
import { vi } from 'vitest'

// Mock del CSS
vi.mock('../modules/formulario/Formulario.module.css', () => ({
  default: {},
}))

// Mock del servicio buscarCiudad
vi.mock('../../services/ciudad', () => ({
  buscarCiudad: vi.fn().mockResolvedValue('Madrid'),
}))

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Formulario from '../modules/formulario/Formulario'

describe('<Formulario />', () => {
  it('muestra errores de validación y actualiza estado correctamente', async () => {
    const mockSetDatosCorrectos = vi.fn()

    render(<Formulario setDatosCorrectos={mockSetDatosCorrectos} />)

    // Simula escritura en campos obligatorios
    fireEvent.change(screen.getByLabelText('nombre'), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByLabelText('apellidos'), { target: { value: 'Pérez' } })
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'juan@example.com' } })
    fireEvent.change(screen.getByLabelText('direccion1'), { target: { value: 'Calle Falsa 123' } })
    fireEvent.change(screen.getByLabelText('codigoPostal'), { target: { value: '28001' } })

    // Espera a que se actualice la ciudad
    await waitFor(() => {
      expect(screen.getByLabelText('ciudad')).toHaveValue('Madrid')
    })

    // Verifica que no hay errores visibles
    const errores = screen.queryAllByText(/Campo obligatorio|inválido/i)
    expect(errores.length).toBe(0)

    // Verifica que se llama a setDatosCorrectos con true
    expect(mockSetDatosCorrectos).toHaveBeenCalledWith(true)
  })
})
