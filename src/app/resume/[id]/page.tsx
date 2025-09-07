import { ProfileCard } from "@/components/app-card";

export default function ProfileDemoPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] px-4">
      <ProfileCard
        name="Jane Doe"
        typeOfEngineer="Senior Software Engineer"
        initials="JD"
        avatarUrl="/placeholder.svg"
        resumes={[
          "https://example-bucket.s3.amazonaws.com/jane_resume_v1.pdf",
          "https://example-bucket.s3.amazonaws.com/jane_resume_v2.pdf",
          "https://example-bucket.s3.amazonaws.com/jane_resume_v3.pdf",
        ]}
        verificationType="AI + Blockchain + DevOps + ML"
        status="Verified"
        score={92}
        version={2}
        verifiedBy="Titan Protocol"
        timestamp="2025-08-29 14:32 UTC"
        proofHash="0xabc1234567890def..."
        txHash="0x9f8a7b6c5d4e3..."
        resumeUrl="https://example-bucket.s3.amazonaws.com/jane_resume_v2.pdf"
        onShare={() => console.log("[demo] Share profile clicked")}
        onContact={() => console.log("[demo] Contact candidate clicked")}
        onMintProof={() => console.log("[demo] Mint proof clicked")}
      />
    </div>
  );
}
