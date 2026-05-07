import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("re_iiqiSXEi_3a6gs4SuqH8U8yhfVbyiie8n"));
const FROM_EMAIL = "Kiro Print <ziadkabo70@gmail.com>"; // غيرها بإيميلك

serve(async (req) => {
  const { email, code } = await req.json();
  if (!email || !code) return new Response("Missing fields", { status: 400 });

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "كود إعادة تعيين كلمة المرور - Kiro Print",
    html: `<p>كود التحقق الخاص بك هو: <strong>${code}</strong></p>`,
  });

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
});