import React, { useMemo, useState } from 'react';
import AuthContext from './context/AuthContext.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userId) => {
    localStorage.setItem('userId', userId);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
