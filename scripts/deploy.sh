#!/bin/bash

# Portfolio Deployment Script
# Usage: ./scripts/deploy.sh <domain> <elastic-ip>

set -e

DOMAIN=${1:-sagorkhan.dev}
ELASTIC_IP=${2:-your-elastic-ip}
SSH_KEY=${3:-~/.ssh/id_rsa}
REMOTE_USER="ubuntu"

echo "🚀 Starting Portfolio Deployment"
echo "Domain: $DOMAIN"
echo "Elastic IP: $ELASTIC_IP"
echo ""

# Step 1: Build locally
echo "📦 Building Next.js project..."
npm run build

# Step 2: Upload to server
echo "📤 Uploading files to server..."
scp -i "$SSH_KEY" -r . "$REMOTE_USER@$ELASTIC_IP:/home/ubuntu/portfolio"

# Step 3: Install and start on server
echo "⚙️ Installing dependencies and starting service..."
ssh -i "$SSH_KEY" "$REMOTE_USER@$ELASTIC_IP" << 'EOF'
cd /home/ubuntu/portfolio
npm install --legacy-peer-deps
sudo systemctl restart portfolio
echo "✅ Application restarted"
EOF

# Step 4: Setup SSL if not already done
echo "🔒 Checking SSL certificate..."
ssh -i "$SSH_KEY" "$REMOTE_USER@$ELASTIC_IP" << EOF
if ! sudo certbot certificates | grep -q "$DOMAIN"; then
  echo "Setting up SSL for $DOMAIN..."
  sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN
else
  echo "✅ SSL certificate already configured"
fi
EOF

echo ""
echo "✨ Deployment complete!"
echo "Visit: https://$DOMAIN"
echo ""
echo "Useful commands:"
echo "  View logs: ssh -i $SSH_KEY $REMOTE_USER@$ELASTIC_IP 'sudo journalctl -u portfolio -f'"
echo "  Restart app: ssh -i $SSH_KEY $REMOTE_USER@$ELASTIC_IP 'sudo systemctl restart portfolio'"
echo "  Check status: ssh -i $SSH_KEY $REMOTE_USER@$ELASTIC_IP 'sudo systemctl status portfolio'"
