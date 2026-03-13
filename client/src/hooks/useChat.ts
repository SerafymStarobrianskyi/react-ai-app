import { useState } from "react";
import { sendMessage } from "../services/chatApi";
import type { Message } from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Write a question",
    },
  ]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  async function submitMessage(input: string) {
    const trimmedInput = input.trim();
    if (!trimmedInput || isStreaming) return;

    const abort = new AbortController();
    setController(abort);

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    const assistantMessage: Message = {
      role: "assistant",
      content: "",
    };

    const nextMessages = [...messages, userMessage];

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    try {
      const res = await sendMessage(nextMessages, abort.signal);

      if (!res.body) {
        throw new Error("Response body is empty");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.message?.content) {
              fullText += data.message.content;

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: fullText,
                };
                return updated;
              });
            }
          } catch {
            continue;
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "An error occurred. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setController(null);
    }
  }

  function stopStreaming() {
    controller?.abort();
    setController(null);
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content: "Hello! Write a question",
      },
    ]);
  }

  return {
    messages,
    isStreaming,
    submitMessage,
    stopStreaming,
    clearChat,
  };
}
