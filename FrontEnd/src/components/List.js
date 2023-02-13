import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = ({ data }) => {
  return (
    <Wrapper className="course">
      {data.map((d) => {
        const day = new Date(d.createdAt).getDate();
        const month = new Date(d.createdAt).getMonth() + 1;
        const year = new Date(d.createdAt).getFullYear();
        return (
          <div className="box" key={d._id}>
            <img src={d.image.name} alt="" />
            <h3 style={{ height: '52px', fontSize: '25px', marginTop: '5px', color: '#51a8ff' }}>{d.title}</h3>
            <p>{d.description.slice(0, 135)}...</p>
            <Link
              className="btn btn-margin btn-main"
              to={`/practice/${d._id}`}
              onClick={() => localStorage.setItem('reset_reading_detail', '1')}>
              Bắt đầu
            </Link>
            <Link className="btn" to={`/solution/${d._id}`}>
              Lời giải
            </Link>
            <div className="icons">
              <p>
                <i className="far fa-clock"></i>
                Ngày đăng: {day < 10 ? '0' + day : day} / {month < 10 ? '0' + month : month} /{' '}
                {year}
              </p>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.section`
  .btn-margin {
    margin-right: 1rem;
  }
`;
