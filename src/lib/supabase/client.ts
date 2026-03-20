import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Gunakan singleton pattern agar Supabase Browser Client tidak ter-create berulang-ulang
let supabase: ReturnType<typeof createBrowserClient> | undefined;

export const createClient = () => {
  // Jika di server-side (misal saat pre-rendering client component), buat instance baru
  if (typeof window === 'undefined') {
    return createBrowserClient(supabaseUrl!, supabaseKey!);
  }

  // Jika di client-side (browser), gunakan instance yang sudah ada atau buat baru jika belum
  if (!supabase) {
    supabase = createBrowserClient(supabaseUrl!, supabaseKey!);
  }
  
  return supabase;
};
