import { horaATotalMinutos } from './timeUtils'

export const WORK_START = 8 * 60
export const WORK_END = 20 * 60
export const STEP = 30
export const MIN_DURATION = 60
export const BUFFER = 60

export const restarIntervalo = (bloques, inicio, fin) => {
  const resultado = []
  for (const [bIni, bFin] of bloques) {
    if (fin <= bIni || inicio >= bFin) {
      resultado.push([bIni, bFin])
    } else {
      if (inicio > bIni) resultado.push([bIni, inicio])
      if (fin < bFin) resultado.push([fin, bFin])
    }
  }
  return resultado
}

export const unirIntervalos = (intervalos) => {
  if (!intervalos.length) return []
  const sorted = [...intervalos].sort((a, b) => a[0] - b[0])
  const resultado = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    const [ini, fin] = sorted[i]
    const last = resultado[resultado.length - 1]
    if (ini <= last[1]) last[1] = Math.max(last[1], fin)
    else resultado.push([ini, fin])
  }

  return resultado
}

export const generarOpcionesInicio = (bloques) => {
  const opciones = []
  bloques.forEach(([ini, fin]) => {
    for (let t = ini; t + MIN_DURATION <= fin; t += STEP) {
      opciones.push(t)
    }
  })
  return opciones
}

export const generarOpcionesFin = (bloques, inicio) => {
  if (!inicio) return []
  const inicioMin = horaATotalMinutos(inicio)
  const bloque = bloques.find(([ini, fin]) => inicioMin >= ini && inicioMin < fin)
  if (!bloque) return []

  const [, finBloque] = bloque
  const opciones = []

  for (
    let t = inicioMin + MIN_DURATION;
    t <= finBloque;
    t += STEP
  ) {
    opciones.push(t)
  }

  return opciones
}
