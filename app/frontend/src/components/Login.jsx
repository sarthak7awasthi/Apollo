// Login.js
import React, { useState } from 'react';
import { useFirebaseAuth } from './Firebase/useFirebaseAuth';

function Login() {
  const { signIn, authError } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {authError && <p style={{ color: 'red' }}>{authError}</p>}
    </div>
  );
}

export default Login;
