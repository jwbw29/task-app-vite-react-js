// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.SUPABASE_URL;
const supabaseKey = import.meta.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
