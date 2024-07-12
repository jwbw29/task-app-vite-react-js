import { createClient } from "@supabase/supabase-js";

// Supabase client
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
  const { userId } = req.query;

  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  }

  if (req.method === "POST") {
    const { title, userId } = req.body;
    const newTask = { title, completed: false, user_id: userId };
    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data[0]);
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const { title, completed } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, completed })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  }
};
