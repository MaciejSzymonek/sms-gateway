// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./component/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/*login */}
        <Route path="/tables" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
