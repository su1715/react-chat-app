import Chat from "./Chat";
import DirectMessage from "./DirectMessage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dm" element={<DirectMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
