import React, { useEffect, useState } from "react";

const Grid = () => {
  const [activeCell, setActiveCell] = useState(0);
  const [activeRow, setActiveRow] = useState(0);

  // for on is key clicked
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const [snakeSize, setSnakeSize] = useState(3);
  const [activeCells, setActiveCells] = useState([-2, -1, 0]);

  const rows = [...Array(20)];
  const cells = [...Array(20)];

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") {
      setIsLeft(true);
    } else if (e.key === "ArrowRight") {
      setIsRight(true);
    } else if (e.key === "ArrowUp") {
      setIsUp(true);
    } else if (e.key === "ArrowDown") {
      setIsDown(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let cellsActive = activeCells;
    if (isRight) {
      if (activeCell !== cells.length - 1) {
        setActiveCell(activeCell + 1);
        cellsActive.push(activeCell + 1);
        cellsActive.shift();
        setActiveCells(cellsActive);
      }
      setIsRight(false);
    }
    if (isLeft) {
      if (activeCell !== 0) {
        setActiveCell(activeCell - 1);
      }
      setIsLeft(false);
    }
    if (isDown) {
      if (activeRow !== rows.length - 1) {
        setActiveRow(activeRow + 1);
        cellsActive.push(activeCell + 1);
        cellsActive.shift();
        setActiveCells(cellsActive);
      }
      setIsDown(false);
    }
    if (isUp) {
      if (activeRow !== 0) {
        setActiveRow(activeRow - 1);
      }
      setIsUp(false);
    }
  }, [isRight, isLeft, isUp, isDown]); // eslint-disable-line

  return (
    <div className="grid" tabIndex={0} onKeyDown={handleKeyPress}>
      {console.log(activeCells)}
      <div className="grid__container">
        {rows.map((item, actRow) => (
          <div key={actRow} className="grid__row">
            {cells.map((item, actCell) => (
              <div
                key={actCell}
                className={`grid__cell ${
                  activeRow === parseInt(actRow) &&
                  (activeCell === parseInt(actCell) ||
                    activeCells.includes(actCell))
                    ? "--active"
                    : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
