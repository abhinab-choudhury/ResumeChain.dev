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

export default function WalletConnect() {
  const connectWallet = async () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6">
          <Wallet />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Connect your Crypo Wallet
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Securely link your wallet to upload resumes on-chain.
          </DialogDescription>
          <Button
            // onClick={connectWallet}
            disabled={true}
            className="w-full flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            {false
              ? "Connecting..."
              : true
                ? "Wallet Connected Successfully"
                : "Connect MetaMask"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
