import { useState } from "react";
import './style.css';
import React from "react";
import MainMenu from "../../screens/MainMenu";
import LoadingScreen from "../../screens/LoadingScreen";
import landingPage from "../../../public/assets/Landing Page.svg"


type TScreen = "main" | "loading" | "game" | "gameOver";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<TScreen>("main");

  const handleNextScreen = (name: TScreen) => {
    setCurrentScreen(name)
  }

  return (
    <div className="main-layout">
      <div className="background-image">
        <img src={landingPage} alt="" />
      </div>

      <div className="content">
        {currentScreen === "main" && <MainMenu action={handleNextScreen}/>}
        {currentScreen === 'loading' && <LoadingScreen action={handleNextScreen}/>}
      </div>
    </div>
  );
}

export default App;







  // useEffect(() => {
  //   const tg = (window as any).Telegram.WebApp;

  //   tg.ready();
  // }, []);

  // const sendToBot = () => {
  //   const tg = (window as any).Telegram.WebApp;
  //   tg.sendData(JSON.stringify({ action: "hello", msg: "Привет из WebApp!" }));
  // };