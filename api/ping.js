// api/ping.js
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  if (req.method === "GET") {
    // Simple query to keep the database awake
    const { data, error } = await supabase.from("tasks").select("id").limit(1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Ping successful", data });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
