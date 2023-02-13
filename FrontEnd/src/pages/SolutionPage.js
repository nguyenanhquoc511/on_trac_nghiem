import React, { useEffect, useReducer, useState } from 'react';
import Spinner from '../components/spinner/Spinner';
import MultipleChoice from '../components/question_type/MultipleChoice';
import FillBlank from '../components/question_type/FillBlank';
import NotFoundPage from './NotFoundPage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { AiOutlineAlignCenter } from 'react-icons/ai';
import { AiOutlineSolution } from 'react-icons/ai';
import Highlighter from 'react-highlight-words';
import 'react-reflex/styles.css';

import { solution_reducer } from '../reducer/solution_reduder';
import { details_test_url } from '../utils/constants';
import { Pagination } from 'antd';
import { Input } from 'antd';
import { fakePracticeData } from '../data/fakeData';

const { TextArea } = Input;

const initialState = {
  isLoading: true,
  isError: false,
  image: '',
  title: '',
  content: [],
  description: [],
  explaination: [],
  questions: [],
  questionTypes: [],
  trueAnswers: []
};

const SolutionPage = () => {
  const [state, dispatch] = useReducer(solution_reducer, initialState);
  const [showInput, setShowInput] = useState(false);
  const [page, setPage] = useState(1);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (url) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      // const response = await axios.get(`${details_test_url}${params.id}`);
      // const data = response.data;
      // console.log(data.testDetail);
      const fakeData = fakePracticeData.tests.filter((item) => item._id === params.id);
      setTimeout(() => {
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: fakeData[0] });
      }, 500);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const Highlight = ({ children }) => (
    <span className="highlight">
      <strong>{state.description.findIndex((e) => e === children) + 1}.</strong>
      {children}
    </span>
  );

  return (
    <Wrapper>
      {state.isLoading && <Spinner />}
      {state.isError && <NotFoundPage />}

      {!state.isLoading && (
        <>
          <div
            style={{
              display: 'flex',
              height: '50px',
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '26px',
              justifyContent: 'center',
              background: '#51a8ff',
              padding: '30px 0',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px'
            }}>
            <AiOutlineSolution /> Lời giải
          </div>

          <div className="container">
            <ReflexContainer orientation="vertical">
              <ReflexElement minSize="20">
                <div className="exam">
                  <div className="margin-left-read">
                    {state.questionTypes.map((questionType, index) => {
                      return (
                        <>
                          {questionType === 'multiplechoice' && (
                            <h3
                              style={{ marginTop: '20px', fontSize: '22px', fontWeight: 'bold' }}
                              key={index}>
                              Chọn đáp án đúng <span>A, B, C</span> hoặc <span>D.</span>
                            </h3>
                          )}

                          {questionType === 'fillblank' && (
                            <h3
                              style={{ marginTop: '10px', fontSize: '22px', fontWeight: 'bold' }}
                              key={index}>
                              Write{' '}
                              <span style={{ color: '#FF5100' }}>
                                NO MORE THAN THREE WORDS AND/OR A NUMBER{' '}
                              </span>
                              for each answer
                            </h3>
                          )}

                          {questionType === 'multiplechoice' &&
                            state.questions.map((val, index) => {
                              if (val.type === 'multiplechoice') {
                                return (
                                  <>
                                    <MultipleChoice
                                      key={index}
                                      id={val._id}
                                      index={index}
                                      val0={val.content[0]}
                                      answers={val.answer}
                                      disable="true"
                                    />
                                    <p className="answer-key">
                                      Đáp án đúng: <span>{state.trueAnswers[index]}</span>
                                    </p>
                                    <TextArea
                                      rows={3}
                                      style={{
                                        width: '100%',
                                        background: '#D4DAE0',
                                        marginBottom: '4px',
                                        fontSize: '15px'
                                      }}
                                      value={state.description[index]}
                                    />
                                  </>
                                );
                              }
                            })}

                          <div
                            style={{
                              width: '90%',
                              marginBottom: '20px'
                            }}>
                            {questionType === 'fillblank' &&
                              state.questions.map((val, index) => {
                                if (val.type === 'fillblank') {
                                  return (
                                    <>
                                      <FillBlank
                                        key={index}
                                        id={val._id}
                                        index={index}
                                        val0={val.content[0]}
                                        val1={val.content[1]}
                                        disable="true"
                                      />
                                      <p className="answer-key">
                                        Answer: <span>{state.trueAnswers[index]}</span>
                                      </p>
                                      <TextArea
                                        rows={3}
                                        style={{
                                          width: '100%',
                                          background: '#D4DAE0',
                                          marginBottom: '4px',
                                          fontSize: '15px',
                                          height: '180px'
                                        }}
                                        value={state.explaination[index]}
                                      />
                                    </>
                                  );
                                }
                              })}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </ReflexElement>
            </ReflexContainer>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SolutionPage;

const Wrapper = styled.section`
  margin-top: 28px;
  .container {
    width: 100%;
    height: 77vh;
    display: grid;
  }
  .article {
    height: 77vh;
    padding: 0 35px;
    overflow-y: scroll;
  }
  .exam {
    height: 77vh;
    overflow-y: scroll;
    background-color: #e5e7eb;
    border-bottom-left-radius: 5px;
    padding: 0 20px;
  }

  .exam h2 {
    line-height: 1.8rem;
    font-weight: bold;
  }

  .question {
    margin: 10px 0;
  }

  h1 {
    font-size: 45px;
    text-align: center;
    color: #51a8ff;
    margin-top: 5px;
  }

  img {
    height: 15rem;
    width: 100%;
    object-fit: contain;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 1.8rem;
  }

  .radio-btn {
    font-size: 1.8rem;
  }

  .question-container {
    margin: 3rem 0;
    padding-left: 20px;
  }

  .margin-left-read {
    margin-left: 20px;
  }

  .reflex-container.vertical > .reflex-splitter {
    border-right: 1px solid #c6c6c6;
    border-left: 1px solid #c6c6c6;
    cursor: col-resize;
    height: 100%;
    width: 2px;
  }

  .highlight {
    background-color: #c6c6c6;
  }

  .answer-key {
    font-weight: bold;
    margin-top: -14px;
    font-size: 20px;
  }

  .answer-key span {
    color: #2eb872;
  }

  .ant-pagination {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
`;
