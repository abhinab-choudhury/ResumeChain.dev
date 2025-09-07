import DashboardClient from "@/components/dashboard-client";
import { getUser } from "@/lib/auth-utils";

export default async function DashboardPage() {
  const user = await getUser();
  return <DashboardClient user={user} />;
}
