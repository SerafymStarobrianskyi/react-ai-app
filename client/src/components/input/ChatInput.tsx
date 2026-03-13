import { useEffect, useRef, useState } from "react";
import "./ChatInput.css";

type Props = {
  onSubmitMessage: (input: string) => Promise<void>;
  onStop: () => void;
  isStreaming: boolean;
};

export default function ChatInput({
  onSubmitMessage,
  onStop,
  isStreaming,
}: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isStreaming) {
      inputRef.current?.focus();
    }
  }, [isStreaming]);

  async function submitMessage() {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setInput("");

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    await onSubmitMessage(trimmedInput);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitMessage();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="form-container">
        <textarea
          className="input"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          disabled={isStreaming}
          ref={inputRef}
        />

        {isStreaming ? (
          <button className="button" type="button" onClick={onStop}>
            Stop
          </button>
        ) : (
          <button className="button" type="submit">
            Send
          </button>
        )}
      </div>
    </form>
  );
}
