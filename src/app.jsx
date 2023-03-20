import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import HeaderAuth from "./components/templates/header-auth";
import Header from "./components/templates/header";
import Login from "./components/authentification/login";
import Register from "./components/authentification/register";
import Password from "./components/authentification/password";
import HomePage from "./components//homePage";
import Footer from "./components/templates/footer";
import "./app.scss";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";

// CONTEXTS
import User from "./contexts/userContext";

export default function App() {
  const [user, setUser] = useState(null);
  const authToken = Cookies.get("auth_token");

  // LIGHT DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const appClass = isDarkMode ? "dark-mode" : "light-mode";
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("dark-mode", !isDarkMode);
  };

  useEffect(() => {
    const darkModeCookie = Cookies.get("dark-mode");
    if (darkModeCookie === "true") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <main id="App" className={"App " + appClass}>
      <ToastContainer position="top-left" autoClose={3000} />
      <User.Provider value={{ user, setUser }}>
        <Router>
          <div id="LightDarkMode">
            <button className="mode" onClick={toggleDarkMode}>
              {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
            </button>
          </div>
          {authToken ? <Header /> : <HeaderAuth />}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/login/identity/forgotten-password"
              element={<Password />}
            />
            <Route exact path="/hp" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </User.Provider>
    </main>
  );
}
