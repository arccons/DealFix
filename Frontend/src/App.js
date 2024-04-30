import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Layout from "./Layout";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Mappings from "./pages/Mappings"

function App() {
  const [pageMsg, setPageMsg] = useState("");
  const [DBdeal, setDBdeal] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout pageMsg={pageMsg} />}>
          <Route index element={<Deals setDBdeal={setDBdeal} setPageMsg={setPageMsg} />} />
          <Route path="mappings" element={<Mappings DBdeal={DBdeal} setPageMsg={setPageMsg} />} />
          <Route path="contact" element={<Contact setPageMsg={setPageMsg} />} />
          <Route path="about" element={<About setPageMsg={setPageMsg} />} />
          <Route path="*" element={<NoPage setPageMsg={setPageMsg} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
