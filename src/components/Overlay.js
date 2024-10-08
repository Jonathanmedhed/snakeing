import React from "react";

const Overlay = ({ children, hide, show }) => {
  return (
    <div className={`overlay ${show ? "" : "--hide"}`}>
      <div className="overlay__inner" onClick={hide}></div>
      <div className="overlay__content">{children}</div>
    </div>
  );
};

export default Overlay;
