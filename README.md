[GitHub's initial README content]
>>>>>>> some-commit-hash... Initial commit

# Manny's Garage

Modern auto repair website for Manny's Garage in Fargo, ND, built with Next.js, Tailwind CSS, Supabase, and Twilio.

## Features

- Homepage with service highlights and strong booking calls to action
- Floating AI-style booking assistant for repair intake
- **Booking API** — validates requests, saves to Supabase or local demo storage, optional Twilio SMS to owner
- **Demo mode** — with no env vars, bookings are stored in `data/bookings.json` and can be listed at `GET /api/book`
- Optional Supabase persistence for repair leads
- Optional Twilio SMS notifications to the shop owner
- Mobile-first dark theme with orange garage branding

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. (Optional) Copy the environment example and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   You can run without any env vars: bookings are saved to `data/bookings.json` and viewable at [http://localhost:3000/api/book](http://localhost:3000/api/book).

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and use the **Book a repair** assistant to submit a request.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (optional) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase key for inserts (optional) |
| `TWILIO_ACCOUNT_SID` | Twilio account SID (optional) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token (optional) |
| `TWILIO_FROM_NUMBER` | Twilio phone number sending alerts (optional) |
| `OWNER_PHONE_NUMBER` | Owner phone number receiving booking SMS (optional) |

Without Supabase, bookings are stored in `data/bookings.json`. With Supabase, run the SQL in `supabase/schema.sql` to create the `repair_bookings` table.

## Deploy on Vercel

The project is ready to link to Vercel.

### Option A: Deploy with Vercel CLI

1. Install the CLI and log in (if needed):

   ```bash
   npm i -g vercel
   vercel login
   ```

2. From the project root, link and deploy:

   ```bash
   vercel
   ```

   Follow the prompts (link to existing project or create new one). To deploy to production:

   ```bash
   vercel --prod
   ```

### Option B: Deploy from GitHub

1. Push this repo to GitHub (create a new repo, then):

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/manny-garage.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your GitHub repo.

3. Configure env vars in the Vercel project **Settings → Environment Variables** (same as `.env.example`), then deploy.

After deployment, add your env variables in the Vercel dashboard under **Settings → Environment Variables** so booking and optional Supabase/Twilio work in production.
