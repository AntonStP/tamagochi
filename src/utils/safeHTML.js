import React from "react";
import parse from "html-react-parser";

export function safeHTML(htmlString){
    return <>{parse(htmlString)}</>
}
