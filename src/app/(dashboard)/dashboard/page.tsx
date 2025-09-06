import { getUser } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  FileText,
  Github,
  Plus,
  StampIcon,
  Trash2Icon,
  Upload,
  Wallet,
} from "lucide-react";
import { BarChart, EllipsisIcon, Eye, Trash2 } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import UploadFiles from "@/components/upload-file";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface IUploads {
  id: number;
  name: string;
  url: string;
  uploadedAt: string;
}

export default async function DashboardPage() {
  const user = await getUser();
  const {
    authenticate: web3Authenticate,
    isAuthenticating: web3IsAuthenticating,
    user: web3User,
    isAuthenticated: web3isAutenticated,
  } = useMoralis();
  const uploads: IUploads[] = [
    {
      id: 1,
      name: "Devops Engineer",
      url: "/uploads/resume_v3.pdf",
      uploadedAt: "2 days ago",
    },
    // { id: 2, name: "cover_letter.docx", url: "/uploads/cover_letter.docx", uploadedAt: "5 days ago" },
    // { id: 3, name: "portfolio.pdf", url: "/uploads/portfolio.pdf", uploadedAt: "1 week ago" },
    // { id: 4, name: "resume_v2.pdf", url: "/uploads/resume_v2.pdf", uploadedAt: "2 weeks ago" },
    // { id: 5, name: "linkedin_export.pdf", url: "/uploads/linkedin.pdf", uploadedAt: "3 weeks ago" },
    // { id: 6, name: "reference_letter.docx", url: "/uploads/reference_letter.docx", uploadedAt: "1 month ago" },
  ];
  const handleSubmit = async () => {};
  const connectWallet = async () => {};

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="px-6">Upload File</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {web3isAutenticated ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                          Connect your Crypo Wallet
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                          Securely link your wallet to upload resumes on-chain.
                        </DialogDescription>
                        <Button
                          onClick={connectWallet}
                          disabled={web3IsAuthenticating}
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <Wallet className="w-4 h-4" />
                          {web3IsAuthenticating
                            ? "Connecting..."
                            : web3User
                              ? "Reconnect Wallet"
                              : "Connect MetaMask"}
                        </Button>
                      </DialogHeader>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Upload your file</DialogTitle>
                        <DialogDescription>
                          Choose a file and upload it securely. Max file size
                          16MB.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="jobTitle"
                            className="text-sm font-medium text-muted-foreground"
                          >
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="jobTitle"
                            type="text"
                            placeholder="e.g. Software Engineer Resume"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Upload File <span className="text-red-500">*</span>
                          </label>
                          <UploadFiles />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button type="submit" className="gap-2">
                            <Upload className="w-4 h-4" /> Upload
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </DialogContent>
              </Dialog>
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
    <RecentUploadsCard uploads={uploads} />
  );
}

function ResumeCard({ file }: { file: IUploads }) {
  return (
    <Card className="aspect-square flex flex-col items-center justify-between p-4 border bg-muted/40 hover:shadow-md transition rounded-lg relative">
      <CardDropdown />
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        <FileText className="w-10 h-10 text-primary mb-2" />
        <p className="font-medium text-sm truncate w-full">{file.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{file.uploadedAt}</p>
      </div>
      <div className="flex">
        <Button variant="outline" size="sm" asChild className="w-auto">
          <Link href={file.url} download>
            <StampIcon className="w-4 h-4 mr-1" />
            Mint
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link href={file.url} download>
            <Trash2Icon className="w-4 h-4 mr-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export function RecentUploadsCard({ uploads }: { uploads: IUploads[] }) {
  return (
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload your file</DialogTitle>
              <DialogDescription>
                Choose a file and upload it securely. Max file size 16MB.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="jobTitle"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="jobTitle"
                  type="text"
                  placeholder="e.g. Software Engineer Resume"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <UploadFiles />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" className="gap-2">
                  <Upload className="w-4 h-4" /> Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}

function CardDropdown() {
  return (
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
            <Link href={""} target="_blank">
              <Eye className="w-4 h-4 mr-2" /> View Doc
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BarChart className="w-4 h-4 mr-2" /> Analyze
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
