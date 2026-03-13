import "./styles/App.css";
import ChatHeader from "./components/header/ChatHeader";
import ChatInput from "./components/input/ChatInput";
import Chat from "./components/chat/Chat";
import { useChat } from "./hooks/useChat";

function App() {
  const {
    messages,
    isStreaming,
    submitMessage,
    stopStreaming,
    clearChat,
  } = useChat();

  return (
    <div className="app">
      <ChatHeader clearChat={clearChat} />
      <Chat messages={messages} />
      <ChatInput
        onSubmitMessage={submitMessage}
        onStop={stopStreaming}
        isStreaming={isStreaming}
      />
    </div>
  );
}

export default App;
