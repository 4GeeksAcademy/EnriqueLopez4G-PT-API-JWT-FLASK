// src/front/js/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import {Navbar}  from "./component/Navbar.jsx";
import {Footer} from "./component/Footer.jsx";
import Login from "./component/Login.jsx";
import SignUp from "./component/SignUp.jsx";
import Private from "./pages/Private";
import Home from "./pages/Home"
import { ViewContext } from "./pages/ViewContext.js";
import LogOut from "./component/LogOut.jsx";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route path="/home" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/viewcontext" element={<ViewContext />} />
            <Route path="/private" element={<Private />} /> 
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
