/* eslint-disable */
import React from "react";
import {safeHTML} from "../utils/safeHTML";


export default function InstructionBox({mod, text}) {

  return (
    <div className={`instruction-box instruction-box_${mod}`}>{safeHTML(text)}</div>
  );
};

