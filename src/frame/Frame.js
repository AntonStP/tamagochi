/* eslint-disable */
import React from "react";

export default function Frame(props) {

  function calcFear(index) {
    let curValue = 10*index/6;
    return curValue;
  }


  return (
    <div className={`frame ${props.fear>=100 ? "frame_dark" : ""}`}>
      <div className={"frame__part frame__part_top"} style={{height: `${calcFear(props.fear)}px`}}></div>
      <div className={"frame__part frame__part_left"} style={{height: `${calcFear(props.fear)}px`}}></div>
      <div className={"frame__part frame__part_right"} style={{height: `${calcFear(props.fear)}px`}}></div>
      <div className={"frame__part frame__part_bottom"} style={{height: `${calcFear(props.fear)}px`}}></div>
      {props.children}
    </div>
  );
};
