import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


export const Timer = ({ duratuion, isActive, onChangeTasks, taskIndex, done }) => {

  const [time, setTime] = useState(duratuion)

  useEffect(() => {
    if (isActive && time !== 0) {
      setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
    }

    onChangeTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskIndex) {
          return { ...task, sec: parseInt(Math.floor(time / 1000)), min: parseInt(Math.floor(time / 600000)) };
        }
        
        else {
          return task;
        }
      })
    })
  }, [time, isActive, onChangeTasks, taskIndex]);

  const getFormattedTime = (milliseconds) => {
    let total_seconds = parseInt(Math.floor(milliseconds / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if(done){
      seconds = '00';
      minutes = '00';
    }
    if(time == 0){
      seconds = '00';
      minutes = '00';
    }
    return `${minutes}: ${seconds}`;
  }

  const handleChangeActive = (status) => {
    onChangeTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskIndex) {
          return { ...task, isActive: status };
        }
        else {
          return task;
        }
      })
    })
  }

  return (
    <>
      <button className="icon icon-play" type="submit" onClick={() => handleChangeActive(true)} ></button>
      <button className="icon icon-pause" type="submit" onClick={() => handleChangeActive(false)}></button>
      {getFormattedTime(time)}
    </>
  )
}


Timer.propTypes = {
  onChangeTasks: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  taskIndex: PropTypes.number.isRequired,
  duratuion: PropTypes.number.isRequired,
};