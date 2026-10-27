# Vercel + Supabase orqali ishga tushirish

Sayt Next.js App Router orqali Vercel uchun yig‘iladi. Galereya, media,
sertifikatlar va interaktiv bo‘limlar saqlanadi. Owner Studio Supabase Auth,
Postgres va yopiq Storage bucket bilan ishlaydi. Oldingi Cloudflare D1/R2
bazasi va ChatGPT Sites sessiyasi avtomatik ko‘chmaydi. Repo ichidagi dastlabki
loyihalar saqlanadi; avvalgi hostingga keyinroq yuklangan ma’lumotlarni
ko‘chirish alohida eksport/import talab qiladi.

## Supabase sozlash

1. Supabase’da loyiha yarating va SQL Editor’da [setup.sql](../supabase/setup.sql)ni bajaring.
2. Authentication → Users’da email/parol bilan o‘zingiz uchun tasdiqlangan foydalanuvchi yarating.
   Ommaviy ro‘yxatdan o‘tishni o‘chiring. Boshqa foydalanuvchi Studio’ga kira olmaydi.
3. Project settings / API’dan loyiha URLi, `anon` kaliti va server uchun
   `service_role` kalitini oling. Kalitlarni chat yoki Git’ga yozmang.
4. `portfolio-images` bucket yopiq, 8 MB limit va PNG/JPEG/WebP turlari bilan
   sozlanganini tekshiring. Ommaviy Storage policy kerak emas.

## Vercel sozlash

GitHub repozitoriyni import qiling. Framework: **Next.js**, Node.js: **24.x**.
`vercel.json` install/build buyruqlarini belgilaydi; Output Directory standart `.next`.
Settings → Environment Variables’da quyidagi qiymatlarni xavfsiz kiriting:

| Nomi | Qiymat |
| --- | --- |
| `SUPABASE_URL` | `https://<loyiha>.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase `anon` kaliti, Auth uchun |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase server kaliti; `NEXT_PUBLIC_` prefiksi qo‘shilmasin |
| `PORTFOLIO_OWNER_EMAIL` | Supabase’da yaratgan egasining emaili |
| `SITE_URL` | Ixtiyoriy: asosiy HTTPS domen |

Production va kerak bo‘lsa Preview uchun sozlang, so‘ng deploy/redeploy qiling.
`SITE_URL` berilmasa Vercel production domeni metadata uchun ishlatiladi.
Qidiruv tizimlariga indekslash oldingi loyihadagidek o‘chirilgan.

## Jonli tekshiruv

- `/` va `/projects/coffee-design` ochiladi, media fayllari yuklanadi.
- `/api/projects` HTTP 200 va `canEdit:false` qaytaradi.
- `/login` orqali egasining email/paroli bilan kiring. Studio’da loyiha/rasm qo‘shing.
- Sahifani qayta oching: ma’lumotlar saqlanib qolishi kerak.
- Tahrirlash, arxivlash va tiklashni tekshiring. Chiqishdan keyin yozish HTTP 403 qaytarishi kerak.
- 4.5 MB dan katta, 8 MB gacha rasm bilan sinang. Rasmlar signed URL orqali
  to‘g‘ridan-to‘g‘ri Supabase’ga yuklanadi; Vercel’dan metadata o‘tadi.
- Noto‘g‘ri parol va boshqa email rad etiladi. Sessiya ko‘pi bilan bir soat;
  tugagach qayta kiring. Parol Supabase panelida tiklanadi.

Rasmlar uchun bir daqiqalik signed download havolasi ishlatiladi. Arxivlashdan
keyin yangi havola berilmaydi; oldingi havola bir daqiqagacha ishlashi mumkin.
Bekor qilingan upload’lar `staging/` ichida qolishi mumkin: bir kundan eski
fayllarni Storage paneli/API orqali davriy tozalang. Jadval RLS yoqilgan,
anon/authenticated uchun yopiq; server kaliti brauzerga berilmaydi.

## Mahalliy ishlash

Node.js 24 va pnpm 11.25.0 bilan repo katalogida:

```sh
pnpm install --frozen-lockfile
npm test
npm run typecheck
npm run lint
npm run build
npm run dev
```

Qiymatlarni Git e’tiborsiz qoldiradigan `.env.local` fayliga yozing.
Production tekshiruvi: `npm run start -- --port 3000`. Production login cookie
HTTPS talab qiladi: login/upload’ni Vercel Preview’da yoki mahalliy `npm run dev`
bilan tekshiring. Cloud onboarding muhitida Supabase domeniga tarmoq ruxsati kerak.

Kalitlar yo‘q bo‘lsa build va mavjud media sahifalari ochiladi, ammo storage API
503 qaytaradi va sahifa yuklash xabarini ko‘rsatadi. Bu to‘liq tayyorlik emas;
jonli login/upload tekshiruvini deploydan oldin bajaring.
