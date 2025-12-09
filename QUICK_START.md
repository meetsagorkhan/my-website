# Quick Start Guide

## 🚀 Get Your Portfolio Running in 5 Minutes

### 1. Install Dependencies

```bash
cd portfolio
npm install --legacy-peer-deps
```

### 2. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser.

### 3. Update Your Content

Edit `src/config/content.ts` with your information:

```typescript
export const siteConfig = {
  name: "Your Name",
  email: "your.email@example.com",
  // ... update all fields
};

export const heroContent = {
  intro: "Your intro text...",
  // ... update all sections
};
```

Changes will hot-reload automatically!

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure at a Glance

```
portfolio/
├── src/config/content.ts          ← Edit this for all content
├── src/components/                ← All UI components
├── src/app/
│   ├── layout.tsx                 ← SEO & global setup
│   ├── page.tsx                   ← Home page
│   ├── globals.css                ← Styles & animations
│   └── api/contact/route.ts       ← Contact form backend
├── DEPLOYMENT.md                  ← AWS EC2 setup guide
├── CONFIG.md                      ← Detailed configuration
└── README.md                       ← Full documentation
```

---

## 🎨 Common Customizations

### Change Brand Color

In `src/app/globals.css`:

```css
:root {
  --primary: #4f46e5;      /* Change this */
  --primary-dark: #6366f1;
}
```

Or update Tailwind classes in components (e.g., `bg-indigo-600` → `bg-blue-600`).

### Add Your Photo

1. Place image in `public/images/photo.jpg`
2. Edit `src/components/About.tsx` line ~30:

```typescript
<Image
  src="/images/photo.jpg"
  alt="Your Name"
  width={320}
  height={320}
/>
```

### Enable Contact Form Email

1. Choose email service (SendGrid, Resend, Gmail)
2. Update `src/app/api/contact/route.ts`
3. Add `.env.local` with credentials

See `CONFIG.md` for detailed instructions.

---

## 🚀 Deployment

### Quick Deploy to AWS EC2

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh sagorkhan.dev your-elastic-ip
```

### Or Deploy to Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

See `DEPLOYMENT.md` for AWS EC2 + Nginx + SSL setup.

---

## 📊 What's Included

✅ **Hero Section** - Animated intro with typed strengths + Three.js background  
✅ **About** - Bio with stats cards  
✅ **Skills** - Animated reveal bars, grouped by category  
✅ **Experience** - Timeline with achievements  
✅ **Projects** - Featured work with impact metrics  
✅ **Contact** - Form + social links  
✅ **Dark/Light Mode** - Auto-toggle with persistence  
✅ **Mobile Responsive** - Works on all devices  
✅ **SEO Optimized** - Meta tags, Open Graph, structured data  
✅ **Performance** - Lazy loading, code splitting, 60 FPS animations  

---

## 🔧 Troubleshooting

### Port 3000 already in use?

```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

### Build fails?

```bash
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Animations not smooth?

- Check browser DevTools for GPU acceleration
- Reduce animation complexity in `globals.css`
- Ensure GSAP is loaded: `npm list gsap`

---

## 📚 Next Steps

1. ✅ Update `src/config/content.ts` with your info
2. ✅ Add your photo to `public/images/`
3. ✅ Customize colors in `globals.css`
4. ✅ Test locally: `npm run dev`
5. ✅ Deploy: See `DEPLOYMENT.md`

---

## 💡 Pro Tips

- **Content Only Changes?** Just edit `src/config/content.ts` and redeploy
- **Want Different Animations?** Edit `src/app/globals.css` keyframes
- **Need More Sections?** Copy a component (e.g., `Projects.tsx`) and add to `page.tsx`
- **SEO Boost?** Update metadata in `src/app/layout.tsx`

---

## 📞 Support

- **Full Docs**: See `README.md`
- **Configuration**: See `CONFIG.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Next.js Help**: https://nextjs.org/docs

---

**Happy building! 🎉**
