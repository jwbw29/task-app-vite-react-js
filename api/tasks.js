// api/tasks.js

import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    console.log("Fetched tasks from DB: ", data);
    res.json(data);
  }

  if (req.method === "POST") {
    console.log(req.body);
    const { title } = req.body;
    const newTask = { title, completed: false };
    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // const { data: tasks, error: fetchError } = await supabase
    //   .from("tasks")
    //   .select("*");

    // if (fetchError) {
    //   return res.status(500).json({ error: fetchError.message });
    // }

    res.json(data[0]);
  }

  if (req.method === "PUT") {
    // update the task
    // what can be updated? title, completed
    const { id } = req.params;
    const { title, completed } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, completed })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // return the updated task
    const { data: updatedTask, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id);

    res.json(updatedTask);
    // OR return the updated list of tasks?
  }

  if (req.method === "DELETE") {
    // delete the task
    const { id } = req.params;

    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    // return the updated list of tasks
    const { data: tasks, error: fetchError } = await supabase
      .from("tasks")
      .select("*");
    res.json(tasks);
  }
};
