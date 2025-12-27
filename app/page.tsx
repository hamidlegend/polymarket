"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import sdk from "@farcaster/frame-sdk";
import { Matches } from "@/components/Matches";
import { Profile } from "@/components/Profile";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { LoginScreen } from "@/components/LoginScreen";

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"matches" | "profile">("matches");
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    const load = async () => {
      try {
        await sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (error) {
        console.error("Failed to load Farcaster SDK:", error);
        setIsSDKLoaded(true); // Continue anyway for development
      }
    };
    load();
  }, []);

  if (!ready || !isSDKLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="animate-pulse-slow">
          <div className="text-6xl mb-4 text-center">⚽</div>
          <div className="text-xl font-semibold text-primary-700">Loading GoalCast...</div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-2xl mx-auto pb-20">
        <Header />

        <div className="animate-fade-in">
          {activeTab === "matches" ? <Matches /> : <Profile />}
        </div>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </main>
  );
}
