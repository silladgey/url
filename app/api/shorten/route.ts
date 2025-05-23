import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
	const { url: urlToShorten } = await request.json();

	if (!urlToShorten) {
		return NextResponse.json({ error: "URL is required" }, { status: 400 });
	}

	const shortCode = nanoid(6);
	const shortenedUrl = await prisma.url.create({
		data: {
			slug: shortCode,
			original: urlToShorten,
		},
	});

	return NextResponse.json({ shortCode: shortenedUrl.slug }, { status: 200 });
}
