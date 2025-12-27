import { GAMMA_API_ENDPOINT, FOOTBALL_TAGS } from "./constants";
import { Market } from "./types";

export async function fetchFootballMarkets(tag?: string): Promise<Market[]> {
  try {
    const tagParam = tag || FOOTBALL_TAGS.join(",");
    const response = await fetch(
      `${GAMMA_API_ENDPOINT}/markets?tag=${tagParam}&active=true&closed=false&limit=100`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch markets");
    }

    const data = await response.json();
    return data.map((market: any) => parseMarket(market));
  } catch (error) {
    console.error("Error fetching markets:", error);
    return [];
  }
}

export async function fetchMarketById(marketId: string): Promise<Market | null> {
  try {
    const response = await fetch(`${GAMMA_API_ENDPOINT}/markets/${marketId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch market");
    }

    const data = await response.json();
    return parseMarket(data);
  } catch (error) {
    console.error("Error fetching market:", error);
    return null;
  }
}

function parseMarket(data: any): Market {
  const outcomes = data.outcomes?.map((outcome: any) => ({
    id: outcome.id,
    title: outcome.title,
    price: outcome.price || "0.5",
    probability: parseFloat(outcome.price || "0.5") * 100,
  })) || [];

  const teams = extractTeams(data.question);

  return {
    id: data.id,
    question: data.question,
    description: data.description || "",
    endDate: data.endDate || data.end_date_iso,
    startDate: data.startDate || data.start_date_iso,
    image: data.image || data.icon || "",
    outcomes,
    volume: data.volume || "0",
    liquidity: data.liquidity || "0",
    tags: data.tags || [],
    active: data.active !== false,
    closed: data.closed === true,
    resolvedOutcome: data.resolvedOutcome,
    homeTeam: teams.home,
    awayTeam: teams.away,
    league: extractLeague(data.tags || []),
  };
}

function extractTeams(question: string): { home?: string; away?: string } {
  const vsMatch = question.match(/(.+?)\s+vs\.?\s+(.+?)\s*[-:]?\s*(win|to win|match|game)?/i);
  if (vsMatch) {
    return {
      home: vsMatch[1].trim(),
      away: vsMatch[2].trim(),
    };
  }
  return {};
}

function extractLeague(tags: string[]): string | undefined {
  const leagueTags = [
    "epl",
    "premier-league",
    "la-liga",
    "bundesliga",
    "serie-a",
    "ligue-1",
    "champions-league",
  ];
  return tags.find((tag) => leagueTags.includes(tag.toLowerCase()));
}

export async function getBuilderSignature(): Promise<{
  signature: string;
  timestamp: number;
}> {
  const response = await fetch("/api/polymarket/sign");
  if (!response.ok) {
    throw new Error("Failed to get builder signature");
  }
  return response.json();
}
