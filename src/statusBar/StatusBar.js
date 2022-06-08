import React from "react";
import {safeHTML} from "../utils/safeHTML";


export default function StatusBar({name, satiety,fear}) {
  return (
    <div className={"status-bar"}>
      <div className={"status-bar__cell status-bar__cell_satiety"}>{safeHTML(`satiety: <br/><span>${satiety}</span>`)}</div>
      <div className={"status-bar__cell status-bar__cell_mind"}>{name}</div>
      <div className={"status-bar__cell status-bar__cell_tank"}>{safeHTML(`fear: <br/><span>${fear}</span>`)}</div>
    </div>
  );
};

