import React from "react";
import "./Modal.css";

const Modal = (props) => {
  let gameStatus = props.gameOver ? "Game Over!" : "Success!";

  return (
    <div className="modal">
      <p className="messages">{gameStatus}</p>
      <p className="score modalScore">Score : {props.score}</p>
      <div 
        className={props.gameOver ? "button-main bothBtn closeBtn" : "button-main bothBtn ContinueBtn"}
        onClick={() => props.closeOrContinue(gameStatus)}
      >
        <div class="button-inside">
          <h1 className="modalMessages">{gameStatus === "Game Over!" ? "Close" : "Continue"}</h1>
        </div>
      </div>
      <div
        className='button-main newGameBtn'
        onClick={() => props.newGame()}
      >
        <div class="button-inside">
          <h1 class="modalMessages">New</h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;
