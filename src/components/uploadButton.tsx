"use client";

import { useState } from "react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

function useUploadHandlers() {
  const [uploading, setUploading] = useState(false);

  return {
    uploading,
    onUploadBegin: (fileName: string) => {
      setUploading(true);
    },
    onUploadProgress: (progress: number) => {
      toast.message(`Uploading: ${progress}%`);
    },
    onClientUploadComplete: (res: any) => {
      setUploading(false);
      if (!res || res.length === 0) {
        toast.error("No files uploaded");
        return;
      }

      const fileNames = res.map((f: any) => f.name).join(", ");
      toast.success(`Upload Completed: ${fileNames}`);
      console.log("✅ Uploaded files:", res);
    },
    onUploadError: (error: Error) => {
      setUploading(false);
      toast.error(`Upload failed: ${error.message}`);
      console.error(error);
    },
  };
}

export function FileUploadButton() {
  const handlers = useUploadHandlers();

  return (
    <div className="flex flex-col items-center gap-2">
      <UploadButton
        endpoint="imageUploader"
        {...handlers}
        content={{
          button({ ready }) {
            return handlers.uploading
              ? "Uploading..."
              : ready
              ? "Upload File"
              : "Loading...";
          },
        }}
      />
    </div>
  );
}

export const FileUploadDropzone = () => {
  const handlers = useUploadHandlers();

  return (
    <div className="w-full max-w-lg">
      <UploadDropzone
        endpoint="imageUploader"
        {...handlers}
        content={{
          label: "Drag & Drop files here or click to upload",
        }}
      />
    </div>
  );
};
