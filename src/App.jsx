import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./page/Homepage";
import Register from "./page/Register";
import Signin from "./page/Signin";

export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="relative">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;