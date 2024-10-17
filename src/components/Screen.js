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
        <div className="screen__btn" key={i} onClick={() => btn?.onClick()}>
          {btn.label}
        </div>
      ))}
    </div>
  );
};

export default Screen;
