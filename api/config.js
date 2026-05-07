export default function handler(req, res) {
  // نرسل فقط ما يحتاجه التطبيق بأمان
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS   // سيتم استخدامه داخل الـ API للتحقق، لا نُظهره للمتصفح أبداً!
  });
}