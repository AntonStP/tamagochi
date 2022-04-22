/* eslint-disable */
import React from "react";
import Button from "./../gui/button/Button";


export default function LazyModal({title, text, action, pic}) {
  return (
    <div className={"lazy-modal"}>
      <div className={"lazy-modal__box"}>
        <h4 className={"lazy-modal__title"}>{title}</h4>
        <div className={"lazy-modal__text"}>{text}</div>
        {pic? <div className={"lazy-modal__pic"}><img src={pic}/></div> : null}
        <Button {...{tag: "button", className: "choose__button lazy-modal__button"}}
          onClick={()=>action()}
        >Понял</Button>
      </div>
    </div>
  );
};

