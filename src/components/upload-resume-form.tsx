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
import { Upload, Wallet } from "lucide-react";
import { Input } from "./ui/input";
import UploadFiles from "./upload-file";

export default function UploadResumeForm() {
  const handleSubmit = async () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload your file</DialogTitle>
          <DialogDescription>
            Choose a file and upload it securely. Max file size 16MB.
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
      </DialogContent>
    </Dialog>
  );
}
