const reading_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      data: action.payload.tests,
      curPage: action.payload.currentPage,
      totalPage: action.payload.totalPage,
      filter: {
        ...state.filter,
        search: localStorage.getItem('search') || '',
        type: localStorage.getItem('type') || 'all',
        sort: localStorage.getItem('sort') || '-createdAt',
        testType: localStorage.getItem('testType') || 'reading'
      }
    };
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === 'SET_CURRENT_PAGE') {
    return { ...state, curPage: action.payload };
  }

  if (action.type === 'CLEAR_FILTER') {
    return {
      ...state,
      curPage: 1,
      reset: state.reset + 1,
      filter: { ...state.filter, search: '', type: 'all', sort: '-createdAt' }
    };
  }

  if (action.type === 'CHANGE_FILTER') {
    const { name, value } = action.payload;
    if (name === 'search') {
      return { ...state, filter: { ...state.filter, [name]: value } };
    } else {
      return { ...state, curPage: 1, filter: { ...state.filter, [name]: value } };
    }
  }
};

export default reading_reducer;
