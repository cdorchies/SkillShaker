import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/templates/header";
import Login from "./components/authentification/login";
import Register from "./components/authentification/register"
import Footer from "./components/templates/footer";
import "./app.scss";

export default function app() {
  return (
    <main id="App" className="App">
      <Router>
        <body>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </body>
      </Router>
    </main>
  );
}
