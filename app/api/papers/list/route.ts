import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {

  try {

    const supabase =
      await createClient();

    const { data, error } =
      await supabase
        .from("question_papers")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return NextResponse.json({
      success: true,
      papers: data,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        papers: [],
      },
      {
        status: 500,
      }
    );

  }

}