import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes, sendEmailVerification } from 'firebase/auth';
import firebaseConfig from '../config/firebase-config';
import './css/SignupUI.css';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupUI = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(email)) {
      setInvalidEmail(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered successfully');
    // Send email verification
    await sendEmailVerification(auth.currentUser);
    console.log('Verification email sent');
    window.location.href = '/login';
    // Redirect to login or show a message
} catch (error) {
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
    setErrorMessage('Email address is already in use');
    } else {
    setErrorMessage('An error occurred. Please try again.');
    }
    }
  };

  const calculatePasswordStrength = () => {
    const minLength = 8;
    const maxLength = 20;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    let strength = 0;

    if (password.length == 0){
        return -1;
    }

    if (password.length >= minLength && password.length <= maxLength) {
        strength++;
    }

    if (hasLower && hasUpper) {
        strength++;
    }

    if (hasNumber) {
        strength++;
    }

    if (hasSpecial) {
        strength++;
    }

    return strength;
  };

  const getPasswordStrengthClass = () => {
    const strength = calculatePasswordStrength();
    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'medium';
    return 'strong';
  };



  return (
    <div className="signup-container">
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <label htmlFor="password">Password</label>
        <input
            className="password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <div className="password-strength">
          Strength: <span className={getPasswordStrengthClass()}>
            {
                calculatePasswordStrength() === -1 ? "" :
                calculatePasswordStrength() <= 1 ? "Weak" : 
                calculatePasswordStrength() <= 2 ? "Moderate" : "Strong"
            }
          </span>
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <button className="submit" type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupUI;