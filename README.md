# Game Tracker App

A beautiful iOS-style app to track video games you've played and games in your backlog with real-time cloud sync powered by Convex.

## Features

- **Library** - Track games you've completed with ratings and completion dates
- **Backlog** - Manage games you want to play
- **Game Search** - Search for games with cover art from the RAWG database
- **Multi-User Support** - Each user has their own game library
- **Real-Time Sync** - All data syncs instantly across devices via Convex
- **Cloud Storage** - Your games are stored securely in the cloud
- **Dark Mode** - Full support for light and dark themes

## Get Started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up Convex (Required for data storage)

See detailed instructions in [CONVEX_SETUP.md](./CONVEX_SETUP.md)

Quick start:
```bash
bunx convex dev
```

This will prompt you to:
- Login to Convex (or create a free account)
- Create a new project
- Deploy your backend schema and functions

### 3. Configure RAWG API (Optional - for game search)

Get a free API key from [rawg.io/apidocs](https://rawg.io/apidocs) (20,000 requests/month free)

Your API key is already configured in `src/hooks/use-game-search.ts`

### 4. Start the app

In a separate terminal:
```bash
bunx expo start
```

## What's Stored

- **Users** - User profiles and account information
- **Games** - All game data including:
  - Title, platform, cover image
  - Status (Played/Backlog)
  - Rating (1-5 stars)
  - Personal notes
  - Date added
  - Date completed (for played games)

## Data Persistence

All data is stored in Convex with real-time synchronization. Changes made on one device instantly appear on all other devices using the same user account.
