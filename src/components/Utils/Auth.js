// src/components/Auth.js
import { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Sign Up Successful');
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign In Successful');
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Update the authentication state
      alert('Sign Out Successful');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Auth;
