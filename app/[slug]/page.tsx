import { redirect } from "next/navigation";
import prisma from "@/lib/db";

interface RedirectPageProps {
	params: Promise<{ slug: string }>;
}

const RedirectPage = async ({ params }: RedirectPageProps) => {
	const { slug } = await params;

	const url = await prisma.url.findUnique({
		where: { slug },
	});

	if (!url) {
		return <div>URL not found</div>;
	}

	await prisma.url.update({
		where: { id: url.id },
		data: { visits: { increment: 1 } },
	});

	redirect(url.original);
};

export default RedirectPage;
