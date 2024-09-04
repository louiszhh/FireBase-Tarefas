// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConnect';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import NavBar from './components/NavBar';
import Auth from './components/Auth';
import Tasks from './components/Tasks';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <NavBar onLogout={handleLogout} user={user} />
      {!user ? <Auth onUserLogin={setUser} /> : <Tasks user={user} />}
    </div>
  );
}

export default App;
