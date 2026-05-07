export default async function handler(req, res) {
  const { email, password } = req.body;
  // تحقق من بيانات الأدمن المخزنة في متغيرات البيئة
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
    return res.status(200).json({ role: 'admin', id: 'admin_001' });
  }
  // هنا يمكنك أيضاً التحقق من المستخدمين العاديين من قاعدة البيانات (Supabase)...
  // ...
  res.status(401).json({ error: 'Invalid credentials' });
}