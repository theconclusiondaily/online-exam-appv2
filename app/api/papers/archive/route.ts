import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Paper ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("question_papers")
      .update({
        status: "Archived",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Paper archived successfully.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to archive paper.",
      },
      {
        status: 500,
      }
    );
  }
}