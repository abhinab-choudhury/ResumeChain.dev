"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Resume } from "@/lib/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UploadResumeButton,
  UploadResumeForm,
} from "@/components/upload-resume";
import { UploadedResume } from "@/components/app-card";
import { WalletConnect } from "@/components/connect-wallet";
import { FileText } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useWallet } from "@/hooks/useWallet";

export default function DashboardClient({ user }: { user: any }) {
  const { verified } = useWallet();
  const { data } = useQuery<{ resume: Resume[] }>({
    queryKey: ["userPreviousResume"],
    queryFn: async () => {
      const res = await fetch("/api/resume/list");
      if (!res.ok) {
        toast("Failed to fetch resumes");
      }
      return res.json();
    },
  });

  const uploads = data?.resume ?? [];

  return uploads.length === 0 ? (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] px-4">
      <Card className="w-full max-w-2xl shadow-lg border-muted/20 bg-card/50 backdrop-blur-sm rounded-none border-dashed">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight">
            Protected Dashboard
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            This is a protected route accessible only to authenticated users.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/50 p-8 text-center">
            <h3 className="font-medium text-muted-foreground mb-1">
              Your Dashboard Awaits
            </h3>
            <p className="text-sm text-muted-foreground/70 mb-6">
              Start managing your CV/Resume in PDF/Docs Format. <br />
              Upload a file to get started.
            </p>
            <div className="flex items-center justify-center gap-2">
              {!verified ? <WalletConnect /> : <UploadResumeForm />}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-muted/20 pt-4 text-xs text-muted-foreground/70">
          <p>Signed in as: {user?.email}</p>
          <p>
            Built with{" "}
            <Link href="/" className="font-bold hover:underline">
              {siteConfig.name}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <Card className="w-full h-full shadow-lg border-muted/20 bg-card/60 backdrop-blur-sm rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Uploads
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage and download your uploaded documents
          </CardDescription>
        </div>
        <UploadResumeButton />
      </CardHeader>
      <CardContent>
        <UploadedResume uploads={uploads} />
      </CardContent>
    </Card>
  );
}
