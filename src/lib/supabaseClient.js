// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const isDev = import.meta.env.DEV;

const supabaseUrl = isDev
  ? import.meta.env.VITE_SUPABASE_URL
  : process.env.SUPABASE_URL;
const supabaseKey = isDev
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
