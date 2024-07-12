// api/ping.js -- a simple query to ping the supabase database so that it doesn't turn off if there's no activity for 7 days.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
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
