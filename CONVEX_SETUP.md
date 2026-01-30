# Convex Setup Instructions

Your app is now configured to use Convex for real-time data synchronization and backend storage!

## Setup Steps

### 1. Create a Convex Account (if you don't have one)

Visit [https://convex.dev](https://convex.dev) and sign up for a free account.

### 2. Initialize Your Convex Project

Run the following command in your project directory:

```bash
bunx convex dev
```

This will:
- Prompt you to login to your Convex account
- Create a new Convex project or link to an existing one
- Generate a `.env.local` file with your `CONVEX_URL`
- Start the Convex development server
- Deploy your schema and functions

### 3. Add Convex URL to Your Environment

After running `bunx convex dev`, a `.env.local` file will be created with:

```
CONVEX_URL=https://your-project.convex.cloud
```

Make sure this file exists in your project root.

### 4. Start Your Expo App

In a separate terminal, start your Expo development server:

```bash
bunx expo start
```

## What's Included

### Schema (`convex/schema.ts`)
- **users** table: Stores user profiles
- **games** table: Stores all game data with user relationships

### Functions

**User Functions** (`convex/users.ts`):
- `list` - Get all users
- `get` - Get a user by ID
- `create` - Create a new user
- `remove` - Delete a user and their games

**Game Functions** (`convex/games.ts`):
- `listByUser` - Get all games for a user
- `listPlayed` - Get played games
- `listBacklog` - Get backlog games
- `add` - Add a new game
- `update` - Update game details
- `remove` - Delete a game
- `moveToBacklog` - Move game to backlog
- `moveToPlayed` - Mark game as played

## Features

✅ **Real-time sync** - Changes sync instantly across all devices
✅ **Multi-user support** - Each user has their own game library
✅ **Completion tracking** - Track when games were completed
✅ **Cloud storage** - All data stored securely in the cloud
✅ **Offline support** - Works offline with automatic sync when online

## Development Workflow

1. Keep `bunx convex dev` running in one terminal
2. Keep `bunx expo start` running in another terminal
3. Any changes to `convex/*.ts` files will automatically redeploy
4. Schema changes require running `bunx convex dev` again

## Deployment

When you're ready to deploy your Convex backend to production:

```bash
bunx convex deploy
```

This will give you a production `CONVEX_URL` to use in your deployed app.
