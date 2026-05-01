# Airbnb NYC Analytics Dashboard

An interactive analytics dashboard built with **Next.js**, **TypeScript**, and **Firebase** that visualizes New York City Airbnb listing data across neighborhoods, room types, pricing, and availability.

## Live Demo

> Add your Vercel deployment URL here after deploying.

## Screenshots

> Add screenshots of the dashboard, reports, and house list pages here.

## Features

- **Dashboard** — visualize average prices by room type and neighborhood, price statistics, room type distribution, and a price distribution histogram
- **Reports** — pie chart of listings by neighborhood group, line chart of average availability across neighborhoods
- **House List** — tabular view of all listings with host info, pricing, reviews, and availability data

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with file-based routing
- [TypeScript](https://www.typescriptlang.org/) — static typing throughout
- [Firebase Firestore](https://firebase.google.com/docs/firestore) — NoSQL cloud database
- [Recharts](https://recharts.org/) — composable chart library for React
- [Material UI (MUI)](https://mui.com/) — component library and styling

## Dataset

Based on the [New York City Airbnb Open Data](https://www.kaggle.com/datasets/dgomonov/new-york-city-airbnb-open-data) dataset from Kaggle (~49,000 listings). Data is hosted in Firebase Firestore.

## Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://firebase.google.com/) project with Firestore enabled

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ajaisw13/airbnb_nyc_analytics.git
   cd airbnb_nyc_analytics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file from the example:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your Firebase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the repo in Vercel
3. Add your Firebase environment variables under **Project Settings → Environment Variables**
4. Deploy

## Project Structure

```
├── pages/
│   ├── index.tsx          # Dashboard with 4 charts
│   ├── reports.tsx        # Reports with 2 charts
│   └── houselist.tsx      # Full listings table
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── types.tsx           # AirbnbItem TypeScript type
│   └── charts/            # Individual chart components
├── lib/
│   └── firebase.ts        # Firestore initialization
└── styles/
    └── styles.ts          # MUI style utilities
```

## Author

**Anjali Jaiswal** — [GitHub](https://github.com/ajaisw13)
