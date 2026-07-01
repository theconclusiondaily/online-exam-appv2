import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: NextRequest) {
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

    // Delete paper
    // (paper_questions will also be deleted if ON DELETE CASCADE is configured)
    const { error } = await supabase
      .from("question_papers")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Paper deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete paper.",
      },
      {
        status: 500,
      }
    );
  }
}