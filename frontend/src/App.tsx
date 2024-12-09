import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CountriesList from "./pages/CountriesList.tsx";
import Layout from "./layout/PageLayout.tsx";
import CountryDetails from "./pages/CountryDetails.tsx";

function App() {
  return (
    <div className="text-darkGrey">
      <main>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<CountriesList />} />
              <Route path="/country/:code" element={<CountryDetails />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
