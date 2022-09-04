import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setDrawer((prevDrawer) => {
      return !prevDrawer;
    });
  };

  return (
    <>
      <BrowserRouter>
        <Navbar toggleDrawer={toggleDrawer} />
        <Drawer drawer={drawer} toggleDrawer={toggleDrawer} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
