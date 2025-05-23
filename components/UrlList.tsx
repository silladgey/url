"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";

type UrlDetails = {
	id: string;
	slug: string;
	original: string;
	visits: number;
	createdAt: string;
};

const UrlList = () => {
	const [urls, setUrls] = useState<UrlDetails[]>([]);
	const [copied, setCopied] = useState<boolean>(false);
	const [copyUrl, setCopyUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const shortenedUrl = (slug: string) => {
		return `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
	};

	const fetchUrls = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/urls", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("Fetched URLs:", data);
			setUrls(data);
		} catch (error) {
			console.error("Error fetching URLs:", error);
			setUrls([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUrls();
	}, []);

	const handleCopyUrl = (slug: string) => {
		navigator.clipboard.writeText(shortenedUrl(slug)).then(() => {
			setCopied(true);
			setCopyUrl(slug);
			setTimeout(() => {
				setCopied(false);
				setCopyUrl("");
			}, 2000);
		});
	};

	if (isLoading) {
		return (
			<div className="animate-pulse">
				<div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
				<ul className="space-y-2">
					{[1, 2, 3].map((num) => (
						<li
							key={num}
							className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between"
						>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							<div className="flex items-center gap-3">
								<div className="h-5 w-5 bg-gray-200 rounded"></div>
								<span className="flex items-center gap-2">
									<div className="h-4 w-4 bg-gray-200 rounded"></div>
									<div className="h-4 bg-gray-200 w-10 rounded"></div>
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
			<ul className="space-y-2">
				{urls.map((url) => (
					<li
						key={url.id}
						className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
					>
						<div className="flex items-center">
							<Link
								href={shortenedUrl(url.slug)}
								target="_blank"
								className="text-blue-500"
							>
								{`${url.original}`}
							</Link>
						</div>
						<div className="flex items-center">
							<span className="flex items-center gap-2">
								<EyeIcon className="w-4 h-4" /> {url.visits}{" "}
								views
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:bg-muted"
								onClick={() => handleCopyUrl(url.slug)}
							>
								{copied && copyUrl == url.slug ? (
									<Check className="w-4 h-4 " />
								) : (
									<CopyIcon className="w-4 h-4" />
								)}

								<span className="sr-only">Copy URL</span>
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UrlList;
