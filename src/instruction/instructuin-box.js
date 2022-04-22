/* eslint-disable */
import React from "react";


export default function InstructionBox({mod, text}) {

  return (
    <div className={`instruction-box instruction-box_${mod}`}>{text}</div>
  );
};

