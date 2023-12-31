import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../config/firebase-config';
import './css/LoginUI.css';
import { useUser } from '../context/UserContext';
import { setRememberMe, getRememberMe } from '../utils/LocalStorage'; // Import localStorage functions

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const LoginUI = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(getRememberMe()); // Initialize from local storage

  const { setUser } = useUser(); // Use the user context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Store the user information in the context
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setUser]);

  const handleEmailAndPasswordSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object
      
      console.log('Email and password login successful', user);
      setErrorMessage(''); // Clear any previous error message

      // Check if "Remember Me" is checked and set it in local storage
      if (rememberMe) {
        setRememberMe(email, password);
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid email or password'); // Set the error message
      } else {
        console.error('Other sign-in error:', error.message);
        setErrorMessage('An error occurred while signing in. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    // ...
  };

  const handleMicrosoftSignIn = async () => {
    // ...
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailAndPasswordSignIn();
    console.log('Login submitted');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email (W&M Only)</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>
        <button
          type="button"
          className="google-button"
          onClick={handleGoogleSignIn}
        >
          <img
            src="/googlelogo.png"
            alt="Google Logo"
            className="google-logo"
          />
          Sign In with Google
        </button>
        <button
          type="button"
          className="microsoft-button"
          onClick={handleMicrosoftSignIn}
        >
          <img
            src="/microsoftlogo.png"
            alt="Microsoft Logo"
            className="microsoft-logo"
          />
          Sign In with Microsoft
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default LoginUI;