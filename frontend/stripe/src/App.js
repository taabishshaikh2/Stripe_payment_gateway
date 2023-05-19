import React from "react";


import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Success from "./components/Success";
import Error from "./components/Error";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
