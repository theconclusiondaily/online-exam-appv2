import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("questions")
      .select(`
        id,
        question,
        subject,
        chapter,
        topic,
        difficulty,
        marks,
        language,
        question_type,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      questions: data,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        questions: [],
      },
      {
        status: 500,
      }
    );

  }
}