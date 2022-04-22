/* eslint-disable */
import React, {useRef, useState} from "react";
import Carousel from "../gui/carousel/Carousel";
import ChooseItem from "./ChooseItem";
import {data} from "./../constants/copyright";
import {settings} from "./../constants/carousel-settings";
import Button from "./../gui/button/Button";
import LazyModal from "../lazyModal/LazyModal";
import {randomInteger} from "./../utils/randomInteger"

export default function Choose({setAndSaveName, setAndSaveCharId, setStage}) {


  const chooseData = data.choose;
  const inputRef = useRef();
  const [modalSee,setModalSee] = useState(false);

  const change = () => { //при изменениях в инпуте, менять проп и по пропу выводить значение инпута
    setAndSaveName(inputRef.current.value);
  };

  const btnClick = () => { //отработка перехода на следующий экран с именем или без
    if(inputRef.current.value!=='') {
      setStage(3);
    }
    else setModalSee(true);
  };

  const getRandomName = () => {
    return chooseData.badNames[randomInteger(0,chooseData.badNames.length)]
  };

  const setThisName = () => { // экшен внутрь модальника
    setAndSaveName(getRandomName());
    setStage(3);
  };

  return (
    <div className={"choose"}>
      {modalSee ?
        <LazyModal
          title={chooseData.lazyModal.title}
          text={chooseData.lazyModal.text}
          action={setThisName}/> : ""}
      <h1 className={"choose__title"}>choose your character</h1>
      <div className={"choose__list"}>
        <Carousel settings={{
          ...settings.chooseCharacter,
          onSlideChange: (swiper) => {
            setAndSaveCharId(swiper.realIndex)
          }
        }}
                  itemsData={chooseData.characters} item={ChooseItem}/>
      </div>
      <div className={"choose__set-name"}>
        <div className={"choose__name-title"}>{chooseData.nameTitle}</div>
        <input
          className={"choose__input"} type="text"
          onChange={() => change()} ref={inputRef}/>
        <Button {...{tag: "button", className: "choose__button"}} onClick={() => {
          btnClick();
          if(navigator) navigator.vibrate(10000);
        }}>Подтвердить</Button>
      </div>
    </div>
  );
};


