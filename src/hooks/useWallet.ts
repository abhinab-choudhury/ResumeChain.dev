"use client";

import { ethers } from "ethers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWallet() {
  const queryClient = useQueryClient();

  const walletQuery = useQuery({
    queryKey: ["userWallet"],
    queryFn: async () => {
      const res = await fetch("/api/wallet/credential");
      if (!res.ok) throw new Error("Failed to fetch wallet credentials");
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  const connectWalletMutation = useMutation({
    mutationFn: async () => {
      if (!(window as any).ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const res = await fetch("/api/wallet/request-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (!res.ok) throw new Error("Failed to request message");
      const { message } = await res.json();

      const signature = await signer.signMessage(message);

      const verifyRes = await fetch("/api/wallet/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, message }),
      });

      if (!verifyRes.ok) throw new Error("Wallet verification failed");

      return { wallet: address, verified: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWallet"] });
    },
  });

  return {
    wallet: walletQuery.data?.wallet ?? null,
    verified: walletQuery.data?.verified ?? false,
    isFetchingWallet: walletQuery.isLoading,
    isConnecting: connectWalletMutation.isPending,
    error: walletQuery.error || connectWalletMutation.error,
    connectWallet: connectWalletMutation.mutateAsync,
  };
}
