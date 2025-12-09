# Deployment Checklist

## Pre-Deployment

### Content & Customization
- [ ] Review all content in `src/config/content.ts`
- [ ] Update personal info (name, email, phone, LinkedIn)
- [ ] Verify all experience dates and achievements
- [ ] Check all skill categories and items
- [ ] Confirm project descriptions and impacts
- [ ] Add your headshot photo to `public/images/`
- [ ] Update About section photo reference if using real image
- [ ] Verify all company website links are correct

### Design & Branding
- [ ] Review color scheme (primary indigo #4f46e5)
- [ ] Check dark/light mode toggle works
- [ ] Test all animations on desktop and mobile
- [ ] Verify responsive design on mobile devices
- [ ] Check font rendering on different browsers
- [ ] Test hero background 3D animation

### Functionality
- [ ] Test contact form submission
- [ ] Verify all navigation links work
- [ ] Check all external links (LinkedIn, WhatsApp, etc.)
- [ ] Test download CV button (add PDF to `public/`)
- [ ] Verify form validation (required fields)
- [ ] Test theme toggle persistence (reload page)

### Performance
- [ ] Run `npm run build` successfully
- [ ] Check bundle size: `npm run build` output
- [ ] Test page load speed locally
- [ ] Verify images are optimized
- [ ] Check for console errors: `npm run dev` → DevTools

### SEO & Meta Tags
- [ ] Update site title in `src/app/layout.tsx`
- [ ] Update meta description
- [ ] Update Open Graph tags
- [ ] Update Twitter card tags
- [ ] Verify keywords are relevant
- [ ] Check robots meta tags

### Security
- [ ] No hardcoded secrets in code
- [ ] Environment variables configured
- [ ] Contact form validation in place
- [ ] CORS headers configured if needed

---

## AWS EC2 Deployment

### Domain & DNS
- [ ] Domain registered (e.g., sagorkhan.dev)
- [ ] Elastic IP allocated
- [ ] DNS A records pointing to Elastic IP
- [ ] DNS propagation verified (5-30 min)

### Server Setup
- [ ] EC2 instance created (Ubuntu 22.04 LTS)
- [ ] SSH key pair created and saved
- [ ] Security group configured (ports 22, 80, 443)
- [ ] Elastic IP associated with instance

### Installation & Deployment
- [ ] SSH access verified: `ssh -i key.pem ubuntu@elastic-ip`
- [ ] System updated: `sudo apt update && sudo apt upgrade -y`
- [ ] Node.js installed: `node --version` shows 18+
- [ ] npm installed: `npm --version`
- [ ] Nginx installed: `sudo systemctl status nginx`
- [ ] Certbot installed: `sudo apt install certbot python3-certbot-nginx`
- [ ] Project cloned/uploaded to `/home/ubuntu/portfolio`
- [ ] Dependencies installed: `npm install --legacy-peer-deps`
- [ ] Build successful: `npm run build`

### Systemd Service
- [ ] Service file created: `/etc/systemd/system/portfolio.service`
- [ ] Service enabled: `sudo systemctl enable portfolio`
- [ ] Service started: `sudo systemctl start portfolio`
- [ ] Service status verified: `sudo systemctl status portfolio`
- [ ] App running on port 3000: `curl http://localhost:3000`

### Nginx Configuration
- [ ] Nginx config created: `/etc/nginx/sites-available/portfolio`
- [ ] Site enabled: `sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/`
- [ ] Default site disabled: `sudo rm /etc/nginx/sites-enabled/default`
- [ ] Nginx syntax valid: `sudo nginx -t`
- [ ] Nginx reloaded: `sudo systemctl reload nginx`
- [ ] Reverse proxy working: `curl http://domain.com`

### SSL Certificate
- [ ] Certbot certificate obtained: `sudo certbot --nginx -d domain.com`
- [ ] Certificate valid: `sudo certbot certificates`
- [ ] Auto-renewal enabled: `sudo systemctl enable certbot.timer`
- [ ] HTTPS working: Visit `https://domain.com`
- [ ] HTTP redirects to HTTPS

### Verification
- [ ] Website accessible at `https://domain.com`
- [ ] All sections load correctly
- [ ] Animations work smoothly
- [ ] Dark/light mode toggles
- [ ] Contact form works
- [ ] Mobile responsive
- [ ] SSL certificate valid (green lock icon)
- [ ] No console errors in browser DevTools

### Performance & Monitoring
- [ ] Gzip compression enabled in Nginx
- [ ] Static asset caching configured
- [ ] Logs accessible: `sudo journalctl -u portfolio -f`
- [ ] Error logs checked: `sudo tail -f /var/log/nginx/error.log`
- [ ] Access logs checked: `sudo tail -f /var/log/nginx/access.log`

---

## Post-Deployment

### Monitoring
- [ ] Set up log monitoring
- [ ] Monitor application errors
- [ ] Check server resource usage
- [ ] Monitor SSL certificate expiration

### Maintenance
- [ ] Document deployment commands
- [ ] Create backup of portfolio directory
- [ ] Test update process
- [ ] Document rollback procedure

### Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Add Hotjar or similar
- [ ] Monitor traffic and user behavior

### Backup & Recovery
- [ ] Backup portfolio files: `tar -czf portfolio-backup.tar.gz /home/ubuntu/portfolio`
- [ ] Backup database (if applicable)
- [ ] Document recovery procedure
- [ ] Test restore process

---

## Vercel Deployment (Alternative)

### Setup
- [ ] GitHub account created
- [ ] Project pushed to GitHub
- [ ] Vercel account created
- [ ] GitHub connected to Vercel

### Configuration
- [ ] Environment variables added to Vercel
- [ ] Build settings configured
- [ ] Domain connected to Vercel
- [ ] SSL certificate auto-generated

### Verification
- [ ] Deployment successful
- [ ] Website accessible
- [ ] All features working
- [ ] Performance metrics good

---

## Content Updates (After Deployment)

### To Update Content
1. Edit `src/config/content.ts`
2. Commit and push to GitHub (if using)
3. Redeploy:
   - **Vercel**: Automatic on push
   - **AWS EC2**: Run `./scripts/deploy.sh domain.com elastic-ip`

### To Update Design
1. Edit component files in `src/components/`
2. Edit styles in `src/app/globals.css`
3. Rebuild and redeploy

### To Update Contact Form Email
1. Choose email service (SendGrid, Resend, etc.)
2. Update `src/app/api/contact/route.ts`
3. Add environment variables
4. Test and redeploy

---

## Troubleshooting During Deployment

### Port 3000 Already in Use
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
sudo systemctl restart portfolio
```

### Nginx Not Starting
```bash
sudo nginx -t  # Check syntax
sudo systemctl status nginx
sudo journalctl -u nginx -n 50
```

### SSL Certificate Issues
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

### Application Not Responding
```bash
sudo systemctl status portfolio
sudo journalctl -u portfolio -n 100
sudo systemctl restart portfolio
```

### DNS Not Resolving
```bash
nslookup domain.com
dig domain.com
# Wait for DNS propagation (5-30 minutes)
```

---

## Security Checklist

- [ ] SSH password auth disabled
- [ ] Firewall configured (UFW)
- [ ] Only necessary ports open (22, 80, 443)
- [ ] System packages updated
- [ ] No hardcoded secrets in code
- [ ] Environment variables used for sensitive data
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] SSL certificate valid and auto-renewing
- [ ] Regular backups scheduled
- [ ] Logs monitored for suspicious activity

---

## Final Verification

- [ ] Website loads in <2 seconds
- [ ] All animations smooth (60 FPS)
- [ ] Mobile responsive (tested on multiple devices)
- [ ] Dark/light mode works
- [ ] Contact form functional
- [ ] SEO tags present
- [ ] SSL certificate valid
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] Ready for production ✅

---

**Deployment Status**: Ready to Deploy 🚀

**Last Updated**: December 2025
