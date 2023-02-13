import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import { notification } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

import MessageWarning from '../notification/MessageWarning';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constants';
import { useAuthContext } from '../../context/auth_context';

const openNotification = (placement, type) => {
  if (type === 'success') {
    notification.open({
      message: 'Notification!!',
      description: placement,
      icon: (
        <CheckCircleOutlined
          style={{
            color: 'green'
          }}
        />
      )
    });
  } else {
    notification.open({
      message: 'Notification!!',
      description: placement,
      icon: (
        <WarningOutlined
          style={{
            color: 'red'
          }}
        />
      )
    });
  }
};

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const inputRef = useRef();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPass, setConfirmPass] = useState('');
  const [validConfirmPass, setValidConfirmPass] = useState('');
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const { getData, role, errorMessage, isLoading, countSubmitTime } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const resultEmail = EMAIL_REGEX.test(email);
    const resultPassword = PASSWORD_REGEX.test(password);

    setValidEmail(resultEmail);
    setValidPassword(resultPassword);
    setValidConfirmPass(password === confirmPass);

    console.log(resultEmail, email, 'resultEmail');
    console.log(resultPassword, password, 'resultPassword');
  }, [email, password, confirmPass]);

  useEffect(() => {
    if (role) {
      if (!localStorage.getItem('NotShowNotifications')) {
        openNotification('Congratulations, your account has been successfully created.', 'success');
        localStorage.setItem('NotShowNotifications', 'true');
      }
      history.replace('/');
    }
    if (!role && errorMessage) {
      openNotification(errorMessage, 'error');
    }
  }, [role, errorMessage]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Wrapper className="register-container">
      <form
        className="register-login"
        onSubmit={(e) => {
          e.preventDefault();
          getData(email, password);
        }}>
        <h2>Đăng ký</h2>
        <div className="inputs">
          <input
            ref={inputRef}
            type="email"
            placeholder="Nhập Email"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          {email && validEmail === false && emailFocus === false && <MessageWarning email />}
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          {password && validPassword === false && passwordFocus === false && (
            <MessageWarning password />
          )}
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setConfirmPass(e.target.value)}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
          />
          {confirmPass && validConfirmPass === false && confirmPasswordFocus === false && (
            <MessageWarning confirmPass />
          )}
          <button
            type="submit"
            className="submit"
            disabled={validEmail && validPassword && validConfirmPass ? false : true}>
            {isLoading ? <Spin style={{ color: 'white' }} /> : 'Đăng ký ngay'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default RegisterForm;

const Wrapper = styled.div`
  .message-background {
    background-color: 'black';
    width: 100%;
    height: 100%;
  }
`;
