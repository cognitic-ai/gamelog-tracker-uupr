# Game Tracker App

A beautiful iOS-style app to track video games you've played and games in your backlog.

## Features

- **Library** - Track games you've completed with ratings
- **Backlog** - Manage games you want to play
- **Game Search** - Search for games with cover art from the RAWG database
- **Dark Mode** - Full support for light and dark themes

## Get Started

1. Install dependencies

   ```bash
   bun install
   ```

2. Configure RAWG API (Optional - for game search with covers)

   Get a free API key from [rawg.io/apidocs](https://rawg.io/apidocs) (20,000 requests/month free)

   Add your API key to `src/hooks/use-game-search.ts`:
   ```typescript
   const RAWG_API_KEY = "YOUR_API_KEY_HERE";
   ```

3. Start the app

   ```bash
   bunx expo
   ```

## Manual Entry

The app works without an API key - you can manually enter game details including title, platform, status, rating, and notes.
