import React from "react";
import './style.css';
import flappyBird from '../../../public/assets/Flappy Bird.svg';
import title from '../../../public/assets/Icon Flappy Bird .svg';
import welcome from '../../../public/assets/welcome.svg';
import { type ScreenProps } from "../../components/App";



const MainMenu: React.FC<ScreenProps> = ({action} : ScreenProps) => {
  
  return (
    <div className="main-menu" onClick={() => action('loading')}>
      <img className="bird" src={flappyBird} alt="" />
      <img className="title" src={title} alt="" />
      <img className="welcome" src={welcome} alt="" />
    </div>
  );
}

export default MainMenu;
