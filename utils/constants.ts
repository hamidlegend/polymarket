export const CHAIN_ID = 137; // Polygon Mainnet

export const USDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"; // USDC.e on Polygon

export const CTF_CONTRACT = "0x4d97dcd97ec945f40cf65f87097ace5ea0476045";
export const CTF_EXCHANGE = "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E";
export const NEG_RISK_CTF_EXCHANGE = "0xC5d563A36AE78145C45a50134d48A1215220f80a";
export const NEG_RISK_ADAPTER = "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296";

export const APPROVAL_CONTRACTS = [
  CTF_CONTRACT,
  CTF_EXCHANGE,
  NEG_RISK_CTF_EXCHANGE,
  NEG_RISK_ADAPTER,
] as const;

export const CLOB_ENDPOINT = "https://clob.polymarket.com";
export const GAMMA_API_ENDPOINT = "https://gamma-api.polymarket.com";

export const FOOTBALL_TAGS = [
  "soccer",
  "football",
  "epl",
  "premier-league",
  "la-liga",
  "bundesliga",
  "serie-a",
  "ligue-1",
  "champions-league",
  "ucl",
  "europa-league",
  "world-cup",
];

export const LEAGUES = [
  {
    id: "premier-league",
    name: "Premier League",
    tag: "epl",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  {
    id: "la-liga",
    name: "La Liga",
    tag: "la-liga",
    emoji: "🇪🇸",
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    tag: "bundesliga",
    emoji: "🇩🇪",
  },
  {
    id: "serie-a",
    name: "Serie A",
    tag: "serie-a",
    emoji: "🇮🇹",
  },
  {
    id: "ligue-1",
    name: "Ligue 1",
    tag: "ligue-1",
    emoji: "🇫🇷",
  },
  {
    id: "champions-league",
    name: "Champions League",
    tag: "champions-league",
    emoji: "⭐",
  },
];
