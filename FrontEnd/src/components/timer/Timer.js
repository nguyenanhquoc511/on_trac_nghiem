import React, { useEffect, useState } from 'react';
import { GiClockwork } from 'react-icons/gi';

const Timer = ({ param }) => {
  const [seconds, setSeconds] = useState(+localStorage.getItem(`secLocal${param}`)) || useState(0);
  const [minutes, setMinutes] = useState(+localStorage.getItem(`minLocal${param}`)) || useState(0);

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  localStorage.setItem(`minLocal${param}`, String(minutes));
  localStorage.setItem(`secLocal${param}`, String(seconds));

  return (
    <div className="timer">
      <div className="clock-container">
        <GiClockwork className="clock" />
        <h2>
          {+localStorage.getItem(`minLocal${param}`) < 10
            ? '0' + +localStorage.getItem(`minLocal${param}`)
            : +localStorage.getItem(`minLocal${param}`)}{' '}
          :{' '}
          {+localStorage.getItem(`secLocal${param}`) < 10
            ? '0' + +localStorage.getItem(`secLocal${param}`)
            : +localStorage.getItem(`secLocal${param}`)}
        </h2>
      </div>
    </div>
  );
};

export default Timer;
