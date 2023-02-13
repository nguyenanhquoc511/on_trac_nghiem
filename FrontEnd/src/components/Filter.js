import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Filter = ({ filter, changeFilter, searchTestHandler, clearFilterHandler, type }) => {
  let a = ['Tất cả', 'Word', 'Excel', 'Power Point'];
  // if (type === 'reading') {
  //   a = ['All', 'Multiple Choice', 'Fill Blank', 'TFN'];
  // } else {
  //   a = ['All', 'Multiple Choice', 'Fill Blank'];
  // }

  return (
    <Wrapper className="course form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchTestHandler();
        }}>
        <div>
          {/* Start category */}
          <h3>Dạng kỹ năng:</h3>
          <div className="question-type">
            <div className="btns">
              {a.map((val, index) => (
                <button
                  key={index}
                  style={{ color: '#284664', borderColor: '#284664' }}
                  className={
                    val
                      .split(' ')
                      .map((val) => val.toLowerCase())
                      .join('') === filter.type
                      ? 'highlight'
                      : ''
                  }
                  name="type"
                  onClick={changeFilter}>
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* End category */}

        {/* Start Sort */}
        <div>
          <h3>Sắp xếp:</h3>
          <select className="select" name="sort" value={filter.sort} onChange={changeFilter}>
            <option value="-createdAt">Mới nhất</option>
            <option value="createdAt">Cũ nhất</option>
            <option value="title">Tên A-Z</option>
            <option value="-title">Tên Z-A</option>
          </select>

          {/* <h3>Test type:</h3>
          <select
            className="select"
            name="testType"
            value={filter.testType}
            onChange={changeFilter}>
            <option value="reading">Reading</option>
            <option value="listening">Listening</option>
          </select> */}
        </div>

        <Button type="primary" size="large" className="filter-btn" onClick={clearFilterHandler}>
          Xoá bộ lọc
        </Button>
        {/* End Sort */}
      </form>
    </Wrapper>
  );
};

export default Filter;

const Wrapper = styled.div`
  h3 {
    margin: 14px 0 10px;
    color: #fff;
    color: #284664;
    font-size: 24px;
    line-height: 28px;
  }

  .input-container {
    display: flex;
    margin-bottom: 2rem;
  }

  input {
    display: inline-block;
    font-size: 20px;
    box-sizing: border-box;
    transition: 0.5s;
  }

  input[type='text'] {
    background-color: #fff;
    width: 300px;
    height: 40px;
    border: none;
    outline: none;
    padding: 0 25px;
    border-radius: 25px 0 0 25px;
    border: 2px solid #284664;
  }

  input[type='submit'] {
    border-radius: 0 25px 25px 0;
    width: 100px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #6e0b21;
    background-color: #284664;
    color: #fff;
    transition: 0.2s;
  }

  input[type='submit']:active {
    background-color: #8b008b;
    scale: 0.7;
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  }

  .btns {
    display: flex;
    gap: 3.8rem;
  }

  .btns button {
    font-size: 1.8rem;
    color: #fcf3cf;
    background-color: transparent;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #fcf3cf;
  }

  form {
    display: flex;
    column-gap: 5rem;
  }

  .select {
    font-size: 1.7rem;
    width: 18rem;
    height: 4rem;
    border-radius: 4px;
    padding: 0 1.5rem;
    border: 2px solid #284664;
  }

  .highlight {
    border-bottom: 2px solid #fcf3cf;
  }

  .filter-btn {
    background: #ffffff;
    color: #51a8ff;
    border: 1px solid #51a8ff;
    margin-top: 5rem;
    transition: 0.2s;
  }

  .filter-btn:hover {
    background: #51a8ff;
    color: #ffffff;
  }

  .filter-btn:active {
    scale: 0.7;
  }

  @media (max-width: 1380px) {
    form {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 826px) {
    form {
      display: flex;
      flex-direction: column;
      row-gap: 3rem;
    }

    .filter-btn {
      margin-left: 4rem;
    }
  }
`;
