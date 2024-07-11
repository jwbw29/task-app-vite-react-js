// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import env from "dotenv";
// import { createClient } from "@supabase/supabase-js";

// // Initialize environment variables
// env.config();

// const app = express();
// const port = process.env.PORT || 8000;

// // Allow CORS for specific domains
// const allowedOrigins = [
//   "http://localhost:3000", // for local development
//   "https://task-app-vite-react-js.vercel.app/", // replace with your actual Vercel domain
//   "https://task-app-vite-react-js-git-main-justins-projects-bbe1d746.vercel.app",
//   "https://task-app-vite-react-80doecqkn-justins-projects-bbe1d746.vercel.app",
// ];

// // Middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps, curl requests)
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Mock data
// // let tasks = [
// //   { id: 1, title: "Learn React", completed: false },
// //   { id: 2, title: "Learn TypeScript", completed: false },
// //   { id: 3, title: "Learn Redux", completed: true },
// // ];

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error("Supabase URL and Key are required.");
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Get all tasks
// app.get("/api/tasks", async (req, res) => {
//   const { data, error } = await supabase.from("tasks").select("*");
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   console.log("Fetched tasks from DB: ", data);
//   res.json(data);
// });

// // Create a new task
// app.post("/api/tasks", async (req, res) => {
//   console.log(req.body);
//   const { title } = req.body;
//   const newTask = { title, completed: false };
//   const { data, error } = await supabase
//     .from("tasks")
//     .insert([newTask])
//     .select();

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   // const { data: tasks, error: fetchError } = await supabase
//   //   .from("tasks")
//   //   .select("*");

//   // if (fetchError) {
//   //   return res.status(500).json({ error: fetchError.message });
//   // }

//   res.json(data[0]);
// });

// // Update a task
// app.put("/api/tasks/:id", async (req, res) => {
//   // update the task
//   // what can be updated? title, completed
//   const { id } = req.params;
//   const { title, completed } = req.body;

//   const { data, error } = await supabase
//     .from("tasks")
//     .update({ title, completed })
//     .eq("id", id);

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   // return the updated task
//   const { data: updatedTask, error: fetchError } = await supabase
//     .from("tasks")
//     .select("*")
//     .eq("id", id);

//   res.json(updatedTask);
//   // OR return the updated list of tasks?
// });

// // Delete a task
// app.delete("/api/tasks/:id", async (req, res) => {
//   // delete the task
//   const { id } = req.params;

//   const { data, error } = await supabase.from("tasks").delete().eq("id", id);
//   // return the updated list of tasks
//   const { data: tasks, error: fetchError } = await supabase
//     .from("tasks")
//     .select("*");
//   res.json(tasks);
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
