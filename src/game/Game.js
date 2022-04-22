/* eslint-disable */

import React, {useEffect, useRef, useState} from "react";
import Welcome from "../welcome/Welcome";
import Choose from "../choose/Choose";
import Main from "../main/Main";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Instruction from "../instruction/Instruction";


export default function Game() {

  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(0);
  const [timeoutReduce, setTimeoutReduce] = useState(2500);
  const [charId, setCharId] = useState(0);
  const [name, setName] = useState(null);
  const [satiety, setSatiety] = useState(60);//голод
  const [fear, setFear] = useState(0);

  useEffect(() => {
    if (stage === 0) {
      checkStorage();
    } else if (stage === 1) {

    } else if (stage === 3) {
      setTick(prevState => prevState + 1)
    }
  }, [stage]);

  useEffect(() => {
    if (timeoutReduce > 350) {
      setTimeoutReduce(prevState => prevState - 50);
    }
    console.log("timeoutReduce", timeoutReduce)
  }, [tick]);

  useEffect(() => {
    console.log("tick", tick)
    if (stage == 3) {
      let Timer = setTimeout(() => {
        hungry();
        fearing();
      }, timeoutReduce);
      return () => clearTimeout(Timer);
    }
  }, [tick]);


  //верстка

  function currentStage() {
    switch (stage) {
      case 0 :
        return <Welcome/>;
      case 1 :
        return <Instruction toNext={() => setStage(2)}/>
      case 2 :
        return <Choose setAndSaveName={setAndSaveName} setAndSaveCharId={setAndSaveCharId} setStage={setStage}/>
      case 3 :
        return <Main characterData={{name: name, satiety: satiety, fear: fear, charId: charId ?? 0}}
                     setStorage={setStorage} getStorage={getStorage}
                     setSatiety={setSatiety} deleteFear={deleteFear} setStage={setStage}/>;
      default :
        return 0
    }
  }

  return (
    <div className={"game"}>
      <TransitionGroup component={null}>
        <CSSTransition key={`key-${stage}`} timeout={1000} classNames={"game__stage"}>
          <div className={"game__stage"}>
            {currentStage()}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );


  //функции

  function checkStorage() { // проверка хранилища(чтоб загружать уже готового чара, если он есть)
    const timeToNext = 1500;
    let timerStage;
    if (localStorage.getItem("name")) {
      timerStage = setTimeout(() => {
        setName(getStorage("name"));
        setSatiety(getStorage("satiety") || 60);
        setCharId(getStorage("currentCharId") || 0);
        setFear(Number(getStorage("fear")) || 0);
        setStage(3);
        setTick(0);
        setTimeoutReduce(2500);
      }, timeToNext);
    } else {
      timerStage = setTimeout(() => {
        setStage(1);
        setTick(0);
        setTimeoutReduce(2500);
      }, timeToNext);
    }
    return () => clearTimeout(timerStage);
  }

  function setStorage(name, value) { //сохранение в сторе имя/значение
    localStorage.setItem(name, value)
  }

  function getStorage(name) { //получение из стора имя
    return localStorage.getItem(name)
  }


  function setAndSaveName(name) { //сохраниние имени
    setStorage("name", name);
    setStorage("satiety", 60);
    setStorage("fear", 0);
    setName(getStorage("name"));
  }

  function setAndSaveCharId(currentCharId) { //сохраниние имени
    setStorage("currentCharId", currentCharId);
    setCharId(getStorage("currentCharId"));
  }

  function hungry() {
    if (satiety > 0 && satiety < 100) {
      setSatiety(prevState => prevState - 5);
      setStorage('satiety', satiety - 5);
      setTick(prevState => prevState + 1);
    } else {
      setTick(prevState => prevState + 1);
    }
  }

  function fearing() {
    if (fear < 95) {
      setFear(prevState => prevState + 5);
      setStorage('fear', fear + 10);
    }
  }

  function deleteFear() {
    setFear(0);
    setStorage('fear', 0);
  }
};

