// supabase/functions/send-reset-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!; // or use Supabase SMTP

serve(async (req) => {
  try {
    const { email, code } = await req.json();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kero Print <noreply@resend.dev>",
        to: email,
        subject: "Password Reset Code",
        html: `<p>Your code is: <strong>${code}</strong></p>`,
      }),
    });
    if (!res.ok) throw new Error("Email send failed");
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});