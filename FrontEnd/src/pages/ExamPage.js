import React from 'react';
import styled from 'styled-components';
import { Card, Modal, Space } from 'antd';
import { useAuthContext } from '../context/auth_context';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import image from '../assets/exam.jpg';

const { Meta } = Card;
const { confirm } = Modal;

const ExamPage = () => {
  const { role } = useAuthContext();
  const history = useHistory();

  if (!role) {
    history.push('/');
  }

  const showReadingConfirm = () => {
    confirm({
      title: 'Do you want to take THE READING test?',
      icon: <ExclamationCircleOutlined />,
      content: '',

      onOk() {
        history.push('/exam/reading');
      },

      onCancel() {}
    });
  };

  const showReadingConfirmWithAlreadyTest = () => {
    confirm({
      title: 'Bạn còn Test đang làm dở, có muốn tiếp tục làm Test đó không?',
      icon: <ExclamationCircleOutlined />,
      content: '',

      onOk() {
        history.push('/exam/reading');
      },

      onCancel() {
        localStorage.setItem('reset_exam_detail', '1');
        history.push('/exam/reading');
      }
    });
  };

  return (
    <Wrapper>
      <Card
        onClick={
          localStorage.getItem('reading_detailreading')
            ? showReadingConfirmWithAlreadyTest
            : showReadingConfirm
        }
        style={{
          width: 400
        }}
        cover={
          <img
            alt="example"
            src={image}
          />
        }>
        <Meta title="VÀO THI THỬ" description="Bạn đã sẵn sàng?" />
      </Card>
    </Wrapper>
  );
};

export default ExamPage;

const Wrapper = styled.section`
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 150px;

  .ant-card {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 480px;
    padding: 7px;
  }

  .ant-card:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height: 480px;
    cursor: pointer;
  }

  .ant-card-meta-title {
    font-size: 30px;
    color: #000000;
  }

  .ant-card-meta-description {
    font-size: 20px;
  }

  .ant-card-cover img {
    width: 380px;
    height: 327px;
  }
`;
