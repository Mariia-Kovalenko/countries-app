import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CountriesList from "./pages/CountriesList.tsx";

function App() {
  return (
    <div className="App">
      <header className=""></header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<CountriesList />} />
            {/* <Route path="/country/:code" element={<CountryInfo />} /> */}
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
