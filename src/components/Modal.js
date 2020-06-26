import React from "react";
import "./Modal.css";

const Modal = (props) => {
  let gameStatus = props.gameOver ? "Game Over!" : "Success!";

  return (
    <div>
      <p>{gameStatus}</p>
      <button
        className={props.gameOver ? "closeBtn" : "ContinueBtn"}
        onClick={() => props.closeOrContinue(gameStatus)}
      >
        {gameStatus === "Game Over" ? "Close" : "Continue"}
      </button>
      <button className='newGameBtn' onClick={() => props.newGame()}>
        New Game
      </button>
    </div>
  );
};

export default Modal;
