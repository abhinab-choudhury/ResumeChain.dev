import { getUser } from "@/lib/auth-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface IResults {
	id: number; title: string; description: string
}

export default async function SearchPage() {
	const user = await getUser();

	const results: IResults[] = [
		{
			id: 1,
			title: "Alice Johnson",
			description: "Frontend Engineer",
		},
		{
			id: 2,
			title: "Bob Smith",
			description: "Backend Engineer",
		},
		{
			id: 3,
			title: "Carla Mendes",
			description: "DevOps Engineer",
		},
		{
			id: 4,
			title: "David Lee",
			description: "Machine Learning Engineer",
		},
		{
			id: 5,
			title: "Ella Martinez",
			description: "Mobile Engineer",
		},
		{
			id: 6,
			title: "Frank Zhao",
			description: "Data Engineer",
		},
		{
			id: 7,
			title: "Grace Kim",
			description: "Security Engineer",
		},
		{
			id: 8,
			title: "Henry Patel",
			description: "Software Engineer",
		},
	];


	return (
		<div className="flex flex-col items-center justify-start w-full min-h-[calc(100vh-4rem)]">
			<Card className="w-full bg-card/50 shadow-lg border-muted/20 backdrop-blur-sm rounded-lg">
				<CardHeader className="space-y-1">
					<CardTitle className="text-xl font-semibold">Search</CardTitle>
					<CardDescription className="text-muted-foreground">
						Find documents, uploads, or resources in your dashboard.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="flex items-center gap-2">
						<Input
							type="text"
							placeholder="Search files, titles, or keywords..."
							className="flex-1 border-muted/30 bg-muted/30 shadow-none focus-visible:ring-0"
						/>
						<Button type="submit" className="gap-2">
							<Search className="w-4 h-4" />
							Search
						</Button>
					</form>

					<div className="mt-6">
						{results.length > 0 ? (
							<div className="grid gap-4 sm:grid-cols-2">
								{results.map((r) => (
									<Card
										key={r.id}
										className="p-4 border bg-muted/40 hover:shadow-md transition rounded-lg"
									>
										<h3 className="font-medium text-base">{r.title}</h3>
										<p className="text-sm text-muted-foreground mt-1">
											{r.description}
										</p>
									</Card>
								))}
							</div>
						) : (
							<div className="text-center text-sm text-muted-foreground italic py-6">
								No results found. Try a different query.
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
