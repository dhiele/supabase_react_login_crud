import { useState } from 'react';
import { supabase } from '../supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert(error.message);
    } else {
      window.location.href = '/tasks';
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
