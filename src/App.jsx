// @ts-check

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import index from './slices/store.js';

export default function App() {
  return (
    <Provider store={index}>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a href="/" className="navbar-brand">Hexlet Chat</a>
              </div>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  (
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  )
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
