import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email,
  });
  return NextResponse.json(
    { success: true, message: "Message sent successfully." },
    { status: 200 }
  );
} catch (emailError) {
  return NextResponse.json(
    { error: "Failed to send email", detail: String(emailError) },
    { status: 500 }
  );
}
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
