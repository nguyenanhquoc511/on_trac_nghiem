import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <img
        src="https://www.designrush.com/uploads/users/customer-11/image_1530905677_TfTLA1D0ueXh4hOj8hb4zpbDxjpm8jnMoINOk5uu.jpeg"
        alt=""
      />
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.section`
  img {
    width: 100%;
    border-radius: 4px;
  }
`;
