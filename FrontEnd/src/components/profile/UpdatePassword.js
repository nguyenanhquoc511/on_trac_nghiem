import React, { useState, useRef, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { PASSWORD_REGEX } from '../../utils/constants';
import MessageWarning from '../notification/MessageWarning';
import { update_password_url } from '../../utils/constants';
import { useAuthContext } from '../../context/auth_context';
import axios from 'axios';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const inputRef = useRef();

  const [newPassword, setNewPassword] = useState('');
  const [validNewPassword, setNewValidPassword] = useState('');
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);

  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [validConfirmNewPass, setValidConfirmNewPass] = useState('');
  const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);

  const [message, setMessage] = useState('');

  const { token, data } = useAuthContext();

  const getData = async () => {
    try {
      const response = await axios.put(
        update_password_url,
        {
          oldPassword: currentPassword,
          newPassword: newPassword
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data;
    } catch (error) {
      let message = '';
      if (!error.response) {
        message = 'No Server Response';
      } else {
        message = 'Change password Failed';
      }
    }
  };

  useEffect(() => {
    const resultCurPassword = PASSWORD_REGEX.test(currentPassword);
    const resultNewPassword = PASSWORD_REGEX.test(newPassword);

    setValidPassword(resultCurPassword);
    setNewValidPassword(resultNewPassword);
    setValidConfirmNewPass(newPassword === confirmNewPass);
  }, [currentPassword, newPassword, confirmNewPass]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  console.log(message);

  return (
    <div className="update-password-container">
      <form>
        <div>
          <h2>Enter Current Password:</h2>
          <Input.Password
            ref={inputRef}
            placeholder="Input current password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => setCurrentPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
        </div>
        <div>
          <h2>Enter New Password:</h2>
          <Input.Password
            placeholder="Input new password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setNewPasswordFocus(true)}
            onBlur={() => setNewPasswordFocus(false)}
          />
        </div>
        {newPassword && validNewPassword === false && newPasswordFocus === false && (
          <MessageWarning password />
        )}
        <div>
          <h2>Confirm New Password:</h2>
          <Input.Password
            placeholder="Confirm new password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => setConfirmNewPass(e.target.value)}
            onFocus={() => setConfirmNewPasswordFocus(true)}
            onBlur={() => setConfirmNewPasswordFocus(false)}
          />
        </div>
        {confirmNewPass && validConfirmNewPass === false && confirmNewPasswordFocus === false && (
          <MessageWarning confirmPass />
        )}
        <Button
          onClick={getData}
          style={{ color: 'yellow' }}
          type="primary"
          disabled={currentPassword && validNewPassword && validConfirmNewPass ? false : true}>
          Change password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
