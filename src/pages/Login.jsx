import React, { useContext } from 'react';
import { AuthContext } from '../store/auth/authContext';
import AuthForm from '../components/AuthForm';
import { verifyPassword } from '../utils/cryptoUtils';

function Login() {
  const { dispatch } = useContext(AuthContext);

  async function handleLogin(username, password, setError, navigate) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find((user) => user.username === username);

    if (!existingUser) {
      setError('Invalid username or password!');
      return;
    }

    const passwordMatch = await verifyPassword(password, existingUser.password);
    if (!passwordMatch) {
      setError('Invalid username or password!');
      return;
    }

    localStorage.setItem('user', JSON.stringify(existingUser));

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
