import { createClient } from "@supabase/supabase-js";

// Log environment variables to verify they are being accessed correctly
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

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

  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  }

  const { userId } = req.query;

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, userId } = req.body;
      const newTask = { title, completed: false, user_id: userId };
      const { data, error } = await supabase
        .from("tasks")
        .insert([newTask])
        .select();
      if (error) {
        throw error;
      }
      return res.status(201).json(data[0]);
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
        throw error;
      }
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
