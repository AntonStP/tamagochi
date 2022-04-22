/* eslint-disable */
import React, {useEffect, useState} from "react";


export default function Lamp({deleteFear}) {

  const [lampStatus,setLampStatus] = useState(false);

  useEffect(()=> {
    let lTimer = setTimeout(() => {
      setLampStatus(false);
    }, 1000);
    return () => {
      clearTimeout(lTimer);
    }
  },[lampStatus])

  return (
    <div className={`lamp ${lampStatus ? "lamp_on" : "" }`} onClick={()=>{
      deleteFear();
      setLampStatus(true);
      if(navigator) navigator.vibrate(50);
    }}>

    </div>
  );
};

