import React, { useContext } from 'react';
import { AuthContext } from '../store/auth/authContext';
import AuthForm from '../components/AuthForm';

function Login() {
  const { dispatch } = useContext(AuthContext);

  function handleLogin(username, password, setError, navigate) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!existingUser) {
      setError('Invalid username or password!');
      return;
    }

    dispatch({ type: 'LOGIN', payload: existingUser });
    navigate('/');
  }

  return (
    <AuthForm
      formType="login"
      onSubmit={handleLogin}
      buttonText="Login"
      redirectText="Don't have an account?"
      redirectLink="/register"
      redirectLinkName="Register"
    />
  );
}

export default Login;
