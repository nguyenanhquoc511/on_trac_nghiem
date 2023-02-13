import React, { useState } from 'react';
import { Radio, Space } from 'antd';
import { GiStabbedNote } from 'react-icons/gi';
import { Input } from 'antd';

const { TextArea } = Input;

const MultipleChoice = ({ id, index, val0, userAnswer, getUserInput, answers, disable }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      <div className="question-container" key={id}>
        <h2 style={{ color: '#51a8ff' }}>
          Câu {+index + 1}:{' '}
          {!disable && (
            <button
              style={{ padding: '5px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => setShowInput(!showInput)}>
              <GiStabbedNote />
              Mở ghi chú
            </button>
          )}
        </h2>
        {showInput && (
          <TextArea
            rows={2}
            placeholder="Nháp tại đây..."
            style={{ width: '100%', background: '#D4DAE0', marginBottom: '4px' }}
          />
        )}
        <h2 style={{ fontSize: '1.8rem' }}>{val0}</h2>
        <Radio.Group
          name={index}
          value={userAnswer ? userAnswer : ''}
          onChange={getUserInput ? getUserInput : ''}>
          <Space direction="vertical">
            {answers.map((ans, index) => {
              return (
                <Radio
                  className="radio-btn"
                  value={ans}
                  key={index}
                  disabled={disable ? true : false}>
                  {ans}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};

export default MultipleChoice;
