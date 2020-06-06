import React, { useState } from 'react';
import './StartBtn.css';

const StartBtn = ({ onClickEvent }) => {
  const [toggleClass, setToggleClass] = useState(false);
  const [startTxt, setStartTxt] = useState('Game Start');

  const toggleClassEvent = () => {
    toggleClass ? setToggleClass(false) : setToggleClass(true);
    startTxt === 'Game Start' ? setStartTxt('Game Stop') : setStartTxt('Game Start');
  }
  return (
    <div className={ toggleClass ? 'container active' : 'container'} onClick={() => {
      onClickEvent();
      toggleClassEvent();
    }}>
      <div className="btn">
        <span className="startTxt">{startTxt}</span>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default StartBtn;