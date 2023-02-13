const reading_detail_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    let questionArr_1 = [];
    let questionArr_2 = [];
    let questionArr_3 = [];

    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        questionArr_1 = action.payload.exams[i].questions.map((question) => question.type);
      }
      if (i === 1) {
        questionArr_2 = action.payload.exams[i].questions.map((question) => question.type);
      }
      if (i === 2) {
        questionArr_3 = action.payload.exams[i].questions.map((question) => question.type);
      }
    }

    const questionArrUnique_1 = [...new Set(questionArr_1)];
    const questionArrUnique_2 = [...new Set(questionArr_2)];
    const questionArrUnique_3 = [...new Set(questionArr_3)];

    // const questionArr = action.payload.questions.map((question) => question.type);
    const correctAnswer = [];

    for (let i = 0; i < 3; i++) {
      correctAnswer.push(action.payload.exams[i].questions.map((value) => value.trueAnswer));
    }

    return {
      ...state,
      isLoading: false,
      data: action.payload,
      userAnswer: [],
      correctAnswer: correctAnswer.flat(),
      totalAnswer: correctAnswer.flat().length,
      totalUnAnswered: correctAnswer.flat().length,
      showResult: false,
      questionTypes: [questionArrUnique_1, questionArrUnique_2, questionArrUnique_3],
      typeTest: action.payload.exams[0].category.name.toLowerCase(),
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
          [...new Set(tempState.userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase()
        ) {
          tempState.totalCorrectAnswer += 1;
        }
        if (
          tempState.correctAnswer[i].toLowerCase() !==
            [...new Set(tempState.userAnswer[i].trim().split(' '))].join(' ').toLocaleLowerCase() &&
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
