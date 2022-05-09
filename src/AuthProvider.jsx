import React, { useEffect, useMemo, useState } from 'react';
import AuthContext from './context/AuthContext.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  const value = useMemo(() => ({
    loggedIn,
    logIn: (userId) => {
      localStorage.setItem('userId', userId);
      setLoggedIn(true);
    },
    logOut: () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    },
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
