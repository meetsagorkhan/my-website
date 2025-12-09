# Portfolio Website Deployment Guide

## AWS EC2 + Nginx + Certbot (SSL) Setup

This guide covers deploying your Next.js portfolio to AWS EC2 with Nginx and free SSL via Certbot.

---

## Prerequisites

- AWS EC2 instance (Ubuntu 22.04 LTS recommended)
- Domain name (e.g., sagorkhan.dev)
- SSH access to your EC2 instance
- Elastic IP assigned to your instance

---

## Step 1: Initial Server Setup

### 1.1 Connect to your EC2 instance

```bash
ssh -i your-key.pem ubuntu@your-elastic-ip
```

### 1.2 Update system packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3 Install Node.js and npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 1.4 Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Install Certbot for SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## Step 2: Deploy Your Portfolio

### 2.1 Clone or upload your project

```bash
cd /home/ubuntu
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

Or upload via SCP:

```bash
scp -i your-key.pem -r ./portfolio ubuntu@your-elastic-ip:/home/ubuntu/
```

### 2.2 Install dependencies

```bash
npm install --legacy-peer-deps
```

### 2.3 Build the Next.js project

```bash
npm run build
```

### 2.4 Create a systemd service for your app

Create `/etc/systemd/system/portfolio.service`:

```bash
sudo nano /etc/systemd/system/portfolio.service
```

Paste the following:

```ini
[Unit]
Description=Portfolio Next.js Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/portfolio
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=inherit
StandardError=inherit
Environment="NODE_ENV=production"

[Install]
WantedBy=multi-user.target
```

Save and exit (Ctrl+X, Y, Enter).

### 2.5 Enable and start the service

```bash
sudo systemctl daemon-reload
sudo systemctl enable portfolio
sudo systemctl start portfolio
sudo systemctl status portfolio
```

---

## Step 3: Configure Nginx as Reverse Proxy

### 3.1 Create Nginx configuration

Create `/etc/nginx/sites-available/portfolio`:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste the following (replace `sagorkhan.dev` with your domain):

```nginx
upstream portfolio {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name sagorkhan.dev www.sagorkhan.dev;

    location / {
        proxy_pass http://portfolio;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
}
```

Save and exit.

### 3.2 Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### 3.3 Test and reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 4: Set Up SSL with Certbot

### 4.1 Obtain SSL certificate

```bash
sudo certbot --nginx -d sagorkhan.dev -d www.sagorkhan.dev
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (recommended)

### 4.2 Verify SSL auto-renewal

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
sudo certbot renew --dry-run
```

---

## Step 5: Configure Domain DNS

Point your domain's DNS records to your Elastic IP:

- **A Record**: `sagorkhan.dev` → `your-elastic-ip`
- **A Record**: `www.sagorkhan.dev` → `your-elastic-ip`

Wait for DNS propagation (5-30 minutes).

---

## Step 6: Verify Deployment

1. Visit `https://sagorkhan.dev` in your browser
2. Check SSL certificate: Click the lock icon
3. Verify all sections load correctly
4. Test contact form

---

## Maintenance & Updates

### Update your portfolio

```bash
cd /home/ubuntu/portfolio
git pull origin main
npm install --legacy-peer-deps
npm run build
sudo systemctl restart portfolio
```

### View logs

```bash
sudo journalctl -u portfolio -f
```

### Monitor Nginx

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Restart services

```bash
sudo systemctl restart portfolio
sudo systemctl restart nginx
```

---

## Performance Optimization

### Enable caching headers in Nginx

Add to `/etc/nginx/sites-available/portfolio` under the `location /` block:

```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "public, must-revalidate, proxy-revalidate";
}
```

Then reload:

```bash
sudo systemctl reload nginx
```

---

## Troubleshooting

### Port 3000 already in use

```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Nginx not starting

```bash
sudo nginx -t  # Check for syntax errors
sudo systemctl status nginx
```

### SSL certificate issues

```bash
sudo certbot certificates
sudo certbot renew --force-renewal
```

### Application not responding

```bash
sudo systemctl status portfolio
sudo journalctl -u portfolio -n 50
```

---

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure firewall (UFW)**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Use strong SSH keys** (disable password auth)
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart ssh
   ```

4. **Monitor logs regularly**
   ```bash
   sudo tail -f /var/log/auth.log
   ```

---

## Backup & Recovery

### Backup your portfolio

```bash
tar -czf portfolio-backup.tar.gz /home/ubuntu/portfolio
scp -i your-key.pem ubuntu@your-elastic-ip:/home/ubuntu/portfolio-backup.tar.gz ./
```

### Restore from backup

```bash
tar -xzf portfolio-backup.tar.gz -C /home/ubuntu/
```

---

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)

---

**Last Updated**: December 2025
