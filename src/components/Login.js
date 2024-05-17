import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import '../styles/login.css';

const SIGNUP_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    createUser(
      email: $email,
      password: $password,
      username: $username
    ) {
      user {
        id
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    username: '',
    password: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ tokenAuth }) => {
      localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
      console.log(tokenAuth.token);
      navigate('/');
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: formState.email,
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ createUser }) => {
      console.log(createUser.user);
      // Si quieres iniciar sesión automáticamente después de registrarte, puedes agregar la lógica aquí
      navigate('/');
    }
  });

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column"
      id="inputs"
      >
        {!formState.login && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Tu email"
          />
        )}
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Tu usuario"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="tu Contraseña"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => formState.login ? login() : signup()}
        >
          {formState.login ? 'Iniciar sesion' : 'crea tu cuenta'}
        </button>
        <button
          className="pointer button"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
