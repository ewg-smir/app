import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function Timer({ duratuion, isActive, onChangeTasks, taskIndex, done }) {
  const [time, setTime] = useState(duratuion);

  useEffect(() => {
    let timer;

    if (isActive && time !== 0) {
      timer = setTimeout(() => setTime((prevTime) => prevTime - 1000), 1000);
    }


    if (!isActive || time === 0) {
      onChangeTasks((prev) =>
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
  }, [time, isActive, onChangeTasks, taskIndex]);

  const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);

    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (done || time === 0) {
      seconds = '00';
      minutes = '00';
    }
    return `${minutes}: ${seconds}`;
  };

  const handleChangeActive = (status) => {
    onChangeTasks((prev) =>
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
  onChangeTasks: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  taskIndex: PropTypes.number.isRequired,
  duratuion: PropTypes.number.isRequired,
};