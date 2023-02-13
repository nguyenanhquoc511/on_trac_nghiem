import React from 'react';
import styled from 'styled-components';
import image from '../assets/signup-image.jpg';
import RegisterForm from '../components/form/RegisterForm';
import { useAuthContext } from '../context/auth_context';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const { role } = useAuthContext();
  const history = useHistory();

  if (role) {
    history.push('/');
  }

  return (
    <Wrapper className="home">
      <RegisterForm />
      <div className="form-img">
        <img src={image} alt=""></img>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;

const Wrapper = styled.section`
  display: grid;
  height: 85vh;

  .register-container {
    width: 320px;
    /* height: 500px; */
    border: 1px solid #ccc;
    background: #51a8ff;
    background-size: cover;
    margin: 30px auto;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .register-container .register-login {
    width: 100%;
    height: 100%;
    padding: 15px 25px;
  }
  .register-container .register-login h2 {
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .register-container .register-login input {
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
  .register-container .register-login input:focus {
    border: 1px solid rgba(255, 255, 255, 0.8);
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: #ddd;
  }
  .register-container .register-login .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.9);
    color: #444;
    font-size: 15px;
    margin-top: 40px;
    margin-bottom: 10px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
    padding: 10px 0;
  }

  .register-container .register-login .submit:disabled {
    border: 1px solid #999999;
    background-color: darkgrey;
    color: #fff;
    padding: 10px;
    cursor: not-allowed;
  }

  .text {
    display: inline-block;
    margin-top: 22px;
    color: black;
  }

  .text:hover {
    font-weight: bold;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .message {
    display: flex;
    margin: -19px 0;
    padding: 0;
    column-gap: 5px;
    color: red;
  }

  .input-error {
    border: 2px solid red;
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
    margin-left: 4rem;
    display: none;
  }

  .btn-signup {
    margin-top: 2rem;
  }

  @media screen and (min-width: 992px) {
    .form {
      max-width: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    grid-template-columns: 1fr 2fr;

    .form-img {
      width: 400px;
      height: 400px;
      display: flex;
      justify-content: center;
      right: 0;
      margin-left: 15rem;
    }
  }
`;
