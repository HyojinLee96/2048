import React, { useState } from 'react';
import './alert.css';

const SideMenu = () => {

  const [toggle, setToggle] = useState(false);

  const SideMenuEvent = () => {
    toggle ? setToggle(false) : setToggle(true);
  };


  return (
    <nav className={toggle ? 'sideMenu active' : 'sideMenu'}>
      <div className={toggle ? 'menu-btn nav-open' : 'menu-btn'} onClick={() => SideMenuEvent()}>
        <div className={toggle ? 'line line--1 line-cross' : 'line line--1'}></div>
        <div className={toggle ? 'line line--2 line-fade-out' : 'line line--2'}></div>
        <div className={toggle ? 'line line--3 line-cross' : 'line line--3'}></div>
      </div>
      <div className={toggle ? 'nav-links fade-in' : 'nav-links'}>
        <h1>Rule</h1>
        <p>
          <span><strong>1. </strong>보드를 위, 아래, 왼쪽, 오른쪽으로 슬라이딩 하면 모든 블록이 슬라이딩 한 방향으로 이동한다. 슬라이딩 후에는 랜덤한 빈 공간에 2, 혹은 4가 생성된다.</span>
          <span><strong>2. </strong>숫자가 같은 블록이 슬라이딩할 때 부딪치면 블록이 합체되어 숫자가 두배가 된다. 예를 들어 2 블록이 위 아래로 나란히 있을 경우 아래로 슬라이딩 하면 2블록 2개가 8 블록 하나로 합쳐진다.</span>
          <span><strong>3. </strong>보드판이 꽉 차 더이상 슬라이딩을 할 수 없다면 게임이 종료되고, 2048 블록을 만들면 게임에 성공한다.</span>
          <span><strong>4. </strong>2048을 만드는데 성공한 후, 계속 게임을 진행해 더 큰 숫자를 만들 수 있다.</span>
        </p>
        
      </div>
    </nav>
  );
};

export default SideMenu;