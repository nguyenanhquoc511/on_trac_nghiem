// const reading_detail_reducer = (state, action) => {
//   if (action.type === 'GET_PRODUCTS_BEGIN') {
//     return { ...state, isLoading: true };
//   }

//   if (action.type === 'GET_PRODUCTS_SUCCESS') {
//     const questionArr = action.payload.questions.map((question) => question.type);
//     const questionArrUnique = [...new Set(questionArr)];

//     return {
//       ...state,
//       isLoading: false,
//       data: action.payload,
//       userAnswer: [],
//       correctAnswer: action.payload.questions.map((a) => a.trueAnswer),
//       totalAnswer: action.payload.questions.length,
//       totalUnAnswered: action.payload.questions.length,
//       showResult: false,
//       questionTypes: questionArrUnique,
//       typeTest: action.payload.category.name.toLowerCase()
//     };
//   }

//   if (action.type === 'GET_PRODUCTS_ERROR') {
//     return { ...state, isLoading: false, isError: true };
//   }

//   if (action.type === 'GET_USER_INPUT') {
//     const { name, value } = action.payload;
//     const tempState = { ...state };
//     tempState.userAnswer[name] = value;
//     tempState.totalCorrectAnswer = 0;
//     tempState.totalInCorrectAnswer = 0;
//     tempState.totalUnAnswered = tempState.totalAnswer;

//     for (let i = 0; i < tempState.totalAnswer; i++) {
//       if (tempState.userAnswer[i]) {
//         if (
//           tempState.correctAnswer[i].toLowerCase() ===
//           [...new Set(tempState.userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase()
//         ) {
//           tempState.totalCorrectAnswer += 1;
//         }
//         if (
//           tempState.correctAnswer[i].toLowerCase() !==
//             [...new Set(tempState.userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase() &&
//           tempState.userAnswer[i] !== undefined
//         ) {
//           tempState.totalInCorrectAnswer++;
//         }
//       }
//     }

//     tempState.totalUnAnswered -= tempState.totalCorrectAnswer + tempState.totalInCorrectAnswer;

//     return tempState;
//   }

//   if (action.type === 'SHOW_RESULT') {
//     return { ...state, showResult: true };
//   }

//   if (action.type === 'GET_LOCAL_STORAGE') {
//     let tempState = { ...state };
//     tempState = JSON.parse(localStorage.getItem('reading_detail'));

//     return tempState;
//   }
// };

// export default reading_detail_reducer;

const reading_detail_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    const questionArr = action.payload.questions.map((question) => question.type);
    const questionArrUnique = [...new Set(questionArr)];

    return {
      ...state,
      isLoading: false,
      data: action.payload,
      userAnswer: [],
      correctAnswer: action.payload.questions.map((a) => a.trueAnswer),
      totalAnswer: action.payload.questions.length,
      totalUnAnswered: action.payload.questions.length,
      showResult: false,
      questionTypes: questionArrUnique,
      typeTest: action.payload.category.name.toLowerCase(),
      firstRender: false
    };
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === 'GET_USER_INPUT') {
    const { name, value } = action.payload;
    const tempState = { ...state };
    tempState.userAnswer[name] = value;
    tempState.totalCorrectAnswer = 0;
    tempState.totalInCorrectAnswer = 0;
    tempState.totalUnAnswered = tempState.totalAnswer;

    for (let i = 0; i < tempState.totalAnswer; i++) {
      if (tempState.userAnswer[i]) {
        if (
          tempState.correctAnswer[i].toLowerCase() ===
          tempState.userAnswer[i].toLocaleLowerCase()
        ) {
          tempState.totalCorrectAnswer += 1;
        }
        if (
          tempState.correctAnswer[i].toLowerCase() !==
            tempState.userAnswer[i].toLocaleLowerCase() &&
          tempState.userAnswer[i] !== undefined
        ) {
          tempState.totalInCorrectAnswer++;
        }
      }
    }

    tempState.totalUnAnswered -= tempState.totalCorrectAnswer + tempState.totalInCorrectAnswer;

    return tempState;
  }

  if (action.type === 'SHOW_RESULT') {
    return { ...state, showResult: true };
  }

  if (action.type === 'GET_LOCAL_STORAGE') {
    let tempState = { ...state };
    tempState = JSON.parse(localStorage.getItem(`reading_detail${action.payload.id}`));

    return tempState;
  }
};

export default reading_detail_reducer;
