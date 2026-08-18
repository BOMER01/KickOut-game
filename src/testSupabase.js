import { supabase } from "./supabase";

export async function testSupabase() {
  const { data, error } = await supabase.storage
    .from("question-media")
    .list();

  console.log("Supabase Storage:", data);
  console.log("Supabase Error:", error);
}