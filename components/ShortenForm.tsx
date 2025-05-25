"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ShortenFormProps {
	handleUrlShortener: () => void;
}

const ShortenForm = ({ handleUrlShortener }: ShortenFormProps) => {
	const [url, setUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const shortenedUrl = (slug: string) => {
		return `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		if (!url) {
			alert("Please enter a URL to shorten.");
			return;
		}

		try {
			const response = await fetch("/api/shorten", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			const data = await response.json();

			if (response.ok && data.shortCode) {
				console.log("Shortened URL:", data.shortCode);
				try {
					await navigator.clipboard.writeText(
						shortenedUrl(data.shortCode)
					);
				} catch (clipboardError) {
					console.error(
						"Failed to copy to clipboard:",
						clipboardError
					);
				}
			} else {
				console.error("Error shortening URL:", data);
			}
			setUrl("");
			handleUrlShortener();
		} catch (error) {
			console.error("Error shortening URL:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<div className="space-y-4">
				<Input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="h-12"
					type="url"
					placeholder="Enter URL to shorten"
					required
				/>
				<Button
					className="w-full p-2"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? "Shortening..." : "Shorten URL"}
				</Button>
			</div>
		</form>
	);
};

export default ShortenForm;
