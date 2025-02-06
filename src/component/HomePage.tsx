import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const ExtraPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Extra Sida</h1>
      <p>Det här är en extra sida.</p>
      <Link to="/home" className="text-blue-500 underline">
        Gå till startsidan
      </Link>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Startsidan</h1>
      <Link to="/extra" className="text-blue-500 underline">
        Gå till extra sidan
      </Link>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/extra" element={<ExtraPage />} />
      </Routes>
    </Router>
  );
};

export default App;
