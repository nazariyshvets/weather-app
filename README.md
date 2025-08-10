### Weather App

Single Page Application to show current weather for selected cities using OpenWeather.

### Prerequisites

- Node.js 18+ and npm
- An OpenWeather API key (free tier is enough)

### Environment variables

1. Copy the example env file and fill in your key:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

You can obtain a key from `https://openweathermap.org/api`.

### Install & run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Scripts

- `npm run dev`: start development server
- `npm run build`: build for production
- `npm run start`: start production build
- `npm run test`: run tests

### Tech stack

- Next.js App Router
- React 19
- @tanstack/react-query for data fetching and caching
- Ant Design for UI primitives

### Notes

- The app requires `NEXT_PUBLIC_OPENWEATHER_API_KEY` at runtime. Without it, weather requests will fail.
