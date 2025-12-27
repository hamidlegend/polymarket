import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Farcaster webhook received:", body);

    // Handle different webhook events
    switch (body.event) {
      case "frame.added":
        console.log("Frame added to user's collection");
        break;
      case "frame.removed":
        console.log("Frame removed from user's collection");
        break;
      case "notification.clicked":
        console.log("User clicked notification");
        break;
      default:
        console.log("Unknown event:", body.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
