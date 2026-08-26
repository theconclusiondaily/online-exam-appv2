import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type FeedbackEmailRequest = {
  to: string;
  studentName?: string | null;
  examTitle?: string | null;
  token: string;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as FeedbackEmailRequest;

    const {
      to,
      studentName,
      examTitle,
      token,
    } = body;

    if (!to || !token) {
      return NextResponse.json(
        {
          error:
            "Recipient email and feedback token are required.",
        },
        { status: 400 }
      );
    }

    const emailUser =
      process.env.TCD_EMAIL_USER;

    const emailPassword =
      process.env.TCD_EMAIL_APP_PASSWORD;

    const replyTo =
      process.env.TCD_EMAIL_REPLY_TO ||
      "support@theconclusiondaily.com";

    const fromName =
      process.env.TCD_EMAIL_FROM_NAME ||
      "The Conclusion Daily";

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.theconclusiondaily.com";

    if (!emailUser || !emailPassword) {
      console.error(
        "TCD email environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const feedbackUrl =
      `${siteUrl}/feedback/${encodeURIComponent(token)}`;

    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

    const safeStudentName =
      studentName?.trim() || "there";

    const safeExamTitle =
      examTitle?.trim() || "your TCD exam";

    await transporter.sendMail({
      from: `"${fromName}" <${emailUser}>`,
      to,
      replyTo,

      subject:
        `How was your ${safeExamTitle} experience?`,

      text: `Hi ${safeStudentName},

Thank you for taking ${safeExamTitle} on The Conclusion Daily.

We'd love to know how your exam experience was.

It takes less than a minute and helps us improve TCD for every student.

Give your feedback:
${feedbackUrl}

Thank you for helping us build a better examination experience.

— Team The Conclusion Daily
`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="
  margin:0;
  padding:0;
  background:#f5f7fb;
  font-family:Arial,Helvetica,sans-serif;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    padding:32px 16px;
  ">

    <div style="
      background:#ffffff;
      border-radius:20px;
      overflow:hidden;
      border:1px solid #e8edf5;
    ">

      <div style="
        background:#274472;
        padding:30px 24px;
        text-align:center;
      ">

        <div style="
          color:#E6C06E;
          font-size:13px;
          font-weight:bold;
          letter-spacing:3px;
          margin-bottom:10px;
        ">
          THE CONCLUSION DAILY
        </div>

        <div style="
          color:#ffffff;
          font-size:26px;
          font-weight:800;
        ">
          How was your exam?
        </div>

      </div>

      <div style="
        padding:32px 26px;
        color:#333333;
      ">

        <p style="font-size:16px;">
          Hi ${escapeHtml(safeStudentName)},
        </p>

        <p style="
          font-size:16px;
          line-height:1.6;
        ">
          Thank you for taking
          <strong>${escapeHtml(safeExamTitle)}</strong>
          on The Conclusion Daily.
        </p>

        <p style="
          font-size:16px;
          line-height:1.6;
        ">
          We'd love to know how your exam experience was.
          It takes less than a minute and helps us improve
          TCD for every student.
        </p>

        <div style="
          text-align:center;
          margin:30px 0;
        ">

          <a
            href="${feedbackUrl}"
            style="
              display:inline-block;
              background:#274472;
              color:#ffffff;
              text-decoration:none;
              padding:15px 28px;
              border-radius:10px;
              font-weight:700;
              font-size:16px;
            "
          >
            Give Your Feedback
          </a>

        </div>

        <p style="
          font-size:13px;
          color:#777777;
          line-height:1.6;
        ">
          Your feedback helps us improve the TCD examination
          experience for future students.
        </p>

      </div>

      <div style="
        background:#f8f9fc;
        padding:20px;
        text-align:center;
        color:#777777;
        font-size:12px;
      ">
        The Conclusion Daily<br />
        Hope &amp; Faith
      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(
      "TCD FEEDBACK EMAIL ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to send feedback email.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}