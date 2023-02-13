import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth_context';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { role, errorMessage, getData, countSubmitTime } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (role) {
      if (!localStorage.getItem('NotShowNotifications')) {
        openNotification('Login Successfully.', 'success');
        localStorage.setItem('NotShowNotifications', 'true');
      }
      history.push('/');
    }
    if (!role && errorMessage && email && password) {
      openNotification(errorMessage, 'error');
    }
  }, [role, errorMessage, countSubmitTime]);

  return (
    <div className="login-container">
      <form
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          getData(email, password, 'login');
        }}>
        <h2>Đăng nhập</h2>
        <input
          type="email"
          placeholder="Nhập Email"
          aria-describedby="note"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/register" className="text">
          Chưa có tài khoản? Tạo ngay!
        </Link>
        <input type="submit" value="Đăng nhập ngay" className="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
