# 🍽️ Smikkel Smul - Roast App

**Kroon die Kombuis-Koning** - A fun, competitive family food rating platform where the best dishes get crowned and the worst get roasted!

## 📋 Overview

Smikkel Smul (Roast App) is a Next.js web application designed to bring friendly competition to family gatherings. Create events for special occasions (like Christmas dinners or braais), add dishes, and let family members vote for their favorites. Watch the live leaderboard update in real-time as votes come in!

Perfect for:
- Family reunions and gatherings
- Holiday dinners
- Cooking competitions
- Potlucks
- Any event where multiple people bring food

## ✨ Features

### 🎯 Core Functionality
- **Event Management**: Create and manage multiple food events/gatherings
- **Dish Tracking**: Add dishes with names, cook names, and optional images
- **Live Voting**: Family members can vote for their favorite dishes
- **Real-time Leaderboard**: See rankings update as votes come in
- **One Vote Per Event**: Each user can vote once per event (can change their vote)
- **Public Event Pages**: Shareable links for each event via unique slugs

### 🔐 Authentication & Security
- Secure user authentication via Supabase
- User registration and login
- Protected routes and owner-only management pages
- Session management with server-side rendering

### 🎨 User Interface
- Responsive design for mobile, tablet, and desktop
- Modern, clean interface with TailwindCSS
- Smooth animations and transitions
- Lucide React icons for visual elements
- Afrikaans language interface (localized content)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.0](https://nextjs.org/) (React 19.2.3)
- **Language**: TypeScript
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Runtime**: Node.js
- **Package Manager**: npm/yarn/pnpm/bun

## 📁 Project Structure

```
roast-app/
├── public/                    # Static assets (images, logos)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── auth/              # Authentication callbacks
│   │   ├── dashboard/         # User dashboard & event creation
│   │   ├── event/[slug]/      # Public event pages & voting
│   │   │   └── manage/        # Event management (owner only)
│   │   ├── login/             # Login page
│   │   ├── signup/            # Registration page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   └── utils/
│       └── supabase/          # Supabase client utilities
│           ├── client.ts      # Client-side Supabase
│           └── server.ts      # Server-side Supabase
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roast-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   **Events Table:**
   ```sql
   create table events (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users not null,
     name text not null,
     slug text unique not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

   **Dishes Table:**
   ```sql
   create table dishes (
     id uuid default gen_random_uuid() primary key,
     event_id uuid references events(id) on delete cascade not null,
     dish_name text not null,
     cook_name text not null,
     image_url text,
     yikes_count integer default 0,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

   **Votes Table:**
   ```sql
   create table votes (
     id uuid default gen_random_uuid() primary key,
     event_id uuid references events(id) on delete cascade not null,
     dish_id uuid references dishes(id) on delete cascade not null,
     user_id uuid references auth.users not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     unique(event_id, user_id)
   );
   ```

   **Enable Row Level Security (RLS)** on all tables and add appropriate policies.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### For Event Organizers

1. **Sign Up/Login**: Create an account or login at `/login` or `/signup`
2. **Create an Event**: 
   - Go to your dashboard
   - Click "Skep Byeenkoms" (Create Event)
   - Enter event name and unique slug (e.g., "kersfees-2026")
3. **Add Dishes**:
   - Go to event management page
   - Click "Voeg Gereg By" (Add Dish)
   - Enter dish name, cook name, and optionally upload an image
4. **Share Event Link**: Share the public event URL with participants (e.g., `/event/kersfees-2026`)
5. **View Results**: Watch the live leaderboard update as votes come in

### For Participants

1. **Visit Event Page**: Click the shared event link
2. **Browse Dishes**: View all dishes with photos and cook names
3. **Vote**: Click "Yikes" button on your favorite dish
4. **Change Vote**: You can change your vote anytime before the event closes
5. **View Leaderboard**: See which dishes are winning in real-time

## 🎨 Customization

### Branding
- Replace logos in `/public` directory
- Update color scheme in `globals.css`
- Modify text content in page components

### Language
Currently in Afrikaans. To translate:
- Update all UI strings in page components
- Modify button labels and form fields
- Update landing page copy in `src/app/page.tsx`

## 🏗️ Building for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the server.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Docker containers

Make sure to set the environment variables on your hosting platform.

## 🔧 Configuration

### Next.js Config
Modify `next.config.ts` for Next.js-specific settings.

### TailwindCSS
Customize styling in `postcss.config.mjs` and Tailwind configuration.

### TypeScript
Adjust TypeScript settings in `tsconfig.json`.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🐛 Troubleshooting

### Common Issues

**Authentication not working**
- Check Supabase environment variables
- Verify Supabase URL configuration in callbacks
- Check RLS policies on database tables

**Images not displaying**
- Verify Supabase Storage is configured
- Check image URLs and permissions
- Ensure proper CORS settings

**Votes not counting**
- Check database triggers and RLS policies
- Verify user authentication status
- Check browser console for errors

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

Your Name/Team Name

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Kroon die Kombuis-Koning!** 🏆
