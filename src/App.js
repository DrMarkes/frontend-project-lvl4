// @ts-check

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.js';
import Login from './components/Login.js';
import NotFound from './components/NotFound.js';

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a href="/" className="navbar-brand">Hexlet Chat</a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
