import React, { useContext } from 'react';
import { AuthContext } from '../store/auth/authContext';
import AuthForm from '../components/AuthForm';
import { hashPassword } from '../utils/cryptoUtils';

function Register() {
  const { dispatch } = useContext(AuthContext);

  async function handleRegister(username, password, setError, navigate) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some((user) => user.username === username)) {
      setError('Username already exists!');
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = { username, password: hashedPassword, reviews: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('user', JSON.stringify(newUser));

    dispatch({ type: 'REGISTER', payload: newUser });
    navigate('/');
  }

  return (
    <AuthForm
      formType="register"
      onSubmit={handleRegister}
      buttonText="Create Account"
      redirectText="Do you already have an account?"
      redirectLink="/login"
      redirectLinkName="Login"
    />
  );
}

export default Register;
