import React from 'react';
import image from '../assets/home-img.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import Spinner from '../components/spinner/Spinner';

const HomePage = () => {
  return (
    <Wrapper className="home">
      <div className="content">
        <h3>Tin học văn phòng quốc tế ICDL</h3>
        <p>
          Trên 150 quốc gia, hơn 14 triệu ứng viên với 54 triệu bài
          kiểm tra trực tuyến, sử dụng 41 ngôn ngữ khác nhau và có hơn 24,000 trung tâm khảo thí
          trên toàn cầu.
        </p>
        <div className="btn-container">
          <Link to="/practice" className="btn">
            Luyện tập ngay?
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={image} alt="" />
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.section`
  height: 85vh;
  .btn-container {
    display: flex;
    gap: 2rem;
  }

  .image {
    width: 500px;
  }
`;
