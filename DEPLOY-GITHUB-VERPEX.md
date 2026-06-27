# Deploy D8.Digital via GitHub → Verpex

## How the workflow works

Every time you push a change to GitHub, Verpex pulls the new files and your live site updates automatically. No FTP, no manual uploads.

---

## Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `d8-digital` (or anything you like), set it to **Private**
3. Do **not** initialize with README (your project already has files)
4. Click **Create repository** — copy the repo URL (e.g. `https://github.com/yourusername/d8-digital.git`)

---

## Step 2 — Push your project folder to GitHub

Open Terminal and run these commands. Replace the URL with your own repo URL.

```bash
cd "/Users/tourejones/Claude Code/Demonstr8d to D8.digital"
git init
git add .
git commit -m "Initial commit — D8.Digital site"
git branch -M main
git remote add origin https://github.com/yourusername/d8-digital.git
git push -u origin main
```

---

## Step 3 — Connect GitHub to Verpex

1. Log in to your **Verpex cPanel**
2. Find **Git Version Control** (under Files)
3. Click **Create** → fill in:
   - **Clone URL**: your GitHub repo URL
   - **Repository Path**: the folder on your hosting where the site should live (e.g. `public_html` for your main domain, or `public_html/d8digital` for a subdomain)
   - **Branch**: `main`
4. Click **Create** — Verpex clones your repo to your server

---

## Step 4 — Enable auto-deploy on push (Webhook)

To make Verpex pull automatically every time you push to GitHub:

1. In Verpex cPanel → **Git Version Control** → find your repo → **Manage**
2. Copy the **Deployment URL** (it looks like `https://yourdomain.com/cpanel/git-version-control/...`)
3. Go to your GitHub repo → **Settings** → **Webhooks** → **Add webhook**
4. Paste the Deployment URL → Content type: `application/json` → **Add webhook**

Now every `git push` triggers an automatic deploy. ✅

---

## Daily workflow (after setup)

```bash
# Edit files in your project folder, then:
cd "/Users/tourejones/Claude Code/Demonstr8d to D8.digital"
git add .
git commit -m "describe what you changed"
git push
```

Your site goes live within seconds.

---

## Setting up your Google Calendar API credentials

Before the booking page is live, you need to add your Google Client ID to `book.html`.

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (e.g. "D8.Digital Booking")
3. Enable the **Google Calendar API** (APIs & Services → Library)
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized JavaScript origins: `https://d8.digital` (and `http://localhost:PORT` for local testing)
7. Authorized redirect URIs: `https://d8.digital/book.html`
8. Copy the **Client ID**
9. Open `book.html` and replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your Client ID

---

## File structure reminder

```
/
├── index.html          ← Homepage
├── about.html
├── services.html
├── book.html           ← Booking page (new)
├── blog/
├── work/
├── shared/
│   ├── styles.css      ← Global styles
│   └── components.js   ← Nav + footer (now includes Book a Call link)
├── sitemap.xml
├── robots.txt
└── llms.txt
```
