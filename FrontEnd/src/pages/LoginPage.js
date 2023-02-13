import React from 'react';
import styled from 'styled-components';
import { TextField, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/signin-image.jpg';
import LoginForm from '../components/form/LoginForm';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';

const LoginPage = () => {
  const { role } = useAuthContext();
  const history = useHistory();

  if (role) {
    history.push('/');
  }

  return (
    <Wrapper className="home">
      <LoginForm />
      <div className="form-img">
        <img src={image} alt=""></img>
      </div>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-left: 20rem;
  height: 85vh;

  .login-container {
    width: 320px;
    /* height: 500px; */
    border: 1px solid #ccc;
    /* background: url(https://i.gifer.com/H0dA.gif) center center no-repeat; */
    background: #51a8ff;
    background-size: cover;
    margin: 30px auto;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .login-container .form-login {
    width: 100%;
    height: 100%;
    padding: 15px 25px;
  }
  .login-container .form-login h2 {
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  .login-container .form-login input {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 15px;
    color: black;
    border-radius: 5px;
    font-size: 14px;
  }
  .login-container .form-login input:focus {
    border: 1px solid rgba(255, 255, 255, 0.8);
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: #ddd;
  }
  .login-container .form-login input.submit {
    background: rgba(255, 255, 255, 0.9);
    color: #444;
    font-size: 15px;
    margin-top: 40px;
    font-weight: bold;
    cursor: pointer;
  }

  .text {
    display: inline-block;
    margin-top: 22px;
    color: black;
  }

  .text:hover {
    font-weight: bold;
  }

  /* .form {
    margin: 5rem 5rem;
  }

  form {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 3rem 7rem;
    text-align: center;
  } */

  .form-img {
    display: none;
    width: 100%;
    img {
      width: 100%;
    }
  }

  .btn-signup {
    margin-top: 2rem;
  }

  .link-to-signup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4rem;
    color: blue;
  }

  @media screen and (min-width: 1169px) {
    .form {
      max-width: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    grid-template-columns: 1fr 2fr;

    .form-img {
      width: 600px;
      height: 400px;
      display: flex;
      padding-left: 5rem;
    }
  }
`;
