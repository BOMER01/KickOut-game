import { supabase } from "../supabase";

export async function uploadMedia(file) {
  if (!file) {
    throw new Error("لم يتم اختيار ملف");
  }

  const fileName =
    `${Date.now()}_${file.name}`;

  const filePath =
    `questions/${fileName}`;

  const { error } = await supabase.storage
    .from("question-media")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Supabase Upload Error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("question-media")
    .getPublicUrl(filePath);

  return data.publicUrl;
}