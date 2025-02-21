import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./page/Homepage";
import Register from "./page/Register";
import Signin from "./page/Signin";
import Profile from "./page/Profile";
import Searchpage from "./page/Searchpage";
import HotelForm from "./page/HotelForm";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Viewhotel from "./page/Viewhotel";
import PaymentPage from "./page/PaymentPage";
import SuccessPage from "./page/SuccessPage";
import FailurePage from "./page/FailurePage";
import Bookingconfirm from "./page/BookingConfirmation";
import PaymentWindow from "./page/PaymentWindow";

export const App = () => {
  return (
    <AuthProvider> {/* Wrap Router with AuthProvider */}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="relative">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/Searchpage" element={<Searchpage />} />
          <Route path="/HotelForm" element={<HotelForm />} />
          <Route path="/Viewhotel/:id" element={<Viewhotel />} />
          <Route path="/payment" element={<PaymentPage  />} />
          <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/book" element={<Bookingconfirm />} />
        <Route path="/window" element={<PaymentWindow />} />
        <Route path="/profile" element={<Profile/>} />
       
          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
                 {/* Only accessible when logged in */}
              </ProtectedRoute>
            }
          />
            
             
          
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
