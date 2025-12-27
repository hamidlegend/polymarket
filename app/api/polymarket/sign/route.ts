import { NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function GET() {
  try {
    const apiKey = process.env.POLYMARKET_BUILDER_API_KEY;
    const secret = process.env.POLYMARKET_BUILDER_SECRET;
    const passphrase = process.env.POLYMARKET_BUILDER_PASSPHRASE;

    if (!apiKey || !secret || !passphrase) {
      return NextResponse.json(
        { error: "Builder credentials not configured" },
        { status: 500 }
      );
    }

    const timestamp = Date.now();
    const message = timestamp.toString();
    const signature = createHmac("sha256", secret)
      .update(message)
      .digest("base64");

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      passphrase,
    });
  } catch (error) {
    console.error("Error creating signature:", error);
    return NextResponse.json(
      { error: "Failed to create signature" },
      { status: 500 }
    );
  }
}
