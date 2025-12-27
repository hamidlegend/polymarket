import { NextRequest, NextResponse } from "next/server";
import { GAMMA_API_ENDPOINT } from "@/utils/constants";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit") || "50";

    let url = `${GAMMA_API_ENDPOINT}/markets?active=true&closed=false&limit=${limit}`;

    if (tag) {
      url += `&tag=${tag}`;
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch markets");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
}
