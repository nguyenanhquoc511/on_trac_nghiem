const auth_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    if (action.payload.email || action.payload.password) {
      return {
        ...state,
        errorMessage: action.payload.email || action.payload.password,
        countSubmitTime: state.countSubmitTime + 1,
        isLoading: false
      };
    } else {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.newUser || action.payload.user,
        token: action.payload.accesstoken,
        role: action.payload.newUser ? action.payload.newUser.role : action.payload.user.role,
        countSubmitTime: state.countSubmitTime + 1
      };
    }
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
    return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
  }

  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user');
    return { ...state, data: {}, isLoading: false, isError: false, errorMessage: '', role: '' };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default auth_reducer;
