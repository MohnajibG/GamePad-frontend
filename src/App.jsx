import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Components
import Header from "./components/Header";
import Aside from "./components/Aside";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Reviews from "./pages/Reviews";
import { GameProvider } from "./contexts/GameContext";
import Game from "./pages/Game";

// CSS
import "./App.css";

// Export
function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);
  const [search, setSearch] = useState("");

  const handleToken = (token, username) => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
    if (username) {
      Cookies.set("username", username, { expires: 30 });
      setUsername(username);
    } else {
      Cookies.remove("username");
      setUsername(null);
    }
  };

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUsername = Cookies.get("username");
    if (savedToken) setToken(savedToken);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  return (
    <GameProvider>
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          username={username}
          search={search}
          setSearch={setSearch}
        />
        <div className="menuandmain">
          <Aside handleToken={handleToken} username={username} />
          <Routes>
            <Route path="/" element={<Home token={token} search={search} />} />
            <Route
              path="/signup"
              element={<Signup handleToken={handleToken} />}
            />
            <Route
              path="/login"
              element={<Login handleToken={handleToken} />}
            />
            <Route
              path="/favorites"
              element={
                token ? <Favorites token={token} /> : <Navigate to="/login" />
              }
            />
            <Route path="/game/:id" element={<Game token={token} />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
