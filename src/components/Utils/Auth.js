import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up

  // Handle user sign-in
  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        throw new Error('Email or password cannot be empty');
      }
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign In Successful');
      setIsAuthenticated(true); // Close the login form after successful login
    } catch (error) {
      console.error('Error signing in: ', error.message);
      alert('Sign In Failed: ' + error.message);
    }
  };

  // Handle user sign-up (for creating new users)
  const handleSignUp = async () => {
    try {
      if (!email || !password) {
        throw new Error('Email or password cannot be empty');
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Sign Up Successful');
      setIsAuthenticated(true); // Close the form after successful sign-up
    } catch (error) {
      console.error('Error signing up: ', error.message);
      alert('Sign Up Failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '20px', marginTop: '10px', maxWidth: '300px' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {isSignUp ? (
        <button onClick={handleSignUp} style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          Sign Up
        </button>
      ) : (
        <button onClick={handleSignIn} style={{ width: '100%', padding: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          Sign In
        </button>
      )}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        style={{ width: '100%', padding: '10px', backgroundColor: '#f1f1f1', color: '#333', border: 'none', borderRadius: '4px' }}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Auth;
