import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mbuigsecmwmhklbtgmrf.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qEbeqX4hZ3P1JYzI2zxdgw_9TvFOnSf'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase: faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
