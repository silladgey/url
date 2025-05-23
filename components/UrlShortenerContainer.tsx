"use client";
import { useState } from "react";
import ShortenForm from "@/components/ShortenForm";
import UrlList from "@/components/UrlList";

const UrlShortenerContainer = () => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleUrlShortener = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return (
		<div>
			<ShortenForm handleUrlShortener={handleUrlShortener} />
			<UrlList key={refreshKey} />
		</div>
	);
};

export default UrlShortenerContainer;
