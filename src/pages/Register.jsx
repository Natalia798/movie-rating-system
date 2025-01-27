import React, { useContext } from 'react';
import { AuthContext } from '../store/auth/context';
import AuthForm from '../components/AuthForm';

function Register() {
  const { dispatch } = useContext(AuthContext);

  function handleRegister(username, password, setError, navigate) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some((user) => user.username === username)) {
      setError('Username already exists!');
      return;
    }

    const newUser = { username, password, reviews: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

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
