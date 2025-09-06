import { getUser } from "@/lib/auth-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
	const user = await getUser();

	return (
		<div className="flex flex-col items-center justify-start w-full min-h-[calc(100vh-4rem)] px-4 py-8">
			<Card className="w-full max-w-2xl bg-transparent border-none shadow-none">
				<CardHeader className="px-0">
					<div className="flex items-center gap-4">
						<Avatar className="h-14 w-14">
							<AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
							<AvatarFallback>
								<User className="h-6 w-6" />
							</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
							<CardDescription className="text-muted-foreground">
								Manage your account information and preferences.
							</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-6 px-0">
					{/* Profile Info */}
					<div className="grid gap-6">
						<div className="flex flex-col space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={user?.name ?? "Not provided"}
								disabled
								className="border-none bg-muted/30 shadow-none focus-visible:ring-0"
							/>
						</div>
						<div className="flex flex-col space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								value={user?.email ?? "Not provided"}
								disabled
								className="border-none bg-muted/30 shadow-none focus-visible:ring-0"
							/>
						</div>
						<div className="flex justify-between align-middle items-center">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar className="h-4 w-4" />
								<span>
									Joined: {user?.createdAt ? new Date(user.createdAt).toDateString() : "Unknown"}
								</span>
							</div>
							<Button variant="destructive" className="gap-2 cursor-pointer">
								<LogOut className="h-4 w-4" />
								Sign out
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
