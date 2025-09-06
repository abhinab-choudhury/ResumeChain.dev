"use client";

import { useState } from "react";
import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import {
  PanelsTopLeft,
  Shield,
  Database,
  Code,
  ArrowRight,
  Sparkle,
  Copy,
  Check,
  ArrowUpRight,
  Cloud,
  LinkIcon,
  Wallet,
  Github,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const { data: session, isPending } = useSession();

  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone ${siteConfig.socials.github}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full h-auto md:h-screen overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto border border-dashed flex flex-col my-2">
        <div className="w-full flex justify-between divide-x">
          <div className="relative hidden md:flex w-1/3 aspect-square bg-black items-center justify-center group/titan border-dashed">
            <Image
              height={400}
              width={400}
              src="/logo.png"
              alt={siteConfig.name}
            />
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
            <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-foreground opacity-0 group-hover/titan:opacity-100 transition-all duration-200"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <div
              id="nav"
              className="w-full flex items-center justify-end border-b border-dashed divide-x"
            >
              <div
                id="brand"
                className="font-mono text-sm flex-1 flex items-center h-full px-3 border-dashed"
              >
                <Link href="/" className="hover:underline">
                  {siteConfig.origin.replace("https://", "")}
                </Link>
              </div>
              {!isPending &&
                (session ? (
                  <Button
                    className="h-full border-dashed"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 group/nav"
                    >
                      <span>Dashboard</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="h-full border-dashed"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/sign-in"
                      className="flex items-center gap-2 group/nav"
                    >
                      <span>Sign In</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                    </Link>
                  </Button>
                ))}
              <UserProfile className="border-dashed size-10 md:size-14" />
              <ThemeToggler className="border-dashed size-10 md:size-14" />
            </div>
            <div id="hero" className="flex flex-col p-4">
              <h1 className="head-text-md">{siteConfig.name}</h1>
              <p className="text-muted-foreground max-w-3xl">
                {siteConfig.description}
              </p>
            </div>
            <div id="code" className="flex flex-col p-4">
              <div className="p-2 border border-dashed hover:border-primary/50 bg-card text-xs md:text-sm flex items-center justify-between transition-all duration-200 delay-75">
                <pre className="font-mono bg-linear-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">
                  git clone {siteConfig.socials.github}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 cursor-pointer group/copy"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3 group-hover/copy:text-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div id="cta" className="flex items-center gap-4 p-4">
              <Button
                variant="outline"
                asChild
                className="relative border-dashed"
              >
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  className="gap-2 group"
                >
                  <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Github className="size-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button asChild>
                <Link href="/dashboard" className="gap-2 group">
                  <span>Get started</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-all duration-150" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          id="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-dashed"
        >
          {techConfig.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              className={cn(
                "relative w-full p-6 hover:bg-muted/50 transition-all duration-150 group/item border-dashed",
                {
                  "border-b": index < techConfig.length - 1,
                  "md:border-b-0": index >= techConfig.length - 2,
                  "md:border-b": index < techConfig.length - 2,
                  "lg:border-b-0": index >= techConfig.length - 3,
                  "lg:border-b": index < techConfig.length - 3,
                },
                {
                  "md:border-r":
                    index % 2 === 0 && index !== techConfig.length - 1,
                  "lg:border-r":
                    index % 3 !== 2 && index !== techConfig.length - 1,
                },
              )}
            >
              {(index === 0 || index === techConfig.length - 1) && (
                <Sparkle
                  className={cn(
                    "absolute w-4 h-4 z-10 fill-current hidden md:block",
                    {
                      "-bottom-2 -right-2": index === 0,
                      "-top-2 -left-2": index === techConfig.length - 1,
                    },
                  )}
                />
              )}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="group-hover/item:animate-pulse">
                    {tech.icon}
                  </span>
                  <h3 className="text-zinc-500 dark:text-zinc-400 text-base font-semibold">
                    {tech.category}
                  </h3>
                </div>
                <ArrowRight className="size-4 opacity-0 scale-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:-translate-x-0 group-hover/item:scale-100 transition-all duration-150" />
              </div>
              <h1 className="text-xl font-semibold font-heading tracking-tight mb-2">
                {tech.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const techConfig = [
  {
    icon: <Wallet className="size-4" />,
    category: "Wallet Integration",
    name: "MetaMask / RainbowKit",
    description:
      "Connect your Ethereum wallet securely to manage your on-chain resume and credentials.",
    link: "https://metamask.io",
  },
  {
    icon: <LinkIcon className="size-4" />,
    category: "Blockchain Platform",
    name: "Ethereum / Polygon",
    description:
      "Store verified credentials and resumes on-chain using Ethereum or Layer 2 solutions like Polygon.",
    link: "https://ethereum.org",
  },
  {
    icon: <Shield className="size-4" />,
    category: "Authentication",
    name: "Better-Auth",
    description:
      "Secure user authentication via email, OAuth, or wallet signatures for seamless Web3 onboarding.",
    link: "https://better-auth.com",
  },
  {
    icon: <Database className="size-4" />,
    category: "Database",
    name: "Supabase / PostgreSQL",
    description:
      "Off-chain storage for user profiles, resumes metadata, and app state alongside your on-chain data.",
    link: "https://supabase.com",
  },
  {
    icon: <Cloud className="size-4" />,
    category: "File Storage",
    name: "IPFS / NFT.Storage",
    description:
      "Decentralized storage for resumes, certificates, and other user assets, ensuring immutability.",
    link: "https://nft.storage",
  },
  {
    icon: <Code className="size-4" />,
    category: "Frontend Framework",
    name: "Next.js 15 + React",
    description:
      "Modern full-stack React framework for building interactive Web3 experiences.",
    link: "https://nextjs.org",
  },
];
