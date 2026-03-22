# YourTurn2Intern.org - Project Requirements & Launch Plan

## Executive Summary

**YourTurn2Intern** is a dynamic web application providing internship opportunities and resources to students. The platform starts as a curated listing site and will scale to support thousands of internships with multi-user admin capabilities.

**Domain:** yourturn2intern.org (GoDaddy)
**Host:** Vercel
**Database:** Supabase (PostgreSQL)
**Launch Date:** Phase 1 (MVP) Ready for deployment

---

## Current Architecture

### Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js (serve.mjs) - Static file server + API routes
- **Database:** Supabase (PostgreSQL) - Future integration
- **Hosting:** Vercel (Serverless)
- **DNS:** GoDaddy

### Current File Structure
```
yourturn2intern/
├── index.html              # Home/landing page
├── landing.html            # Extended landing page
├── listing.html            # Internship listings page
├── opportunities.html      # Opportunities detail page
├── resources.html          # Resources & guides page
├── serve.mjs              # Node.js server (serves static + future APIs)
├── package.json           # Dependencies & scripts
├── vercel.json            # Vercel deployment config
├── bg-pattern.svg         # Background pattern asset
├── backgrounds/           # Background images
├── brand_assets/          # Logos, icons, fonts
└── .gitignore             # Git ignore rules
```

### Current Features (MVP)
1. **Landing Page** - Hero section, call-to-action, feature highlights
2. **Listings Page** - Browse internship opportunities
3. **Opportunities Detail** - Deep-dive information on specific internships
4. **Resources Page** - Guides, tips, application resources
5. **Responsive Design** - Mobile and desktop optimized

---

## Phase 1: MVP Launch (Now)

### Objectives
- Deploy fully functional static site to Vercel
- Configure yourturn2intern.org domain (GoDaddy → Vercel)
- Verify all pages are accessible and responsive
- Establish CI/CD workflow with GitHub

### Deployment Steps - DETAILED INSTRUCTIONS

#### 1. GitHub Setup ✅ (Already Done)
Files uploaded to: `github.com/jimmy328/yourturn2intern-app`
- ✅ All `.html` files (index.html, landing.html, listing.html, etc.)
- ✅ `serve.mjs`, `package.json`, `vercel.json`
- ✅ Assets: `bg-pattern.svg`, `backgrounds/`, `brand_assets/`
- ✅ `.gitignore`, `PROJECT_PLAN.md`

#### 2. Vercel Deployment ✅ (Already Done)
Status: **SUCCESSFULLY DEPLOYED**
- ✅ Imported GitHub repo into Vercel
- ✅ Automatic builds configured
- ✅ Live at: `yourturn2intern-vercel.vercel.app`

#### 3. Domain Configuration (GoDaddy → Vercel) - IN PROGRESS

**What's Happening:** You're connecting your GoDaddy domain (yourturn2intern.org) to your live Vercel site.

**Step 1: Get the DNS Record from Vercel (ALREADY SHOWN)**
The DNS record Vercel gave you:
```
Type:  A record
Name:  @ (root domain)
Value: 216.198.7.91
```

**Step 2: Add this DNS record to GoDaddy (DETAILED INSTRUCTIONS)**

##### 2a. Login to GoDaddy
1. Go to https://www.godaddy.com
2. Click **Sign In** (top right)
3. Enter your email and password
4. Click **Sign In**

##### 2b. Access Domain Management
1. Once logged in, you should see your account dashboard
2. Look for **"My Products"** or **"Manage Domains"** section
3. Click on **"Domains"** to see your list of domains
4. Find **yourturn2intern.org** in the list
5. Click the domain name (or find a "Manage" button next to it)

##### 2c. Access DNS Settings
1. You're now on the domain details page
2. Look for a **"DNS"** or **"Manage DNS"** tab/button
3. Click on it - this takes you to the DNS management page
4. You should see a list of existing DNS records (A, CNAME, MX records, etc.)

##### 2d. Update the A Record
1. Find the **A record** - it should show `@` or your domain name in the "Name" column
2. Click **Edit** or the pencil icon next to it
3. Change the **Value** to: `216.198.7.91`
4. Click **Save**

##### 2e: Add/Update www Subdomain (Optional but Recommended)
1. Look for a record with `www` in the Name column
2. If it exists, click Edit and set:
   - **Name:** www
   - **Type:** CNAME
   - **Value:** yourturn2intern.org
3. If it doesn't exist, click **Add Record** and create:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** yourturn2intern.org
4. Click **Save**

**Step 3: Wait for DNS Propagation**
- DNS changes take **24-48 hours** to propagate worldwide
- You can test before propagation is complete using: `nslookup yourturn2intern.org` in terminal
- After propagation, yourturn2intern.org will point to your live Vercel site

#### 4. Verification (After DNS Propagates)
1. **Test the domain:** Open https://yourturn2intern.org in browser
2. **Verify all pages load correctly:**
   - Homepage should load
   - Click through all navigation links
   - Check images and styling load properly
3. **Mobile responsiveness:** Open on phone/tablet
4. **Check console for errors:** Right-click → Inspect → Console tab
5. **Performance:** Use https://pagespeed.web.dev to check speed

**SUMMARY OF YOUR URLS:**
- **Temporary Vercel URL:** https://yourturn2intern-vercel.vercel.app (works immediately)
- **Custom Domain:** https://yourturn2intern.org (works after DNS propagates - 24-48 hours)

---

## Phase 2: Supabase Integration (Q2 2026)

### Database Schema
```sql
-- Internships table
CREATE TABLE internships (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  location VARCHAR(255),
  remote BOOLEAN,
  pay_range VARCHAR(100),
  deadline DATE,
  url VARCHAR(512),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Users table (admin)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50),
  created_at TIMESTAMP
);

-- Applications (future feature)
CREATE TABLE applications (
  id UUID PRIMARY KEY,
  user_id UUID,
  internship_id UUID,
  status VARCHAR(50),
  applied_at TIMESTAMP,
  FOREIGN KEY (internship_id) REFERENCES internships(id)
);
```

### Features to Add
1. **Dynamic Listings** - Pull internships from Supabase
2. **Search & Filter** - Filter by location, company, pay, deadline
3. **Admin Dashboard** - CRUD operations for internships
4. **User Accounts** - Student accounts for tracking applications
5. **Email Notifications** - New opportunities matching preferences

---

## Phase 3: Multi-User & Scalability (Q3-Q4 2026)

### Features
1. **Role-Based Access Control**
   - Admin users can manage listings
   - Company users can post internships
   - Students can apply and track applications

2. **Multi-Company Support**
   - Each company has its own dashboard
   - Company-specific analytics

3. **Enhanced Analytics**
   - Application stats
   - Popular internships
   - User engagement metrics

4. **Content Management**
   - Bulk import/export internships
   - Scheduling (post at specific dates)
   - Templated listings

---

## Deployment Architecture

### Vercel Setup
```
yourturn2intern.org
    ↓
Vercel (Serverless)
    ├── Static Files (HTML, CSS, JS, images)
    ├── Node.js Backend (serve.mjs)
    └── API Routes (/api/*)
         ↓
    Supabase (PostgreSQL)
```

### Environment Variables (Vercel)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Continuous Deployment (GitHub → Vercel)
1. Push to `main` branch
2. Vercel auto-deploys to production
3. Preview deployments for PRs

---

## Timeline

| Phase | Timeline | Key Deliverables |
|-------|----------|------------------|
| **Phase 1: MVP** | Now - March 2026 | Live site, domain active |
| **Phase 2: Supabase** | April - June 2026 | Dynamic listings, admin panel |
| **Phase 3: Scale** | July - December 2026 | Multi-user, advanced features |

---

## Success Metrics

- **Phase 1:** Site is live and accessible at yourturn2intern.org
- **Phase 2:** 100+ internships in database, 10+ admin users
- **Phase 3:** 1000+ internships, 100+ monthly active users

---

## Next Steps - YOUR CURRENT TASK

1. ✅ Create GitHub repo with all files
2. ✅ Configure serve.mjs for Vercel
3. ✅ Deploy to Vercel (LIVE at yourturn2intern-vercel.vercel.app)
4. 🔄 **Configure GoDaddy domain DNS** ← YOU ARE HERE
   - Go to GoDaddy.com
   - Find yourturn2intern.org domain
   - Add A record: `216.198.7.91`
   - Add www CNAME: `yourturn2intern.org`
   - Wait 24-48 hours for DNS propagation
5. ⏳ Test live site at yourturn2intern.org (after DNS updates)
6. ⏳ Begin Supabase integration (Phase 2) - April 2026

---

## Notes

- **Serve.mjs Importance:** This Node.js server currently serves static files, but will eventually handle API routes for Supabase queries. Keep it as the entry point.
- **Scalability:** Vercel scales automatically; no server management needed.
- **Cost:** Free tier sufficient for MVP; upgrade as traffic grows.
- **Security:** Use Supabase Row Level Security (RLS) for data access control once integrated.

