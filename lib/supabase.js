import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// PENTING: Harus pakai 'export const', bukan 'export default'
export const supabase = createClient(supabaseUrl, supabaseKey);