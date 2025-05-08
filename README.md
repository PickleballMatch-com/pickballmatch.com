# Pickleball Match

A web application for connecting pickleball players, scheduling matches, and building a community around the sport.

## Features

- **User Authentication**: Secure login and registration using Clerk
- **Player Profiles**: Create and manage your pickleball player profile with skill level, play style, and availability
- **Match Requests**: Send and receive match requests from other players
- **Scheduling**: Organize and manage your upcoming pickleball matches
- **Messaging**: Communicate with other players about match details
- **Rating System**: Rate and review players after matches

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **API**: tRPC for type-safe API calls
- **Authentication**: Clerk for user authentication and management
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time**: Socket.io for real-time messaging and notifications

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pickleball-match.git
cd pickleball-match
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example` and add your credentials

4. Set up the database
```bash
npx drizzle-kit push:pg
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app`: Next.js App Router pages and components
- `/src/components`: Reusable React components
- `/src/server`: Backend server code
  - `/api`: API route handlers
  - `/db`: Database schema and utilities
  - `/trpc`: tRPC routers and procedures
- `/src/lib`: Utility functions and shared code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 