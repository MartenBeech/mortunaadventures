import React, { useState } from "react";
import { Navbar } from "./components/navbar";
import { Login } from "./components/pages/login";

function App() {
  const [token, setToken] = useState("");
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
    </div>
  );
}

export default App;
