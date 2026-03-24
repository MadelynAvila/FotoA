import { horaATotalMinutos, minutosAFormato } from './timeUtils'

export const generarOpcionesInicio = (bloques, step, duracionMin) => {
  if (!bloques?.length) return []
  const opciones = []

  bloques.forEach(b => {
    for (let m = b.inicio; m <= b.fin - duracionMin; m += step) {
      opciones.push(minutosAFormato(m))
    }
  })

  return opciones
}

export const generarOpcionesFin = (bloques, horaInicio, step, duracionMin) => {
  if (!horaInicio) return []
  const inicio = horaATotalMinutos(horaInicio)
  if (inicio == null) return []

  const bloque = bloques.find(b => inicio >= b.inicio && inicio < b.fin)
  if (!bloque) return []

  const opciones = []
  for (let m = inicio + duracionMin; m <= bloque.fin; m += step) {
    opciones.push(minutosAFormato(m))
  }

  return opciones
}
