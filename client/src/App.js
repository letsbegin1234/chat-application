import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:id" element={<Chat />} />
      </Routes>
    </Router>
  );
}
export default App;
