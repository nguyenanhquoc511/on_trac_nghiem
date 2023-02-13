import React, { useState, useEffect } from 'react';
import { getPadTime } from '../../utils/helpers';

const CountDownTimer = ({ submitWhenTimeout, param }) => {
  const time = param === 'listening' ? 60 * 40 : 60 * 60;
  const [timeLeft, setTimeLeft] = useState(
    +localStorage.getItem(`examLocal${param}`) === 0
      ? time
      : +localStorage.getItem(`examLocal${param}`)
  );

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  submitWhenTimeout(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  localStorage.setItem(`examLocal${param}`, String(timeLeft));

  return (
    <div className="timer">
      <div className="clock-container">
        <h2>{minutes}</h2>
        <h2>:</h2>
        <h2>{seconds}</h2>
      </div>
    </div>
  );
};

export default CountDownTimer;
