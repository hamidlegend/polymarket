# ⚽ GoalCast

**GoalCast** یک مینی اپ فارکستر برای پیش‌بینی مسابقات فوتبال است که با Polymarket ادغام شده است.

A Farcaster mini app for football predictions powered by Polymarket.

![GoalCast Preview](./public/preview.png)

## ✨ Features

- 🏟️ **Browse Football Markets**: View prediction markets from top leagues (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League)
- 💰 **Place Predictions**: Trade on football match outcomes using USDC
- 📊 **Track Performance**: Monitor your predictions, win rate, and profit
- 💸 **Manage Funds**: Deposit and withdraw USDC directly in the app
- 🔐 **Secure Authentication**: Powered by Privy with Farcaster wallet support
- ⚡ **Gasless Trading**: Using Polymarket's Builder API with Safe smart contracts

## 🚀 Quick Start

### Prerequisites

1. **Node.js 22.11.0 or higher** - [Download](https://nodejs.org/)
2. **Privy Account** - [Sign up at privy.io](https://privy.io)
3. **Polymarket Builder API Keys** - [Get from polymarket.com/settings?tab=builder](https://polymarket.com/settings?tab=builder)
4. **Polygon RPC URL** - [Get from Alchemy](https://www.alchemy.com/) or use a public endpoint

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd polymarket
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials:
   ```env
   # Privy Configuration
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here

   # Polygon RPC
   NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

   # Polymarket Builder API
   POLYMARKET_BUILDER_API_KEY=your_builder_api_key
   POLYMARKET_BUILDER_SECRET=your_builder_secret
   POLYMARKET_BUILDER_PASSPHRASE=your_builder_passphrase
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 How to Get Required Credentials

### 1. Privy App ID

1. Go to [privy.io](https://privy.io) and create an account
2. Create a new app in the Privy dashboard
3. Copy your **App ID** from the app settings
4. Add `http://localhost:3000` to allowed origins during development
5. Enable **Farcaster** as a login method in the dashboard
6. Paste the App ID in `.env.local` as `NEXT_PUBLIC_PRIVY_APP_ID`

### 2. Polygon RPC URL

**Option 1: Alchemy (Recommended)**
1. Go to [alchemy.com](https://www.alchemy.com/)
2. Sign up and create a new app
3. Select **Polygon Mainnet** as the network
4. Copy the HTTPS URL
5. Paste it in `.env.local` as `NEXT_PUBLIC_POLYGON_RPC_URL`

**Option 2: Public RPC**
Use: `https://polygon-rpc.com` (free but slower)

### 3. Polymarket Builder API Keys

1. Go to [polymarket.com](https://polymarket.com)
2. Create an account and log in
3. Navigate to Settings → Builder tab: [polymarket.com/settings?tab=builder](https://polymarket.com/settings?tab=builder)
4. Create new API credentials
5. Copy the **API Key**, **Secret**, and **Passphrase**
6. Paste them in `.env.local`:
   - `POLYMARKET_BUILDER_API_KEY`
   - `POLYMARKET_BUILDER_SECRET`
   - `POLYMARKET_BUILDER_PASSPHRASE`

## 🌐 Deploy to Vercel

### Step 1: Prepare for Deployment

1. Make sure all your code is committed to Git:
   ```bash
   git add .
   git commit -m "Initial GoalCast setup"
   git push
   ```

2. Create image assets (see [Asset Requirements](#-asset-requirements) below)

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your repository
4. Vercel will automatically detect Next.js
5. Add environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add all variables from your `.env.local` file
   - Make sure to add them for **Production**, **Preview**, and **Development**
6. Click **Deploy**

### Step 3: Configure Farcaster Mini App

1. Once deployed, copy your Vercel URL (e.g., `https://goalcast.vercel.app`)
2. Update `public/manifest.json` with your domain
3. Go to Farcaster and register your mini app at [miniapps.farcaster.xyz](https://miniapps.farcaster.xyz)
4. Update Privy settings to allow your production domain

## 🎨 Asset Requirements

You need to create the following image assets:

### 1. **App Icon** (`public/icon.png`)
- Dimensions: 512x512 pixels
- Format: PNG
- Content: Soccer ball or GoalCast logo
- Colors: Use brand colors (#0ea5e9 blue)

### 2. **Preview Image** (`public/preview.png`)
- Dimensions: 1200x630 pixels
- Format: PNG
- Content: App screenshot or promotional image
- Use for: Social sharing, OG tags

### 3. **Splash Screen** (`public/splash.png`)
- Dimensions: 1080x1920 pixels
- Format: PNG
- Background: #0ea5e9 (brand blue)
- Content: GoalCast logo centered

**Creating Assets:**
- Use [Canva](https://canva.com) (free templates available)
- Use [Figma](https://figma.com) (more advanced)
- Or hire a designer on Fiverr for $5-20

## 🏗️ Project Structure

```
goalcast/
├── app/
│   ├── api/
│   │   ├── markets/         # Polymarket API proxy
│   │   ├── polymarket/sign/ # Builder signature endpoint
│   │   └── webhook/         # Farcaster webhooks
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main app page
├── components/
│   ├── Header.tsx           # App header with balance
│   ├── LoginScreen.tsx      # Login/connect wallet screen
│   ├── MarketCard.tsx       # Individual market card
│   ├── Matches.tsx          # Matches section (main)
│   ├── Navigation.tsx       # Bottom navigation
│   ├── Profile.tsx          # Profile section
│   ├── Providers.tsx        # Privy & Wagmi providers
│   └── TradeModal.tsx       # Trade/prediction modal
├── public/
│   ├── icon.png             # App icon
│   ├── preview.png          # Preview image
│   ├── splash.png           # Splash screen
│   └── manifest.json        # Farcaster manifest
├── utils/
│   ├── api.ts               # API helpers
│   ├── constants.ts         # App constants
│   └── types.ts             # TypeScript types
├── .env.example             # Environment variables template
├── .env.local               # Your local environment (create this)
├── package.json             # Dependencies
└── README.md                # This file
```

## 📱 Using the App

### For Users (ELI5 - Explain Like I'm 5)

1. **Connect Your Wallet**
   - Click "Connect Wallet to Start"
   - Choose Farcaster or email login
   - Your wallet is created automatically

2. **Browse Matches**
   - See different football leagues (Premier League, La Liga, etc.)
   - Click on a league to see matches
   - Each match shows the probability of outcomes

3. **Make a Prediction**
   - Click on any match
   - Choose who you think will win
   - Enter how much USDC you want to bet
   - Click "Confirm Prediction"

4. **View Your Stats**
   - Go to Profile tab (bottom right)
   - See your balance, predictions, and win rate
   - Deposit or withdraw USDC

## 🔐 Security Notes

⚠️ **Important**: This is a demo implementation. For production:

1. **Builder API Security**: The `/api/polymarket/sign` endpoint exposes builder credentials. In production, implement:
   - User authentication validation
   - Rate limiting
   - Request signing verification

2. **Credential Storage**: User API credentials are stored in `localStorage`. For production, use:
   - Server-side session management
   - Encrypted cookies
   - Secure backend storage

3. **Smart Contract Interactions**: Always verify transactions before signing

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Authentication**: Privy (Farcaster + Email + Wallet)
- **Blockchain**: Polygon (MATIC)
- **Market Data**: Polymarket Gamma API
- **Trading**: Polymarket CLOB Client
- **Smart Contracts**: Safe (Gnosis Safe)
- **Deployment**: Vercel

## 📚 Resources

- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/)
- [Polymarket Documentation](https://docs.polymarket.com/)
- [Privy Documentation](https://docs.privy.io/)
- [Safe Protocol](https://safe.global/)
- [Polygon Network](https://polygon.technology/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 💬 Support

If you need help:
1. Check the [FAQ](#-faq) below
2. Open an issue on GitHub
3. Contact on Farcaster

## ❓ FAQ

**Q: Why isn't my balance updating?**
A: The demo uses localStorage. Refresh the page or check browser console for errors.

**Q: Can I use real money?**
A: Yes! This integrates with real Polymarket markets. Start with small amounts to test.

**Q: Why do I see "No markets available"?**
A: Markets are loaded from Polymarket. If none appear, try selecting "All Football" or check your internet connection.

**Q: How do I get USDC?**
A: You can buy USDC through Privy's fiat on-ramp, or transfer from another wallet.

**Q: Is this mobile-friendly?**
A: Yes! GoalCast is designed as a mobile-first Farcaster mini app.

---

Made with ⚽ by GoalCast Team
