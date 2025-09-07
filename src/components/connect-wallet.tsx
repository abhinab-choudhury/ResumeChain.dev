"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";

export function WalletConnect() {
  const { wallet, isConnecting, isFetchingWallet, error, connectWallet } =
    useWallet();

  if (error) {
    toast("Error while connecting wallet");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6">
          <Wallet />
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Connect your Crypto Wallet
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Securely link your wallet to upload resumes on-chain.
          </DialogDescription>

          <Button
            onClick={() => connectWallet()}
            disabled={isConnecting || !!wallet}
            className="w-full flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            {isConnecting
              ? "Connecting..."
              : wallet
                ? "Wallet Connected"
                : "Connect MetaMask"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
