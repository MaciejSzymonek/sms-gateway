// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/*login */}
        <Route path="/tables" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
