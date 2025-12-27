"use client";

import { useEffect, useState } from "react";
import { LEAGUES } from "@/utils/constants";
import { fetchFootballMarkets } from "@/utils/api";
import { Market, League } from "@/utils/types";
import { MarketCard } from "./MarketCard";

export function Matches() {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMarkets();
  }, [selectedLeague]);

  const loadMarkets = async () => {
    try {
      setLoading(true);
      setError(null);
      const tag = selectedLeague?.tag || undefined;
      const data = await fetchFootballMarkets(tag);
      setMarkets(data);
    } catch (err) {
      setError("Failed to load markets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!selectedLeague ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Choose a League
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {LEAGUES.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-slate-200"
              >
                <div className="text-4xl mb-2">{league.emoji}</div>
                <div className="font-semibold text-slate-800 text-sm">
                  {league.name}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setSelectedLeague({
                id: "all",
                name: "All Football",
                tag: "soccer",
                emoji: "🌍",
              })
            }
            className="w-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
          >
            🌍 View All Football Markets
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedLeague(null)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                ←
              </button>
              <div>
                <div className="text-3xl">{selectedLeague.emoji}</div>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {selectedLeague.name}
              </h2>
            </div>
            <button
              onClick={loadMarkets}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-md animate-pulse"
                >
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={loadMarkets}
                className="mt-2 text-red-700 underline text-sm"
              >
                Try Again
              </button>
            </div>
          ) : markets.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-3">😔</div>
              <p className="text-slate-600">No markets available right now</p>
              <p className="text-slate-500 text-sm mt-1">
                Check back later for new matches
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {markets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
