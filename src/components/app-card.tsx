"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  CheckCheck,
  EllipsisIcon,
  Eye,
  FileText,
  LinkIcon,
  Mail,
  Share2,
  Stamp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UploadFiles from "./upload-file";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Resume } from "@/lib/db/schema";

export type ProfileCardProps = {
  // Candidate Info
  name: string;
  typeOfEngineer: string;
  avatarUrl?: string;
  initials?: string;

  // Resume Data
  resumes: string[];
  score: number;

  // Verification
  verificationType: string;
  status: string;

  // Proof Metadata
  version?: number;
  verifiedBy?: string;
  timestamp?: string;
  proofHash?: string;
  txHash?: string;
  resumeUrl?: string;

  // UI Callbacks
  className?: string;
  onContact?: () => void;
  onShare?: () => void;
  onMintProof?: () => void;
};

export type UploadedResumeProps = {
  uploads: Resume[];
};

export type ResumeCardProps = {
  file: Resume;
};

export function UploadedResume({ uploads }: UploadedResumeProps) {
  return (
    <>
      {uploads.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {uploads.map((file) => (
            <ResumeCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic text-center">
          No files uploaded yet.
        </p>
      )}
    </>
  );
}

function ResumeCard({ file }: ResumeCardProps) {
  return (
    <Card className="aspect-square flex flex-col items-center justify-between p-4 border bg-muted/40 hover:shadow-md transition rounded-lg relative">
      <div className="absolute top-1 right-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full shadow-none rotate-90"
              aria-label="Open edit menu"
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-fit">
            <DropdownMenuItem asChild>
              <Link href={file.content} target="_blank">
                <Eye className="w-4 h-4 mr-2" /> View Doc
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BarChart className="w-4 h-4 mr-2" /> Analyze
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        <FileText className="w-10 h-10 text-primary mb-2" />
        <p className="font-medium text-sm truncate w-full">{file.title}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(file.createdAt).toISOString()}
        </p>
      </div>
      <div className="flex">
        <Button variant="outline" size="sm" asChild className="w-auto">
          <Link href={file.content} download>
            Details
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export function ProfileCard({
  name,
  typeOfEngineer,
  avatarUrl,
  initials = "JD",
  resumes,
  verificationType,
  status,
  score,
  version,
  verifiedBy,
  timestamp,
  proofHash,
  txHash,
  resumeUrl,
  className,
  onContact,
  onShare,
  onMintProof,
}: ProfileCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-4xl shadow-lg border border-muted/20 bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden",
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Candidate Info */}
        <div className="col-span-1 border-r border-muted/20 p-6 flex flex-col items-center text-center">
          <Avatar className="size-24 border">
            <AvatarImage
              src={avatarUrl || "/placeholder.svg"}
              alt={`${name} avatar`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <CardTitle className="mt-4 text-xl md:text-2xl font-semibold">
            {name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{typeOfEngineer}</p>

          <div className="mt-3 flex-1 gap-2 w-full">
            <Badge className="bg-emerald-600/15 text-emerald-600 justify-center">
              <CheckCheck className="size-4 mr-1" /> {status}
            </Badge>
            <Badge variant="secondary" className="justify-center">
              {verificationType}
            </Badge>
            <Badge variant="outline" className="justify-center">
              Score: {score}
            </Badge>
          </div>
        </div>

        {/* Right Panel: Resume, Insights, Proof */}
        <div className="col-span-2 p-6 space-y-6">
          {/* Resume Versions Timeline */}
          <div>
            <p className="text-sm font-medium mb-3">Resume History</p>
            <div className="relative border-l border-muted-foreground/30 pl-4 space-y-3">
              {resumes.map((url, i) => (
                <div key={i} className="flex items-center gap-3 relative">
                  <span
                    className={cn(
                      "absolute -left-[22px] h-3 w-3 rounded-full",
                      i === resumes.length - 1
                        ? "bg-primary"
                        : "bg-muted-foreground/40",
                    )}
                  ></span>
                  <Button
                    variant={i === resumes.length - 1 ? "default" : "outline"}
                    size="sm"
                    className="justify-start gap-2 w-full text-left"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <FileText className="size-4" /> Resume v{i + 1}
                    {i === resumes.length - 1 && (
                      <span className="ml-auto text-xs">(Latest)</span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Proof Metadata */}
          {version && proofHash && txHash && (
            <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/40 p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Resume Version</span>
                <Badge variant="outline">v{version}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Verification Method</span>
                <span>{verifiedBy}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Timestamp</span>
                <span>{timestamp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Proof Hash</span>
                <span className="truncate max-w-[180px] text-muted-foreground">
                  {proofHash}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Transaction</span>
                <Link
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <LinkIcon className="size-3" /> {txHash.slice(0, 10)}...
                </Link>
              </div>
              {resumeUrl && (
                <div className="text-center pt-3">
                  <Button asChild className="gap-2">
                    <Link href={resumeUrl} target="_blank">
                      <FileText className="size-4" /> View Resume (v{version})
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <CardFooter className="flex justify-between border-t border-muted/20 p-4 text-xs text-muted-foreground/70">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onShare}
            className="gap-1"
          >
            <Share2 className="size-3" /> Share
          </Button>
          <Button size="sm" onClick={onContact} className="gap-1">
            <Mail className="size-3" /> Contact
          </Button>
        </div>
        <Button size="sm" className="gap-1" onClick={onMintProof}>
          <Stamp className="size-3" /> Mint Proof
        </Button>
      </CardFooter>
    </Card>
  );
}
