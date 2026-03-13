import "./ChatHeader.css";

type Props = {
  clearChat: () => void;
};

export default function ChatHeader({ clearChat }: Props) {
  return (
    <header className="top">
      <div className="top-container">
        <div>
          <h1>AI Chat</h1>
          <div className="hint">
            Powered by Ollama Cloud
          </div>
        </div>
        <button className="clear" type="button" onClick={clearChat}>
          <img src="/edit.png" alt="edit icon" className="clear-img" />
        </button>
      </div>
    </header>
  );
}
