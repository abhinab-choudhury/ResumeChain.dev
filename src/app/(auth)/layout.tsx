import { siteConfig } from "@/config/site.config";
import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between h-screen">
            <div className="hidden lg:grid lg:place-content-center lg:w-1/2 h-full bg-black">
                <Image height={500} width={500} src="/logo.png" alt={siteConfig.name} className="m-auto" />
            </div>
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-2 md:px-0">
                {children}
            </div>
        </div>
    );
}