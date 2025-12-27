"use client";

import { usePrivy } from "@privy-io/react-auth";

export function LoginScreen() {
  const { login } = usePrivy();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-blue-700 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
        <div className="mb-6">
          <div className="text-7xl mb-4">⚽</div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">GoalCast</h1>
          <p className="text-slate-600 text-lg">
            Football Predictions on Polymarket
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 text-slate-700">
            <span className="text-2xl">📊</span>
            <span>Trade football markets</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-slate-700">
            <span className="text-2xl">💰</span>
            <span>Win with predictions</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-slate-700">
            <span className="text-2xl">🏆</span>
            <span>Track your stats</span>
          </div>
        </div>

        <button
          onClick={() => login()}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Connect Wallet to Start
        </button>

        <p className="mt-6 text-sm text-slate-500">
          Powered by Privy & Polymarket
        </p>
      </div>
    </div>
  );
}
