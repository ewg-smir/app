import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function Timer({ duration, isActive, setTasks, taskIndex, done }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    let timer;

    if (isActive && time !== 0) {
      timer = setTimeout(() => setTime((prevTime) => prevTime - 1000), 1000);
    }

    if (!isActive || time === 0) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskIndex
            ? {
              ...task,
              sec: parseInt(time / 1000, 10),
              min: parseInt(time / 60000, 10),
            }
            : task
        )
      );
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [time, isActive, setTasks, taskIndex]);

  const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    let hours = totalHours % 24;
    if (seconds < 10) seconds = `0${seconds}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;


    let timeString = `${minutes}:${seconds}`;

    if (totalDays > 0) {
      timeString = `${totalDays}d ${hours}:${timeString}`;
    } else if (totalHours > 0) {
      timeString = `${hours}:${timeString}`;
    }

    if (done || time === 0) {
      timeString = '00:00';
    }

    return timeString;
  };

  const handleChangeActive = (status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskIndex ? { ...task, isActive: status } : task
      )
    );
  };

  return (
    <>
      <button
        aria-label="Play Timer"
        className="icon icon-play"
        type="button"
        onClick={() => handleChangeActive(true)}
      />
      <button
        aria-label="Pause Timer"
        className="icon icon-pause"
        type="button"
        onClick={() => handleChangeActive(false)}
      />
      {getFormattedTime(time)}
    </>
  );
}

export default Timer;

Timer.propTypes = {
  setTasks: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  taskIndex: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};