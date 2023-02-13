import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';
import styled from 'styled-components';
import UpdatePassword from '../components/profile/UpdatePassword';
import Progress from '../components/profile/Progress';
import Statistics from '../components/profile/Statistics';

const ProfilePage = () => {
  const history = useHistory();
  const { role } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState('Your Progress');

  console.log(selectedOption);

  if (role !== 'user') {
    history.push('/');
  }

  return (
    <Wrapper>
      <div className="menu-profile">
        {['Your Progress', 'Test Statistics', 'Update Password'].map((value) => (
          <button
            name={value}
            className={selectedOption === value ? 'menu-profile-hightlight' : ''}
            onClick={(e) => setSelectedOption(e.target.textContent)}>
            {value}
          </button>
        ))}
      </div>
      <div className="content-profile">
        {selectedOption === 'Your Progress' && <Progress />}
        {selectedOption === 'Test Statistics' && <Statistics />}
        {selectedOption === 'Update Password' && <UpdatePassword />}
      </div>
    </Wrapper>
  );
};

export default ProfilePage;

const Wrapper = styled.section`
  height: 84vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 40px;
  .menu-profile {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .menu-profile button {
    width: 190px;
    height: 80px;
    background-color: #2cbc63;
    font-weight: bold;
    border-radius: 7px;
    font-size: 20px;
  }

  .menu-profile-hightlight {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }

  .ant-input-affix-wrapper {
    width: 50%;
  }

  .update-password-container div {
    margin-bottom: 30px;
  }

  .update-password-container h2 {
    color: #284664;
  }

  .update-password-container .ant-btn {
    margin-left: 37%;
    width: 140px;
    background: #284664;
  }

  .progress-chart {
    text-align: center;
    font-weight: bold;
  }
`;
