import React from 'react';
import styled from 'styled-components';
import { Progress, Button } from 'antd';
import { AiOutlineCheck, AiOutlineClose, AiOutlineSolution } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Result = ({
  minute,
  seconds,
  totalCorrectAnswer,
  totalInCorrectAnswer,
  totalUnAnswered,
  correctAnswer,
  userAnswer,
  resetHandler,
  exam,
  params,
  examSeconds,
  examMinutes
}) => {
  const percentage = Math.floor((totalCorrectAnswer / correctAnswer.length) * 100);
  let bandScore = String((totalCorrectAnswer / correctAnswer.length) * 9).split('.');

  if (bandScore.length === 1) {
    bandScore = bandScore.join('.');
  } else {
    +bandScore[1] <= 5 ? (bandScore[1] = '5') : (bandScore[1] = '0');
    bandScore[0] = String(+bandScore[0] + 1);
    bandScore = bandScore.join('.');
  }

  return (
    <Wrapper>
      <div>
        <h1>Kết quả thi </h1>
        <h2>
          Điểm đạt được: <span className="bolder">{percentage / 10}/10</span>
        </h2>
        <div className="result-container">
          <nav className="right">
            <div>
              <h3>
                {exam ? 60 - examMinutes - 1 : minute} : {exam ? 60 - examSeconds : seconds}
              </h3>
              <p>Thời gian làm bài</p>
            </div>
            <div className="correct">
              <h3>{totalCorrectAnswer}</h3>
              <p>Trả lời đúng</p>
            </div>
            <div className="incorrect">
              <h3>{totalInCorrectAnswer}</h3>
              <p>Trả lời sai</p>
            </div>
            {/* <div className="unanswered">
              <h3>{totalUnAnswered}</h3>
              <p>Không trả lời</p>
            </div> */}
          </nav>
        </div>

        <h4>
          <AiOutlineSolution /> Đáp án:
        </h4>
        <section className="table-result">
          {correctAnswer.map((ans, i) => (
            <div key={i}>
              <div>
                <span className="answer-number">{i + 1} </span>{' '}
                <span className="correct-answer">{ans}</span> :{' '}
                <span className="user-answer">{userAnswer[i] || 'Không trả lời'} </span>
                <span
                  className={
                    userAnswer[i]
                      ? ans.toLowerCase() ===
                      userAnswer[i].toLocaleLowerCase()
                        ? 'answer-true'
                        : 'answer-false'
                      : 'answer-false'
                  }>
                  {userAnswer[i] ? (
                    ans.toLowerCase() ===
                    userAnswer[i].toLocaleLowerCase() ? (
                      <AiOutlineCheck />
                    ) : (
                      <AiOutlineClose />
                    )
                  ) : (
                    <AiOutlineClose />
                  )}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!exam ? (
          <Button type="primary" className="button-reset" onClick={resetHandler}>
            <BiReset style={{ color: 'white' }} /> Làm lại
          </Button>
        ) : (
          <Button type="primary" className="button-reset" onClick={resetHandler}>
            <Link to="/">Trở về trang chủ</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.section`
  h2 {
    text-align: center;
    font-size: 4.5rem;
    color: #32b3c7;
  }

  .bolder {
    font-weight: bold;
  }

  .result-container {
    display: flex;
    justify-content: space-between;
    margin: 2rem 15rem;
    line-height: 20px;
  }

  .right {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .result-container p {
    font-size: 2rem;
    border-bottom: 4px dotted #dddddd;
    padding-bottom: 3px;
    color: #908080;
  }

  .result-container div {
    margin-bottom: 5rem;
    width: 200px;
  }

  h3 {
    font-size: 4rem;
    color: #32b3c7;
  }

  h4 {
    display: flex;
    align-items: center;
    font-size: 3rem;
    color: #1e90ff;
    color: #32b3c7;
    font-weight: bold;
  }

  .result-container .right h3,
  .result-container .right p {
    padding-left: 7px;
  }

  .table-result {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    font-size: 2rem;
  }

  .user-answer {
    color: #3c5b74;
  }

  .correct-answer {
    color: #32b3c7;
  }

  .answer-number {
    background-color: #32b3c7;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: -3px 0px 0px -40px;
    float: left;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    border-radius: 50%;
  }

  .answer-true {
    color: green;
  }

  .answer-false {
    color: red;
  }

  .button-reset {
    margin-top: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    color: red;
    width: 250px;
    height: 50px;
    background: #32b4c8;
    color: white;
    font-weight: bold;
    font-size: 25px;
    border: none;
  }

  .button-reset:hover {
    background-color: #6b7280;
  }
`;
