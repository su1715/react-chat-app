export default function Input({ message, setMessage, sendMessage }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };
  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
}
