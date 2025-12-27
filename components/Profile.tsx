"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { UserStats, UserPrediction } from "@/utils/types";

export function Profile() {
  const { user } = usePrivy();
  const [stats, setStats] = useState<UserStats>({
    balance: "0.00",
    totalPredictions: 0,
    wonPredictions: 0,
    lostPredictions: 0,
    winRate: 0,
    totalVolume: "0.00",
    profit: "0.00",
  });
  const [predictions, setPredictions] = useState<UserPrediction[]>([]);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const balance = localStorage.getItem("goalcast_balance") || "1000.00";
    const savedPredictions = JSON.parse(
      localStorage.getItem("goalcast_predictions") || "[]"
    );

    const totalPredictions = savedPredictions.length;
    const wonPredictions = savedPredictions.filter(
      (p: UserPrediction) => p.status === "won"
    ).length;
    const lostPredictions = savedPredictions.filter(
      (p: UserPrediction) => p.status === "lost"
    ).length;
    const winRate =
      totalPredictions > 0 ? (wonPredictions / totalPredictions) * 100 : 0;

    const totalVolume = savedPredictions.reduce(
      (sum: number, p: UserPrediction) => sum + parseFloat(p.amount),
      0
    );

    setStats({
      balance,
      totalPredictions,
      wonPredictions,
      lostPredictions,
      winRate,
      totalVolume: totalVolume.toFixed(2),
      profit: "0.00", // Calculate based on actual results
    });

    setPredictions(savedPredictions.reverse());
  };

  const handleDeposit = (amount: string) => {
    const currentBalance = parseFloat(stats.balance);
    const newBalance = currentBalance + parseFloat(amount);
    localStorage.setItem("goalcast_balance", newBalance.toFixed(2));
    loadUserData();
    setShowDeposit(false);
  };

  const handleWithdraw = (amount: string) => {
    const currentBalance = parseFloat(stats.balance);
    const withdrawAmount = parseFloat(amount);

    if (withdrawAmount > currentBalance) {
      alert("Insufficient balance");
      return;
    }

    const newBalance = currentBalance - withdrawAmount;
    localStorage.setItem("goalcast_balance", newBalance.toFixed(2));
    loadUserData();
    setShowWithdraw(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-br from-primary-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <p className="font-semibold">
              {user?.wallet?.address?.slice(0, 10)}...
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Total Balance</p>
          <p className="text-3xl font-bold">${stats.balance} USDC</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowDeposit(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
        >
          💰 Deposit
        </button>
        <button
          onClick={() => setShowWithdraw(true)}
          className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
        >
          💸 Withdraw
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-primary-600">
            {stats.totalPredictions}
          </div>
          <div className="text-xs text-slate-600 mt-1">Predictions</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-accent-600">
            {stats.wonPredictions}
          </div>
          <div className="text-xs text-slate-600 mt-1">Won</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="text-2xl font-bold text-primary-600">
            {stats.winRate.toFixed(0)}%
          </div>
          <div className="text-xs text-slate-600 mt-1">Win Rate</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">
          My Predictions
        </h3>

        {predictions.length === 0 ? (
          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <div className="text-5xl mb-3">📊</div>
            <p className="text-slate-600">No predictions yet</p>
            <p className="text-slate-500 text-sm mt-1">
              Start predicting to see your history here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {predictions.slice(0, 10).map((prediction) => (
              <div
                key={prediction.id}
                className="bg-white rounded-xl p-4 shadow-md border border-slate-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-slate-800 text-sm flex-1">
                    {prediction.question}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      prediction.status === "won"
                        ? "bg-accent-100 text-accent-700"
                        : prediction.status === "lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {prediction.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>✅ {prediction.outcome}</span>
                  <span className="font-semibold">${prediction.amount}</span>
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  {new Date(prediction.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeposit && (
        <DepositModal
          onDeposit={handleDeposit}
          onClose={() => setShowDeposit(false)}
        />
      )}

      {showWithdraw && (
        <WithdrawModal
          balance={stats.balance}
          onWithdraw={handleWithdraw}
          onClose={() => setShowWithdraw(false)}
        />
      )}
    </div>
  );
}

function DepositModal({
  onDeposit,
  onClose,
}: {
  onDeposit: (amount: string) => void;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800">Deposit USDC</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Amount
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
            />
          </div>
        </div>

        <button
          onClick={() => amount && onDeposit(amount)}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          Confirm Deposit
        </button>
      </div>
    </div>
  );
}

function WithdrawModal({
  balance,
  onWithdraw,
  onClose,
}: {
  balance: string;
  onWithdraw: (amount: string) => void;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-800">Withdraw USDC</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 mb-4">
          <p className="text-sm text-slate-600">Available Balance</p>
          <p className="text-2xl font-bold text-slate-800">${balance}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Amount
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
              max={balance}
              className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => amount && onWithdraw(amount)}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
}
