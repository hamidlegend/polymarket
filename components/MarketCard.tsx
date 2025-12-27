"use client";

import { useState } from "react";
import { Market } from "@/utils/types";
import { TradeModal } from "./TradeModal";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const [showTradeModal, setShowTradeModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTeamNames = () => {
    if (market.homeTeam && market.awayTeam) {
      return { home: market.homeTeam, away: market.awayTeam };
    }
    return null;
  };

  const teams = getTeamNames();

  return (
    <>
      <div
        onClick={() => setShowTradeModal(true)}
        className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200 hover:border-primary-300"
      >
        {teams ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🏠</span>
                  <span className="font-semibold text-slate-800">
                    {teams.home}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✈️</span>
                  <span className="font-semibold text-slate-800">
                    {teams.away}
                  </span>
                </div>
              </div>

              {market.outcomes.length > 0 && (
                <div className="text-right space-y-2">
                  {market.outcomes.slice(0, 2).map((outcome) => (
                    <div
                      key={outcome.id}
                      className="bg-primary-50 px-3 py-1 rounded-lg"
                    >
                      <span className="text-sm font-semibold text-primary-700">
                        {(parseFloat(outcome.price) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>📅 {formatDate(market.endDate)}</span>
              <span>💰 ${parseFloat(market.volume).toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800 line-clamp-2">
              {market.question}
            </h3>

            {market.outcomes.length > 0 && (
              <div className="flex gap-2">
                {market.outcomes.map((outcome) => (
                  <div
                    key={outcome.id}
                    className="flex-1 bg-primary-50 px-3 py-2 rounded-lg text-center"
                  >
                    <div className="text-xs text-slate-600 mb-1 truncate">
                      {outcome.title}
                    </div>
                    <div className="text-sm font-semibold text-primary-700">
                      {(parseFloat(outcome.price) * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>📅 {formatDate(market.endDate)}</span>
              <span>💰 ${parseFloat(market.volume).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {showTradeModal && (
        <TradeModal
          market={market}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </>
  );
}
