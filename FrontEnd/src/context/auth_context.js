import axios from 'axios';
import React, { useReducer, useContext, useEffect } from 'react';
import { register_url, login_url } from '../utils/constants';
import reducer from '../reducer/context/auth_reducer';
import { notification } from 'antd';
import { CheckCircleOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

const openNotification = (placement) => {
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
};

const initialState = JSON.parse(localStorage.getItem('user')) || {
  data: {},
  isLoading: false,
  isError: false,
  errorMessage: '',
  role: '',
  token: '',
  countSubmitTime: 0
};

const authContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async (email, password, type) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      const response = await axios.post(type === 'login' ? login_url : register_url, {
        email: email,
        password: password
      });
      const data = response.data;
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      let message = '';
      if (!error.response) {
        message = 'No Server Response';
      } else {
        message = 'Registration Failed';
      }
      dispatch({ type: 'GET_PRODUCTS_ERROR', payload: message });
    }
  };

  const logoutHandler = () => {
    openNotification('Logout successfully');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    if (!state.errorMessage) {
      localStorage.setItem('user', JSON.stringify(state));
    }
  }, [state]);

  return (
    <authContext.Provider value={{ ...state, getData, logoutHandler }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const useAuthContext = () => {
  return useContext(authContext);
};
