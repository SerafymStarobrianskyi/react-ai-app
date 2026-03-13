const API_URL = import.meta.env.VITE_API_URL;
const MODEL = import.meta.env.VITE_MODEL;

export async function sendMessage(
  messages: { role: string; content: string }[],
  signal?: AbortSignal,
) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: true,
    }),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res;
}
