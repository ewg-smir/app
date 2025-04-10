import React, { useEffect } from "react";
import PropTypes from 'prop-types';

function Timer({ duration, isActive, taskIndex, done, updateTaskTime, toggleTaskActive }) {
  useEffect(() => {
    let timer;

    if (isActive && !done && duration > 0) {
      timer = setInterval(() => {
        updateTaskTime(taskIndex, duration - 1000);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, duration, done, taskIndex, updateTaskTime]);

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

    if (done || duration === 0) {
      timeString = '00:00';
    }

    return timeString;
  };

  return (
    <>
      <button
        aria-label="Play Timer"
        className="icon icon-play"
        type="button"
        onClick={() => toggleTaskActive(taskIndex, true)}
        disabled={done || duration <= 0}
      />
      <button
        aria-label="Pause Timer"
        className="icon icon-pause"
        type="button"
        onClick={() => toggleTaskActive(taskIndex, false)}
        disabled={!isActive || done || duration <= 0}
      />
      {getFormattedTime(duration)}
    </>
  );
}

export default Timer;

Timer.propTypes = {
  updateTaskTime: PropTypes.func.isRequired,
  toggleTaskActive: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  taskIndex: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,

};