import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tscjrkaryyuoweqnjjqw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY2pya2FyeXl1b3dlcW5qanF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NzQ2NTAsImV4cCI6MjA0MjQ1MDY1MH0.yeIwQkGkjFVis9iMy_jGpX5xgnSkrR1-Gvo6CsWnRkA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
