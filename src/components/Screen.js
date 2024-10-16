import React from "react";

const Screen = ({ className, isFullScreen, img, title, content, btns }) => {
  return (
    <div
      className={`screen ${className || ""} ${isFullScreen ? "--full" : ""}`}
    >
      {img}
      <h1>{title}</h1>
      {content}
      {btns?.map((btn, i) => (
        <span className="screen__btn" key={i} onClick={() => btn?.onClick()}>
          {btn.label}
        </span>
      ))}
    </div>
  );
};

export default Screen;
