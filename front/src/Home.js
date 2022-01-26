import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      This is Simple Chat application
      <div>
        <Link to="/chat">Chat</Link>
      </div>
      <div>
        <Link to="/dm">DM</Link>
      </div>
    </div>
  );
}
