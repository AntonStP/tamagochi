/* eslint-disable */

import React, {useCallback, useState} from "react";
import StatusBar from "../statusBar/StatusBar";
import Character from "../character/Character";
import {data} from "../constants/copyright";
import Frame from "../frame/Frame";
import {randomInteger} from "../utils/randomInteger";
import Lamp from "../lamp/Lamp";
import LazyModal from "../lazyModal/LazyModal";


export default function Main({characterData, setStorage, getStorage,  setSatiety, deleteFear, setStage}) {


  const [souls, setSouls] = useState({});

  function characterClick() {
    if (characterData.satiety < 100) {
      if(navigator) navigator.vibrate(50);
      setStorage("satiety", Number(characterData.satiety) + 5);
      setSatiety(getStorage("satiety"));
      setSouls({
        id: randomInteger(0, 10000),
        top: -30 - randomInteger(0, 10),
        left: randomInteger(0, 100)
      })
    }
  };

  function actionForModal() {
    localStorage.clear();
    setSatiety(60);
    deleteFear();
    setStage(0);
  }


  return (
    <div className={"main"}>
      <Frame fear={characterData.fear}>
        <Lamp deleteFear={deleteFear}/>
        <StatusBar name={characterData.name} satiety={characterData.satiety} fear={characterData.fear}/>
        <Character skin={data.choose.characters[characterData.charId]} id={characterData.charId} characterClick={characterClick} souls={souls}/>
        {((characterData.satiety===0)||(characterData.fear===100)) ?
          <LazyModal
            title={"Предупреждаю"} text={"Кто прочитал, тот сдохнет"}
            action={actionForModal} pic={"images/cat.jpg"}/> : null}
      </Frame>
    </div>
  );
};

