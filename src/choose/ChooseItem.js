/* eslint-disable */

import React from "react";
import Picture from "./../gui/picture/Picture";


export default function ChooseItem({image, id}){
  return(
    <div className={`choose__item choose__item_${id}`}>
      <div className={"choose__item-image"}>
        <Picture {...image} />
      </div>
    </div>
  );
};

