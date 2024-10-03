import React, { useEffect, useState } from "react";
import KeyListener from "./KeyListener";

const Grid = () => {
  // for on is key clicked
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const [snakeSize, setSnakeSize] = useState(3);
  const [activeCells, setActiveCells] = useState([
    { x: -2, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");

  const rows = [...Array(20)];
  const cells = [...Array(20)];

  useEffect(() => {
    let cellsActive = activeCells;
    if (isRight) {
      if (direction !== "left") {
        if (activeCells[activeCells.length - 1].x !== cells.length - 1) {
          cellsActive.push({
            x: activeCells[activeCells.length - 1].x + 1,
            y: activeCells[activeCells.length - 1].y,
          });
          cellsActive.shift();
          setActiveCells(cellsActive);
          setDirection("right");
        }
      }
      setIsRight(false);
    }
    if (isLeft) {
      if (direction !== "right") {
        if (activeCells[activeCells.length - 1].x !== 0) {
          cellsActive.push({
            x: activeCells[activeCells.length - 1].x - 1,
            y: activeCells[activeCells.length - 1].y,
          });
          cellsActive.shift();
          setActiveCells(cellsActive);
          setDirection("left");
        }
      }
      setIsLeft(false);
    }
    if (isDown) {
      if (direction !== "up") {
        if (activeCells[activeCells.length - 1].y !== rows.length - 1) {
          cellsActive.push({
            x: activeCells[activeCells.length - 1].x,
            y: activeCells[activeCells.length - 1].y + 1,
          });
          cellsActive.shift();
          setActiveCells(cellsActive);
          setDirection("down");
        }
      }
      setIsDown(false);
    }
    if (isUp) {
      if (direction !== "down") {
        if (activeCells[activeCells.length - 1].y !== 0) {
          cellsActive.push({
            x: activeCells[activeCells.length - 1].x,
            y: activeCells[activeCells.length - 1].y - 1,
          });
          cellsActive.shift();
          setActiveCells(cellsActive);
          setDirection("up");
        }
      }
      setIsUp(false);
    }
  }, [isRight, isLeft, isUp, isDown]); // eslint-disable-line

  const checkIfActive = (x, y) => {
    if (activeCells.some((e) => e.x === x && e.y === y)) {
      return true;
    }
  };

  const keys = [
    { id: "ArrowLeft", action: () => setIsLeft(true) },
    { id: "ArrowRight", action: () => setIsRight(true) },
    { id: "ArrowUp", action: () => setIsUp(true) },
    { id: "ArrowDown", action: () => setIsDown(true) },
  ];

  return (
    <div className="grid">
      <KeyListener keys={keys}>
        <div className="grid__container">
          {rows.map((item, actRow) => (
            <div key={actRow} className="grid__row">
              {cells.map((item, actCell) => (
                <div
                  key={actCell}
                  className={`grid__cell ${
                    checkIfActive(actCell, actRow) ? "--active" : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </KeyListener>
    </div>
  );
};

export default Grid;
