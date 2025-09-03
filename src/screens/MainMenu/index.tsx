import React from "react";
import './style.css';
import flappyBird from '../../../public/assets/Flappy Bird.svg';
import title from '../../../public/assets/Icon Flappy Bird .svg';
import welcome from '../../../public/assets/welcome.svg';


interface MainMenuProps {
  action: (name: TScreen) => void;
}
const MainMenu: React.FC = ({action} : MainMenuProps) => {
  
  return (
    <div className="main-menu" onClick={() => action('loading')}>
      <img className="bird" src={flappyBird} alt="" />
      <img className="title" src={title} alt="" />
      <img className="welcome" src={welcome} alt="" />
    </div>
  );
}

export default MainMenu;
