# Configuration Guide

## Environment Variables

Create a `.env.local` file in the root directory (not tracked by git):

```env
# Email Configuration (Optional - for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://sagorkhan.dev
NEXT_PUBLIC_SITE_NAME=MD Sagor Khan
```

## Content Configuration

All site content is managed in `src/config/content.ts`. This is the single source of truth for:

- Personal information (name, email, phone, social links)
- Hero section copy and animated strengths
- About bio
- Skills (organized by category)
- Work experience and achievements
- Featured projects
- Education and languages
- Contact information

### Updating Content

1. Open `src/config/content.ts`
2. Update the relevant export (e.g., `heroContent`, `experienceContent`)
3. Save the file
4. Changes will hot-reload in development mode
5. Rebuild for production: `npm run build`

### Example: Adding a New Skill

```typescript
export const skillsContent = {
  categories: [
    {
      name: "CX & CRM",
      skills: [
        "Customer Experience Management",
        "New Skill Here", // Add here
        // ...
      ],
    },
    // ...
  ],
};
```

### Example: Adding Experience

```typescript
export const experienceContent = [
  // ... existing entries
  {
    role: "Your New Role",
    company: "Company Name",
    location: "City, Country",
    period: "Start Date – End Date",
    website: "https://company.com",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
    ],
  },
];
```

## Customization

### Colors & Branding

Edit `src/app/globals.css`:

```css
:root {
  --primary: #4f46e5;      /* Main brand color */
  --primary-dark: #6366f1; /* Hover/dark variant */
}
```

Or update Tailwind classes directly in components (e.g., `bg-indigo-600` → `bg-blue-600`).

### Fonts

Fonts are configured in `src/app/layout.tsx`:

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

To use a different font from Google Fonts:

```typescript
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
```

### Animations

Animations are defined in `src/app/globals.css`. Adjust timing and effects:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px); /* Change distance */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out; /* Change duration */
}
```

### Hero Background (Three.js)

Edit `src/components/HeroBackground.tsx` to customize:

- Shape types (Icosahedron, Torus, Octahedron, etc.)
- Colors and materials
- Rotation speed
- Lighting

Example: Change shape color

```typescript
const mat1 = new THREE.MeshPhongMaterial({
  color: 0xff0000, // Red instead of indigo
  emissive: 0xcc0000,
});
```

### Contact Form

The contact form in `src/components/Contact.tsx` currently logs submissions to console.

To enable email delivery:

1. Choose an email service (SendGrid, Resend, Nodemailer, etc.)
2. Update `src/app/api/contact/route.ts`:

```typescript
// Example with SendGrid
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  await sgMail.send({
    to: process.env.CONTACT_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `New message from ${name}`,
    html: `<p>${message}</p><p>From: ${email}</p>`,
    replyTo: email,
  });

  return NextResponse.json({ success: true });
}
```

3. Add environment variables to `.env.local`

## SEO & Meta Tags

Edit `src/app/layout.tsx` to update:

```typescript
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "Your Title",
    description: "Your description",
    url: "https://yourdomain.com",
  },
};
```

## Image Optimization

Place images in `public/images/` and use Next.js `Image` component:

```typescript
import Image from "next/image";

<Image
  src="/images/your-image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority // For above-the-fold images
/>
```

## Performance Tips

1. **Lazy Load Images**: Use `loading="lazy"` or Next.js Image component
2. **Code Splitting**: Components are automatically split by Next.js
3. **Minification**: Enabled by default in production
4. **Caching**: Configure in `next.config.js` if needed

## Deployment Configuration

### Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically

### AWS EC2

See `DEPLOYMENT.md` for detailed instructions.

## Troubleshooting

### Content not updating

- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Restart dev server: `npm run dev`

### Animations not working

- Check browser console for errors
- Ensure GSAP plugins are loaded
- Verify CSS is compiled: `npm run build`

### Build fails

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

## Support

For issues or questions:
- Check the README.md
- Review component comments in source code
- Consult Next.js documentation: https://nextjs.org/docs
