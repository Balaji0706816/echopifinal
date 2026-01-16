export async function POST() {
    const res = await fetch(
      "https://api.heygen.com/v1/streaming.new",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.HEYGEN_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar_name: "Anna",
          voice: {
            voice_id: "default",
          },
        }),
      }
    );
  
    const data = await res.json();
    return Response.json(data);
  }
  