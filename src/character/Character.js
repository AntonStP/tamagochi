import React from "react";
import Picture from "./../gui/picture/Picture";
import Soul from "./../soul/Soul";
import {CSSTransition, TransitionGroup} from "react-transition-group";


export default function Character({skin, id, characterClick, souls}) {
  return (
    <div className={`character character_${id}`} onClick={() => {
      characterClick();
    }}>
      {souls ? <TransitionGroup component={null}>
        {Souls(souls)}
      </TransitionGroup> : null}
      <div className={"character__image"}>
        <Picture {...skin.image}/>
      </div>
    </div>
  );
};

function Souls(souls) {
  return (
    <CSSTransition key={souls.id} appear timeout={5000} classNames={'soul'}>
      <Soul left={souls.left} top={souls.top}/>
    </CSSTransition>
  )
}

