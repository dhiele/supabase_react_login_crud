import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? <Tasks /> : <Login />}
    </div>
  );
}

export default App;
