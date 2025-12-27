"use client";

import { useState } from "react";
import { Market } from "@/utils/types";

interface TradeModalProps {
  market: Market;
  onClose: () => void;
}

export function TradeModal({ market, onClose }: TradeModalProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [isTrading, setIsTrading] = useState(false);

  const handleTrade = async () => {
    if (!selectedOutcome || !amount || parseFloat(amount) <= 0) {
      alert("Please select an outcome and enter an amount");
      return;
    }

    setIsTrading(true);

    try {
      // Simulate trade for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save prediction to localStorage
      const predictions = JSON.parse(
        localStorage.getItem("goalcast_predictions") || "[]"
      );

      const outcome = market.outcomes.find((o) => o.id === selectedOutcome);

      predictions.push({
        id: Date.now().toString(),
        marketId: market.id,
        question: market.question,
        outcome: outcome?.title || "",
        amount: amount,
        price: outcome?.price || "0",
        timestamp: Date.now(),
        status: "pending",
        homeTeam: market.homeTeam,
        awayTeam: market.awayTeam,
      });

      localStorage.setItem("goalcast_predictions", JSON.stringify(predictions));

      // Update balance
      const currentBalance = parseFloat(
        localStorage.getItem("goalcast_balance") || "1000"
      );
      const newBalance = currentBalance - parseFloat(amount);
      localStorage.setItem("goalcast_balance", newBalance.toFixed(2));

      alert("✅ Prediction placed successfully!");
      onClose();
    } catch (error) {
      alert("❌ Failed to place prediction. Please try again.");
      console.error(error);
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between rounded-t-3xl">
          <h3 className="font-bold text-lg text-slate-800">Place Prediction</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="font-semibold text-slate-800 text-sm">
              {market.question}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Choose Outcome
            </label>
            <div className="space-y-2">
              {market.outcomes.map((outcome) => (
                <button
                  key={outcome.id}
                  onClick={() => setSelectedOutcome(outcome.id)}
                  className={`w-full p-3 rounded-xl border-2 transition-all ${
                    selectedOutcome === outcome.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      {outcome.title}
                    </span>
                    <span className="text-primary-600 font-semibold">
                      {(parseFloat(outcome.price) * 100).toFixed(0)}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount (USDC)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:outline-none"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {amount && selectedOutcome && (
            <div className="bg-primary-50 rounded-xl p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Potential Return:</span>
                <span className="font-semibold text-primary-700">
                  $
                  {(
                    parseFloat(amount) /
                    parseFloat(
                      market.outcomes.find((o) => o.id === selectedOutcome)
                        ?.price || "1"
                    )
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Potential Profit:</span>
                <span className="font-semibold text-accent-600">
                  $
                  {(
                    parseFloat(amount) /
                      parseFloat(
                        market.outcomes.find((o) => o.id === selectedOutcome)
                          ?.price || "1"
                      ) -
                    parseFloat(amount)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleTrade}
            disabled={isTrading || !selectedOutcome || !amount}
            className="w-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTrading ? "Placing Prediction..." : "Confirm Prediction"}
          </button>
        </div>
      </div>
    </div>
  );
}
