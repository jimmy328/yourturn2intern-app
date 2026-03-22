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

### Deployment Steps
1. **GitHub Setup**
   - Push all files to `github.com/jimmy328/yourturn2intern-app`
   - Include: HTML, CSS, JS, assets, config files
   - Exclude: node_modules, .DS_Store, temp files

2. **Vercel Deployment**
   - Import GitHub repo into Vercel
   - Auto-deploy on every push
   - Preview deployments for testing

3. **Domain Configuration (GoDaddy → Vercel)**
   - Point yourturn2intern.org nameservers to Vercel
   - Configure DNS records:
     - A record: Vercel IP
     - CNAME record (www): yourturn2intern.org
   - Wait 24-48 hours for DNS propagation

4. **Verification**
   - Test all pages load correctly
   - Verify mobile responsiveness
   - Check performance metrics
   - Test form submissions (if any)

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

## Next Steps

1. ✅ Create GitHub repo with all files
2. ✅ Configure serve.mjs for Vercel
3. ⏳ Deploy to Vercel
4. ⏳ Configure GoDaddy domain DNS
5. ⏳ Test live site
6. ⏳ Begin Supabase integration (Phase 2)

---

## Notes

- **Serve.mjs Importance:** This Node.js server currently serves static files, but will eventually handle API routes for Supabase queries. Keep it as the entry point.
- **Scalability:** Vercel scales automatically; no server management needed.
- **Cost:** Free tier sufficient for MVP; upgrade as traffic grows.
- **Security:** Use Supabase Row Level Security (RLS) for data access control once integrated.

