import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAuth from "./components/templates/header-auth";
import Header from "./components/templates/header";
import Login from "./components/authentification/login";
import Register from "./components/authentification/register";
import Password from "./components/authentification/password";
import HomePage from "./components//homePage";
import Footer from "./components/templates/footer";
import "./app.scss";

// CONTEXTS
import User from "./contexts/userContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <main id="App" className="App">
      <ToastContainer position="top-left" autoClose={3000} />
      <User.Provider value={{ user, setUser }}>
        <Router>
          {user ? <Header /> : <HeaderAuth />}
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
