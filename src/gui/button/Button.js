import React, {useState, useCallback} from "react";

const defaults = {
  up: "button_up",
  down: "button_down",
  hover: "button_hover",
  tag: "button"
};

export default function Button({
                                 className,
                                 tag,
                                 compclass,
                                 color,
                                 border,
                                 type,
                                 onClick,
                                 children,
                                 up,
                                 down,
                                 hover,
                                 textInner,
                                 ...rest
                               }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHover] = useState(false);
  const settings = {up: up ?? defaults.up, down: down ?? defaults.down, hover: hover ?? defaults.hover};
  const Tag = tag || defaults.tag;

  const pressedOn = useCallback(() => setPressed(true), []);
  const pressedOff = useCallback(() => setPressed(false), []);
  const hoverOn = useCallback(() => setHover(true), []);
  const hoverOff = useCallback(() => setHover(false), []);
  return (
    <Tag className={`button ${className}`}
      {...rest}
      onClick={onClick}

      onMouseUp={pressedOff}
      onMouseDown={pressedOn}
      onMouseMove={hoverOn}
      onMouseLeave={hoverOff}

      onTouchStart={pressedOn}
      onTouchEnd={pressedOff}
      onTouchCancel={pressedOff}
    >
      {children}
      {buttonText(textInner)}
    </Tag>)
}

function buttonText(text) {
  if (text) {
    return (
      <div className={"button__text"}>
        {text}
      </div>
    )
  }
}

