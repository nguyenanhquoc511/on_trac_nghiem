import React, { useEffect, useReducer } from 'react';
import Timer from '../components/timer/Timer';
import Spinner from '../components/spinner/Spinner';
import Result from '../components/result/Result';
import MultipleChoice from '../components/question_type/MultipleChoice';
import FillBlank from '../components/question_type/FillBlank';
import YesNoNotGiven from '../components/question_type/YesNoNotGiven';
import NotFoundPage from './NotFoundPage';
import reading_detail_reducer from '../reducer/practice_detail_reducer';
import { details_test_url } from '../utils/constants';

import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { Popconfirm } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { AiOutlineAlignCenter } from 'react-icons/ai';
import { useAuthContext } from '../context/auth_context';
import { fakePracticeData } from '../data/fakeData';

import 'react-reflex/styles.css';
import 'react-h5-audio-player/lib/styles.css';

const initialState = {
  data: {},
  isLoading: true,
  isError: false,
  correctAnswer: [],
  userAnswer: [],
  totalCorrectAnswer: 0,
  totalInCorrectAnswer: 0,
  totalUnAnswered: 0,
  showResult: false,
  userSecond: 0,
  userMinute: 0,
  questionTypes: [],
  typeTest: '',
  firstRender: true
};

const PracticeDetailPage = () => {
  const params = useParams();
  let localStage = {};
  const { token, data } = useAuthContext();

  const userId = data._id;

  if (localStorage.getItem('reset_reading_detail')) {
    localStorage.removeItem('reset_reading_detail');
    localStorage.removeItem(`reading_detail${params.id}`);
    localStorage.removeItem(`secLocal${params.id}`);
    localStorage.removeItem(`minLocal${params.id}`);
  }

  const [state, dispatch] = useReducer(reading_detail_reducer, initialState);

  if (state.firstRender) {
    localStage = state;
  }

  if (!state.firstRender) {
    localStorage.setItem(`reading_detail${params.id}`, JSON.stringify(state));
    localStage = JSON.parse(localStorage.getItem(`reading_detail${params.id}`));
  }

  const getData = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      // const response = await axios.get(`${details_test_url}${params.id}`);
      // const data = response.data;
      // console.log(data);
      const fakeData = fakePracticeData.tests.filter((item) => item._id === params.id);
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: fakeData[0] });
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const getUserInput = (e) => {
    let value = e.target.value;
    const name = +e.target.name;
    dispatch({ type: 'GET_USER_INPUT', payload: { value, name } });
  };

  const resetHandler = () => {
    localStorage.removeItem(`minLocal${params.id}`);
    localStorage.removeItem(`secLocal${params.id}`);
    localStorage.removeItem(`reading_detail${params.id}`);
    getData();
  };

  const submitHandler = () => {
    dispatch({ type: 'SHOW_RESULT' });
  };

  useEffect(() => {
    if (localStorage.getItem(`reading_detail${params.id}`) === null) {
      getData();
    } else {
      dispatch({ type: 'GET_LOCAL_STORAGE', payload: { id: params.id } });
    }
  }, []);

  if (state.isLoading === false) {
    console.log(state, 'state');
  }

  const confirm = (e) => {
    submitHandler();
  };

  return (
    <Wrapper>
      {localStage.isLoading && <Spinner />}
      {localStage.isError && <NotFoundPage />}

      {localStage.isLoading === false && localStage.showResult === false && (
        <>
          <Timer param={params.id} />

          <div className="container">
            <ReflexContainer orientation="vertical">
              {/* READING TEST */}
              {localStage.typeTest === 'reading' && (
                <ReflexSplitter
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '14px'
                  }}>
                  <AiOutlineAlignCenter style={{ transform: 'rotate(90deg)' }} />
                </ReflexSplitter>
              )}

              {/* LISTENING TEST */}
              <ReflexElement minSize="20">
                <div className="exam">
                  <div
                    className={
                      localStage.typeTest === 'listening' ? 'margin-left' : 'margin-left-read'
                    }>
                    {localStage.questionTypes.map((questionType) => {
                      return (
                        <>
                          {questionType === 'multiplechoice' && (
                            <h3 style={{ marginTop: '20px', fontSize: '20px' }}>
                              Chọn đáp án đúng <span style={{ fontWeight: 800 }}>A, B, C</span>{' '}
                              hoặc <span style={{ fontWeight: 800 }}>D.</span>
                            </h3>
                          )}

                          {questionType === 'fillblank' && (
                            <h3 style={{ marginTop: '10px', lineHeight: '1.2', fontSize: '20px' }}>
                              Write{' '}
                              <span style={{ color: '#FF5100' }}>
                                NO MORE THAN THREE WORDS AND/OR A NUMBER{' '}
                              </span>
                              for each answer
                            </h3>
                          )}

                          {questionType === 'tfn' && (
                            <>
                              <h3
                                style={{
                                  marginTop: '10px',
                                  marginLeft: '15px',
                                  lineHeight: '1.2',
                                  fontSize: '20px'
                                }}>
                                Write the correct answer{' '}
                                <span style={{ color: '#FF5100' }}>YES,NO or NOT GIVEN</span> on
                                your answer sheet.
                              </h3>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  width: '100%',
                                  fontSize: '18px'
                                }}>
                                <table>
                                  <tbody>
                                    <tr className="odd">
                                      <td>YES</td>
                                      <td>if the statement agrees with the views of the writer</td>
                                    </tr>
                                    <tr className="even">
                                      <td>NO</td>
                                      <td>if the statement contradicts the views of the writer</td>
                                    </tr>
                                    <tr className="odd">
                                      <td>NOT GIVEN</td>
                                      <td>
                                        if it is impossible to say what the writer thinks about this
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </>
                          )}

                          {questionType === 'multiplechoice' &&
                            localStage.data.questions.map((val, index) => {
                              if (val.type === 'multiplechoice') {
                                return (
                                  <MultipleChoice
                                    id={val._id}
                                    index={index}
                                    val0={val.content[0]}
                                    userAnswer={localStage.userAnswer[index]}
                                    getUserInput={getUserInput}
                                    answers={val.answer}
                                  />
                                );
                              }
                            })}

                          {questionType === 'tfn' &&
                            localStage.data.questions.map((val, index) => {
                              if (val.type === 'tfn') {
                                return (
                                  <YesNoNotGiven
                                    id={val._id}
                                    index={index}
                                    val0={val.content[0]}
                                    userAnswer={localStage.userAnswer[index]}
                                    getUserInput={getUserInput}
                                    answers={val.answer}
                                  />
                                );
                              }
                            })}

                          <div
                            style={{
                              width: '90%',
                              marginBottom: '20px'
                            }}>
                            {questionType === 'fillblank' &&
                              localStage.data.questions.map((val, index) => {
                                if (val.type === 'fillblank') {
                                  return (
                                    <FillBlank
                                      id={val._id}
                                      index={index}
                                      val0={val.content[0]}
                                      val1={val.content[1]}
                                      userAnswer={localStage.userAnswer[index]}
                                      getUserInput={getUserInput}
                                    />
                                  );
                                }
                              })}
                          </div>
                        </>
                      );
                    })}
                  </div>

                  {/* <YesNoNotGiven /> */}

                  {/* POP UP CONFIRM */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '45px' }}>
                    <Popconfirm
                      title="Bạn chắc chắn muốn nộp bài?"
                      onConfirm={confirm}
                      okText="Có"
                      cancelText="Không">
                      <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#51a8ff', marginBottom: '10px' }}
                        className={
                          localStage.typeTest === 'listening' ? 'margin-left' : 'margin-left-read'
                        }>
                        Nộp bài
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </ReflexElement>
            </ReflexContainer>
          </div>
        </>
      )}
      {localStage.isLoading === false && localStage.showResult === true && (
        <Result
          minute={+localStorage.getItem(`minLocal${params.id}`)}
          seconds={+localStorage.getItem(`secLocal${params.id}`)}
          totalCorrectAnswer={localStage.totalCorrectAnswer}
          totalInCorrectAnswer={localStage.totalInCorrectAnswer}
          totalUnAnswered={localStage.totalUnAnswered}
          correctAnswer={localStage.correctAnswer}
          userAnswer={localStage.userAnswer}
          resetHandler={resetHandler}
        />
      )}
    </Wrapper>
  );
};

export default PracticeDetailPage;

const Wrapper = styled.section`
  .container {
    width: 100%;
    height: 78vh;
    display: grid;
  }
  .article {
    height: 78vh;
    padding: 0 35px;
    overflow-y: scroll;
  }
  .exam {
    height: 78vh;
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
    color: #284664;
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

  .margin-left {
    margin-left: 100px;
  }

  .margin-left-read {
    margin-left: 20px;
  }
  /* ------------------------------- */
  .timer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: #51a8ff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
  }

  .timer h2 {
    color: white;
    font-size: 2.9rem;
    line-height: 0.9;
    font-weight: bold;
    padding-top: 2rem;
  }

  .clock {
    width: 5rem;
    height: 5rem;
    color: white;
  }

  .clock-container {
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }

  .reflex-container.vertical > .reflex-splitter {
    border-right: 1px solid #c6c6c6;
    border-left: 1px solid #c6c6c6;
    cursor: col-resize;
    height: 100%;
    width: 2px;
  }

  .question-ynn {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }

  .iot-question {
    border-radius: 2px;
    border: 1px solid #aaa;
    margin: 0px 5px;
    outline: none;
    max-width: 130px;
    height: 30px;
  }

  table {
    margin-left: 10px;
    margin-bottom: 14px;
  }

  td {
    font-weight: bold;
  }

  .odd {
    background-color: #38bdf8;
  }

  tbody tr td {
    padding: 5px 2px 5px 20px !important;
  }

  table {
    border: 1px solid #0e7490;
  }
`;
