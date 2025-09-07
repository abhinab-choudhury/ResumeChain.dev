import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import {
  UploadResumeButton,
  UploadResumeForm,
} from "@/components/upload-resume";
import { UploadedResume } from "@/components/app-card";
import { getUser } from "@/lib/auth-utils";
import { WalletConnect } from "@/components/connect-wallet";
import { FileText } from "lucide-react";

export interface IUploads {
  id: number;
  name: string;
  url: string;
  uploadedAt: string;
}

export default async function DashboardPage() {
  const user = await getUser();
  const uploads: IUploads[] = [
    // {
    //   id: 1,
    //   name: "Devops Engineer",
    //   url: "/uploads/resume_v3.pdf",
    //   uploadedAt: "2 days ago",
    // },
    // { id: 2, name: "cover_letter.docx", url: "/uploads/cover_letter.docx", uploadedAt: "5 days ago" },
    // { id: 3, name: "portfolio.pdf", url: "/uploads/portfolio.pdf", uploadedAt: "1 week ago" },
    // { id: 4, name: "resume_v2.pdf", url: "/uploads/resume_v2.pdf", uploadedAt: "2 weeks ago" },
    // { id: 5, name: "linkedin_export.pdf", url: "/uploads/linkedin.pdf", uploadedAt: "3 weeks ago" },
    // { id: 6, name: "reference_letter.docx", url: "/uploads/reference_letter.docx", uploadedAt: "1 month ago" },
  ];

  return uploads.length === 0 ? (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] px-4">
      <Card className="w-full max-w-2xl shadow-lg border-muted/20 bg-card/50 backdrop-blur-sm rounded-none border-dashed">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
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
              {false ? <WalletConnect /> : <UploadResumeForm />}
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
