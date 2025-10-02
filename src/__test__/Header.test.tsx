// @vitest-environment jsdom
import { vi } from 'vitest'

// Mock del CSS con exportación por defecto
vi.mock('../modules/header/Header.module.css', () => ({
  default: {},
}))

import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '../modules/header/Header'

describe('<Header />', () => {
  it('muestra el título y el logo', () => {
    render(<Header />)
    expect(screen.getByRole('heading', { name: /Mi Página de Prueba Tecnica/i })).toBeInTheDocument()
    expect(screen.getByAltText('logo')).toHaveAttribute('src', '/logo.png')
  })
})
