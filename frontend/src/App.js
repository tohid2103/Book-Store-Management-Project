import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AddBook from "./pages/AddBook";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IssueReturn from "./pages/IssueReturn";


function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/register"]; // ❌ No Navbar on these pages
  const loggedUser = localStorage.getItem("user");

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Default route → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={loggedUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories"
          element={loggedUser ? <Categories /> : <Navigate to="/login" />}
        />
        <Route
          path="/addbook"
          element={loggedUser ? <AddBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/aboutus"
          element={loggedUser ? <AboutUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={loggedUser ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={loggedUser ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route path="/issue-return" element={<IssueReturn />} />


        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
