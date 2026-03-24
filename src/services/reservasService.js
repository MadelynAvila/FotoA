import { supabase } from '../lib/supabaseClient'

export const crearReserva = async ({
  fotografoId,
  clienteId,
  fecha,
  horaInicio,
  horaFin,
  servicio
}) => {
  try {
    const { data, error } = await supabase.from('agenda').insert([
      {
        fotografo_id: fotografoId,
        cliente_id: clienteId,
        fecha,
        horainicio: horaInicio,
        horafin: horaFin,
        servicio
      }
    ])

    if (error) throw error

    return { ok: true, data }
  } catch (error) {
    console.error('Error al crear reserva:', error)
    return { ok: false, error }
  }
}
