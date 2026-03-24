import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { horaATotalMinutos } from '../utils/timeUtils'

const MIN_BUFFER_MINUTES = 60

export const useFotografoDisponible = (form, fotografos) => {
  const [disponibilidad, setDisponibilidad] = useState({})

  useEffect(() => {
    const evaluar = async () => {
      if (!form.fecha || !form.horaInicio || !form.horaFin) {
        setDisponibilidad({})
        return
      }

      const { data } = await supabase
        .from('agenda')
        .select('idfotografo, horainicio, horafin')
        .eq('fecha', form.fecha)

      const inicio = horaATotalMinutos(form.horaInicio)
      const fin = horaATotalMinutos(form.horaFin)

      const mapa = {}

      fotografos.forEach(f => {
        const sesiones = data?.filter(s => s.idfotografo === f.id) ?? []

        const conflicto = sesiones.some(s => {
          const ini = horaATotalMinutos(s.horainicio)
          const finS = horaATotalMinutos(s.horafin)

          if (fin > ini && inicio < finS) return true
          if (inicio - finS < MIN_BUFFER_MINUTES && inicio - finS >= 0) return true
          if (ini - fin < MIN_BUFFER_MINUTES && ini - fin >= 0) return true

          return false
        })

        mapa[f.id] = !conflicto
      })

      setDisponibilidad(mapa)
    }

    evaluar()
  }, [form.fecha, form.horaInicio, form.horaFin, fotografos])

  return disponibilidad
}
