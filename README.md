# Manny's Garage

Modern auto repair website for Manny's Garage in Fargo, built with Next.js, Tailwind CSS, Supabase, and Twilio.

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
