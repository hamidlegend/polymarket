# CLAUDE.md - GoalCast Codebase Guide

This document provides essential information for AI assistants working with the GoalCast codebase.

## Project Overview

**GoalCast** is a Farcaster mini app for football/soccer match predictions powered by Polymarket. It enables users to trade on prediction markets for football matches using USDC on Polygon with gasless trading via Safe smart contracts.

- **Framework**: Next.js 14.2.18 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Blockchain**: Polygon Mainnet (Chain ID: 137)
- **Authentication**: Privy (supports Farcaster, Email, Wallet)

## Quick Reference Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
/home/user/polymarket/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── markets/route.ts      # Proxy for Polymarket Gamma API
│   │   ├── polymarket/sign/route.ts  # Builder API signature generation
│   │   └── webhook/route.ts      # Farcaster webhook handler
│   ├── page.tsx                  # Main app page (client component)
│   ├── layout.tsx                # Root layout with Providers
│   └── globals.css               # Global styles + Tailwind imports
│
├── components/                   # React components (all client components)
│   ├── Providers.tsx             # Privy + Wagmi context providers
│   ├── Header.tsx                # App header with balance display
│   ├── LoginScreen.tsx           # Authentication/login UI
│   ├── Matches.tsx               # Main markets listing with league filter
│   ├── MarketCard.tsx            # Individual market card
│   ├── TradeModal.tsx            # Prediction/trade modal
│   ├── Navigation.tsx            # Bottom tab navigation
│   └── Profile.tsx               # User profile & stats
│
├── utils/                        # Utilities and constants
│   ├── api.ts                    # API helper functions
│   ├── types.ts                  # TypeScript interfaces
│   └── constants.ts              # Config values, contract addresses
│
├── public/                       # Static assets
│   ├── icon.png                  # 512x512 app icon
│   ├── preview.png               # 1200x630 OG image
│   ├── splash.png                # 1080x1920 splash screen
│   └── manifest.json             # Farcaster manifest
│
└── Configuration
    ├── package.json
    ├── tsconfig.json             # TypeScript config (strict mode)
    ├── tailwind.config.ts        # Custom theme colors
    ├── next.config.js            # Image domains configured
    ├── vercel.json               # Vercel deployment config
    └── .env.example              # Environment variables template
```

## Key Conventions

### TypeScript

- **Strict mode enabled** - all code must be type-safe
- Use interfaces for object shapes (defined in `utils/types.ts`)
- Path alias `@/*` maps to root directory (e.g., `@/components/Header`)
- Export interfaces explicitly: `export interface Market { ... }`

### React Components

- **All components are client components** - use `"use client"` directive at top
- Named exports for components: `export function ComponentName() { ... }`
- Props interfaces defined inline above component
- Use Tailwind utility classes for styling

### File Naming

- Components: PascalCase (e.g., `MarketCard.tsx`)
- Utilities: camelCase (e.g., `api.ts`, `types.ts`)
- API routes: `route.ts` in directory (e.g., `app/api/markets/route.ts`)

### State Management

- Currently uses localStorage for persistence:
  - `goalcast_balance` - User's USDC balance (default: $1000)
  - `goalcast_predictions` - Array of user predictions
- React hooks for local state (`useState`, `useEffect`)
- Privy hooks for authentication (`usePrivy`)

### Styling Conventions

- Mobile-first responsive design
- Custom color scheme via Tailwind config:
  - Primary (blue): `primary-50` to `primary-900`, accent `#0ea5e9`
  - Accent (green): `accent-50` to `accent-900`, accent `#22c55e`
  - Neutral: Slate scale (`slate-50` to `slate-900`)
- Common patterns:
  - `rounded-xl` or `rounded-2xl` for cards
  - `bg-gradient-to-br` for gradient backgrounds
  - `animate-fade-in` for entry animations

## Architecture Patterns

### API Routes

API routes proxy external services to avoid CORS and protect credentials:

```typescript
// app/api/markets/route.ts pattern
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(externalUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "..." }, { status: 500 });
  }
}
```

### Component Structure

Typical component pattern:

```typescript
"use client";

import { useState } from "react";
import { SomeType } from "@/utils/types";

interface ComponentProps {
  prop1: string;
  onAction: () => void;
}

export function Component({ prop1, onAction }: ComponentProps) {
  const [state, setState] = useState<SomeType | null>(null);

  // Component logic...

  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
}
```

### Authentication Flow

1. App initializes Privy SDK
2. Check `authenticated` from `usePrivy()`
3. If not authenticated, render `<LoginScreen />`
4. After login, Privy creates embedded wallet if needed
5. Access to Matches and Profile tabs

## Key Types

Located in `utils/types.ts`:

```typescript
Market          // Full market data from Polymarket
Outcome         // Individual prediction outcome
League          // Football league info
UserPrediction  // User's placed prediction record
UserStats       // Aggregated user statistics
PolymarketOrder // Order structure for trades
```

## External Integrations

### Polymarket

- **Gamma API**: `https://gamma-api.polymarket.com` - Market data
- **CLOB Endpoint**: `https://clob.polymarket.com` - Trading
- Markets proxied through `/api/markets` route

### Smart Contracts (Polygon)

```typescript
USDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
CTF_CONTRACT = "0x4d97dcd97ec945f40cf65f87097ace5ea0476045"
CTF_EXCHANGE = "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E"
```

### Supported Football Leagues

Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League

Tags used: `soccer`, `football`, `epl`, `premier-league`, `la-liga`, `bundesliga`, `serie-a`, `ligue-1`, `champions-league`, `ucl`

## Environment Variables

Required for development (create `.env.local`):

```env
NEXT_PUBLIC_PRIVY_APP_ID        # Privy app identifier
NEXT_PUBLIC_POLYGON_RPC_URL     # Polygon RPC (Alchemy recommended)
POLYMARKET_BUILDER_API_KEY      # Polymarket Builder API key
POLYMARKET_BUILDER_SECRET       # Polymarket Builder secret
POLYMARKET_BUILDER_PASSPHRASE   # Polymarket Builder passphrase
NEXT_PUBLIC_ENVIRONMENT         # "production" or "development"
```

## Development Notes

### When Adding New Components

1. Create file in `components/` with PascalCase name
2. Add `"use client"` directive at top
3. Define props interface if needed
4. Use named export
5. Import with `@/components/ComponentName`

### When Adding New API Routes

1. Create directory under `app/api/`
2. Add `route.ts` with exported HTTP method handlers
3. Use `NextRequest`/`NextResponse` from `next/server`
4. Add error handling with try/catch
5. Consider caching with `next: { revalidate: N }`

### When Modifying Types

1. Update interfaces in `utils/types.ts`
2. TypeScript will flag any mismatches due to strict mode

### Image Domains

External images must come from configured domains in `next.config.js`:
- `polymarket-upload.s3.us-east-2.amazonaws.com`
- `cloudflare-ipfs.com`

## Testing

No test framework is currently configured. When adding tests:
- Consider Jest or Vitest for unit tests
- Consider Playwright or Cypress for E2E tests

## Deployment

Deployed to Vercel:
- Auto-detects Next.js
- Build command: `npm run build`
- Environment variables must be configured in Vercel dashboard

## Security Considerations

- Builder API credentials exposed in `/api/polymarket/sign` - needs auth in production
- localStorage used for balance/predictions - needs server-side storage in production
- Always validate user input before blockchain transactions
