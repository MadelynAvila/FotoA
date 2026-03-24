import { useEffect, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { supabase } from '../lib/supabaseClient'
import { construirMapaDisponibilidad } from '../utils/calendarUtils'

const CALENDAR_RANGE_DAYS = 90

{/*  PARA VER DISPONIBILIDAD DE HORARIOS CARGA AGENDA DESDE SUPABASE */ }

export const useCalendarAvailability = (fotografos) => {
  const [calendarAvailability, setCalendarAvailability] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchAvailability = useCallback(async () => {
    if (!fotografos?.length) return

    setLoading(true)

    const hoy = dayjs().format('YYYY-MM-DD')
    const limite = dayjs().add(CALENDAR_RANGE_DAYS, 'day').format('YYYY-MM-DD')

    const { data, error } = await supabase
      .from('agenda')
      .select('id, idfotografo, fecha, horainicio, horafin, disponible')
      .gte('fecha', hoy)
      .lte('fecha', limite)

    if (error) {
      setError('No se pudo cargar la disponibilidad')
      setLoading(false)
      return
    }

    const mapa = construirMapaDisponibilidad(fotografos, data, dayjs(hoy))
    setCalendarAvailability(mapa)
    setLoading(false)
  }, [fotografos])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  return { calendarAvailability, loading, error, refetch: fetchAvailability }
}
