export interface Market {
  id: string;
  question: string;
  description: string;
  endDate: string;
  startDate: string;
  image: string;
  outcomes: Outcome[];
  volume: string;
  liquidity: string;
  tags: string[];
  active: boolean;
  closed: boolean;
  resolvedOutcome?: string;
  homeTeam?: string;
  awayTeam?: string;
  league?: string;
}

export interface Outcome {
  id: string;
  title: string;
  price: string;
  probability: number;
}

export interface League {
  id: string;
  name: string;
  tag: string;
  emoji: string;
}

export interface UserPrediction {
  id: string;
  marketId: string;
  question: string;
  outcome: string;
  amount: string;
  price: string;
  timestamp: number;
  status: "pending" | "won" | "lost";
  homeTeam?: string;
  awayTeam?: string;
}

export interface UserStats {
  balance: string;
  totalPredictions: number;
  wonPredictions: number;
  lostPredictions: number;
  winRate: number;
  totalVolume: string;
  profit: string;
}

export interface PolymarketOrder {
  market: string;
  side: "BUY" | "SELL";
  outcomeId: string;
  amount: string;
  price: string;
}
