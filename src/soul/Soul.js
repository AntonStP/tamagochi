/* eslint-disable */
import React from "react";

export default function Soul({left, top}) {

  return (
    <div className={"soul"} style={{left: `${left}%`, top: `${top}%`}}>
      <div className={"soul__icon"}>
      </div>
    </div>
  );
};

