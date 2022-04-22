/* eslint-disable */
import React from "react";
import StatusBar from "../statusBar/StatusBar";
import Frame from "../frame/Frame";
import Character from "../character/Character";
import {data} from "./../constants/copyright";
import InstructionBox from "./instructuin-box";
import Lamp from "../lamp/Lamp";
import Button from "./../gui/button/Button";



export default function Instruction({toNext}) {

  const charId = 1;

  const characterClick= ()=> console.log("da-da");

  return (
    <div className={"instruction"}>
      <Frame fear={30}>
        <Lamp/>
        <StatusBar name={"Балванчик"} satiety={60} fear={55}/>
        <Character skin={data.choose.characters[charId]} id={charId} characterClick={characterClick}/>
        {InstructionBoxes(data.instruction)}
        <Button className={"instruction__button"} textInner={"Погнали"} onClick={toNext}/>
      </Frame>
    </div>
  );
};

function InstructionBoxes(list) {
  return (
    list.map((el,index)=> {
      return <InstructionBox key={`box-${index}`} mod={el.mod} text={el.text}/>
    })
  )
}
