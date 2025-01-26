import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';

function AuthForm({
  formType,
  onSubmit,
  buttonText,
  redirectText,
  redirectLink,
  redirectLinkName,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password) {
      setError('All fields are required!');
      return;
    }
    onSubmit(username, password, setError, navigate);
  }

  return (
    <Container className={styles.container}>
      <h2>{formType === 'register' ? 'Create Account' : 'Login'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className={styles.registerButton}
        >
          {buttonText}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        {redirectText}
        <a href={redirectLink} className={styles.loginButton}>
          {' '}
          {redirectLinkName}
        </a>
      </p>
    </Container>
  );
}

export default AuthForm;
