import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendFeedbackEmail } from "./sendFeedbackEmail";

export async function sendPendingFeedbackEmail(
  attemptId: string
) {
  try {
    // Use the server-side service-role client.
    const supabase = supabaseAdmin;

    // Find the pending feedback request.
    const { data, error } =
      await supabase.rpc(
        "get_pending_feedback_email",
        {
          p_attempt_id: attemptId,
        }
      );

    if (error) {
      console.error(
        "GET PENDING FEEDBACK EMAIL ERROR:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      console.log(
        "No pending feedback email found for attempt:",
        attemptId
      );

      return {
        success: true,
        skipped: true,
      };
    }

    const request = data[0];

    // Send the email.
    await sendFeedbackEmail({
      to: request.email,
      studentName: request.student_name,
      examTitle: request.exam_title,
      token: request.token,
    });

    // Only mark the request as sent AFTER
    // the email has been accepted by SMTP.
    const { error: updateError } =
      await supabase
        .from("exam_feedback_requests")
        .update({
          sent_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          request.request_id
        )
        .is("sent_at", null);

    if (updateError) {
      console.error(
        "FEEDBACK SENT_AT UPDATE ERROR:",
        updateError
      );

      return {
        success: false,
        error: updateError.message,
      };
    }

    return {
      success: true,
      sent: true,
    };

  } catch (error) {
    console.error(
      "SEND PENDING FEEDBACK EMAIL ERROR:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown email error",
    };
  }
}