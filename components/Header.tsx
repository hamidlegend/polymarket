"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export function Header() {
  const { user, logout } = usePrivy();
  const [balance, setBalance] = useState<string>("0.00");

  useEffect(() => {
    // Load balance from localStorage
    const savedBalance = localStorage.getItem("goalcast_balance");
    if (savedBalance) {
      setBalance(savedBalance);
    }
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">⚽</span>
            <h1 className="text-xl font-bold text-slate-800">GoalCast</h1>
          </div>

          <button
            onClick={() => logout()}
            className="text-sm text-slate-600 hover:text-slate-800 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {user?.wallet?.address
              ? formatAddress(user.wallet.address)
              : "Disconnect"}
          </button>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl p-3 shadow-md">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-medium">Available Balance</span>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold">${balance}</span>
              <span className="text-xs opacity-80">USDC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
