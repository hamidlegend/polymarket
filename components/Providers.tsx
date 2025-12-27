"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { polygon } from "viem/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";

const wagmiConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["email", "wallet", "farcaster"],
        appearance: {
          theme: "light",
          accentColor: "#0ea5e9",
          logo: "/icon.png",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        fiatOnRamp: {
          enabled: true,
        },
        supportedChains: [polygon],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        {children}
      </WagmiProvider>
    </PrivyProvider>
  );
}
