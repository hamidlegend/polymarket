"use client";

interface NavigationProps {
  activeTab: "matches" | "profile";
  onTabChange: (tab: "matches" | "profile") => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => onTabChange("matches")}
            className={`flex flex-col items-center space-y-1 px-6 py-2 rounded-lg transition-all ${
              activeTab === "matches"
                ? "text-primary-600 bg-primary-50"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="text-2xl">{activeTab === "matches" ? "⚽" : "🏟️"}</span>
            <span className="text-xs font-medium">Matches</span>
          </button>

          <button
            onClick={() => onTabChange("profile")}
            className={`flex flex-col items-center space-y-1 px-6 py-2 rounded-lg transition-all ${
              activeTab === "profile"
                ? "text-primary-600 bg-primary-50"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="text-2xl">{activeTab === "profile" ? "👤" : "👥"}</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
