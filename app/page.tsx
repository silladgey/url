import UrlShortenerContainer from "@/components/UrlShortenerContainer";

const Home = () => {
	return (
		<main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl md:text-4xl font-bold">
					URL Shortener
				</h1>
				<p className="md:text-large">
					Shorten your URLs and share them easily
				</p>
			</div>
			<UrlShortenerContainer />
		</main>
	);
};

export default Home;
