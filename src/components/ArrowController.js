import React from "react";

const ArrowController = ({ selectDirection }) => {
  return (
    <div className="controller">
      <div className="controller__row --top">
        <div
          className="controller__selector"
          onClick={() => selectDirection("up")}
          onKeyDown={() => selectDirection("up")}
        >
          <div className="controller__arrow --up"></div>
        </div>
      </div>
      <div className="controller__row --mid">
        <div
          className="controller__selector"
          onClick={() => selectDirection("left")}
          onKeyDown={() => selectDirection("left")}
        >
          <div className="controller__arrow --left"></div>
        </div>
        <div
          className="controller__selector"
          onClick={() => selectDirection("right")}
          onKeyDown={() => selectDirection("right")}
        >
          <div className="controller__arrow --right"></div>
        </div>
      </div>
      <div className="controller__row --bot">
        <div
          className="controller__selector"
          onClick={() => selectDirection("down")}
          onKeyDown={() => selectDirection("down")}
        >
          <div className="controller__arrow --down"></div>
        </div>
      </div>
    </div>
  );
};

export default ArrowController;
