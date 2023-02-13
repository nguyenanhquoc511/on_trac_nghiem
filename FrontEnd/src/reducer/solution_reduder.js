export const solution_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    const questionArr = action.payload.questions.map((question) => question.type);
    const questionArrUnique = [...new Set(questionArr)];

    return {
      ...state,
      title: action.payload.title,
      content: action.payload.content,
      questions: action.payload.questions,
      image: action.payload.image.name,
      trueAnswers: action.payload.questions.map((question) => question.trueAnswer),
      description: action.payload.questions.map((question, index) => question.description),
      explaination: action.payload.questions.map((question) => question.explaination),
      isLoading: false,
      isError: false,
      questionTypes: questionArrUnique
    };
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
  }
};
