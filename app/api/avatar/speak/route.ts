export async function POST(req: Request) {
    const { sessionId, audioBase64 } = await req.json();
  
    await fetch(
      "https://api.heygen.com/v1/streaming.audio",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.HEYGEN_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          audio: audioBase64,
        }),
      }
    );
  
    return Response.json({ success: true });
  }
  