import React from 'react';
import './Modal.css';

const Modal = (props) => {
  let a = document.querySelector('.container')
  a.classList.add('active')
  let modalClick = (e) => {
    let parent = e.target.parentNode;
    parent.classList === 'modal' ? parent.classList.add('active') : parent.classList.remove('active');
    console.log(document.querySelector('.container'))
    props.closeHandler();
  }

  return (
    <div className={props.gameOver || props.gameSuccess ? 'modal active' : 'modal'}>
      <p>{props.gameOver ? 'Game Over!' : 'Success!'}</p> 
      <button 
        className={props.gameOver ? 'closeBtn' : 'ContinueBtn'}
        onClick={(e) => modalClick(e)}
      >
        {props.gameOver ? 'close' : 'Continue'}
      </button>
      <button className="newGameBtn" onClick={() => props.newGame()}>New Game</button>
    </div>
  );
};

export default Modal;