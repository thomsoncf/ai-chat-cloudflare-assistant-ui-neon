import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { prompt?: string };
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: "Cloudflare credentials not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/leonardo/phoenix-1.0`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Cloudflare AI API error:", error);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: response.status }
      );
    }

    // The response is a binary image
    const imageBlob = await response.blob();
    
    // Convert to base64 for easy transmission
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${imageBlob.type};base64,${base64}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
