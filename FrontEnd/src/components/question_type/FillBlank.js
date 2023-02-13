import React, { useState } from 'react';
import styled from 'styled-components';
import { GiStabbedNote } from 'react-icons/gi';
import { Input } from 'antd';

const { TextArea } = Input;

const FillBlank = ({ id, index, val0, val1, userAnswer, getUserInput, disable }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <Wrapper>
      <div className="question-container" key={id} style={{ marginBottom: '50px' }}>
        <h3 style={{ color: '#32B4C8', fontSize: '25px' }}>
          Question {index + 1}:{' '}
          {!disable && (
            <button
              style={{ padding: '5px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => setShowInput(!showInput)}>
              <GiStabbedNote />
              Show Notepad
            </button>
          )}{' '}
        </h3>
        {showInput && (
          <TextArea
            rows={2}
            placeholder="Your draft goes here..."
            style={{ width: '100%', background: '#D4DAE0', marginBottom: '4px' }}
          />
        )}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal' }}>
          <span>{val0} </span>
          <span>
            <span className="number">{index + 1}</span>
            <input
              type="text"
              name={index}
              value={userAnswer}
              onChange={getUserInput}
              disabled={disable ? true : false}
            />
          </span>
          <span> {val1}</span>
        </h2>
      </div>
    </Wrapper>
  );
};

export default FillBlank;

const Wrapper = styled.div`
  input {
    padding: 0px 5px;
    border-radius: 2px;
    border: none;
    border-bottom: 2px solid #32b4c8;
    margin: 0px 5px;
    outline: none;
    max-width: 130px;
    background-color: inherit;
  }

  .number {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #32b4c8;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
`;
