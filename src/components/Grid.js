import React, { useEffect, useState } from "react";
import KeyListener from "./KeyListener";

const Grid = () => {
  // for on is key clicked
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const [snakeSize, setSnakeSize] = useState(3);

  // Snake's cells
  const [snakeCells, setSnakeCells] = useState([
    { x: -2, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
  ]);
  // Target cells
  const [targetCells, setTargetCells] = useState([{ x: 10, y: 10 }]);

  // Snake direction
  const [snakeDirection, setSnakeDirection] = useState("right");

  // Number of Rows and Cells per row
  const rows = [...Array(20)];
  const cells = [...Array(20)];

  // Keys for the key listener
  const keys = [
    { id: "ArrowLeft", action: () => setIsLeft(true) },
    { id: "ArrowRight", action: () => setIsRight(true) },
    { id: "ArrowUp", action: () => setIsUp(true) },
    { id: "ArrowDown", action: () => setIsDown(true) },
  ];

  /**
   * Checks if current cell coordinates is an active cell
   * @param {*} x number of cell in row (from 0(top) to 0+(down))
   * @param {*} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkIsInSnake = (x, y) => {
    if (snakeCells.some((e) => e.x === x && e.y === y)) {
      return true;
    }
  };

  /**
   * Checks if current cell coordinates is an target cell
   * @param {*} x number of cell in row (from 0(top) to 0+(down))
   * @param {*} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkIfTarget = (x, y) => {
    if (targetCells.some((e) => e.x === x && e.y === y)) {
      return true;
    }
  };

  /**
   * Checks if current cell coordinates is in both target and snake cells
   * @param {*} x number of cell in row (from 0(top) to 0+(down))
   * @param {*} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkIfCollided = (x, y) => {
    if (checkIsInSnake(x, y) && checkIfTarget(x, y)) {
      return true;
    }
  };

  /**
   * Returns cell className
   * @param {*} x number of cell in row (from 0(top) to 0+(down))
   * @param {*} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkCellType = (x, y) => {
    return `${checkIsInSnake(x, y) ? "snake-cell" : ""} ${
      checkIfTarget(x, y) ? "target-cell" : ""
    } ${checkIfCollided(x, y) ? "collided-cell" : ""}`;
  };

  /**
   *
   * @param {Boolean} isSelected on key down
   * @param {String} oppositeDirection opposite direction to key direction
   * @param {Function} onFinish last action of movement
   * @param {String} direction new direction e.g: 'right'
   * @param {Condition} isInLimits condition to ccheck if is going out of grid
   * @param {Integer} newX value of x to add or substract
   * @param {Integer} newY value of y to add or substract
   */
  const onDirectionSelected = (
    isSelected,
    oppositeDirection,
    onFinish,
    direction,
    isInLimits,
    newX,
    newY
  ) => {
    const cellsToAdd = snakeCells;
    const newCellX = snakeCells[snakeCells.length - 1].x + newX || 0;
    const newCellY = snakeCells[snakeCells.length - 1].y + newY || 0;
    if (isSelected) {
      if (snakeDirection !== oppositeDirection) {
        if (isInLimits) {
          // add new cell to head
          cellsToAdd.push({
            x: newCellX,
            y: newCellY,
          });
          // if not collided remove last cell (remain same size)
          if (!checkIfCollided(newCellX, newCellY)) {
            cellsToAdd.shift();
          }
          // update snake cells
          setSnakeCells(cellsToAdd);
          // update snake direction
          setSnakeDirection(direction);
        }
      }
      onFinish();
    }
  };

  useEffect(() => {
    // On direction Right
    onDirectionSelected(
      isRight,
      "left",
      () => setIsRight(false),
      "right",
      snakeCells[snakeCells.length - 1].x !== cells.length - 1,
      1,
      false
    );
    // On direction Left
    onDirectionSelected(
      isLeft,
      "right",
      () => setIsLeft(false),
      "left",
      snakeCells[snakeCells.length - 1].x !== 0,
      -1,
      false
    );
    // On direction Down
    onDirectionSelected(
      isDown,
      "up",
      () => setIsDown(false),
      "down",
      snakeCells[snakeCells.length - 1].y !== rows.length - 1,
      false,
      1
    );
    // On direction Up
    onDirectionSelected(
      isUp,
      "down",
      () => setIsUp(false),
      "up",
      snakeCells[snakeCells.length - 1].y !== 0,
      false,
      -1
    );
  }, [isRight, isLeft, isUp, isDown]); // eslint-disable-line

  return (
    <KeyListener keys={keys}>
      <div className="grid">
        <div className="grid__container">
          {rows.map((row, actRow) => (
            <div key={actRow} className="grid__row">
              {cells.map((cell, actCell) => (
                <div
                  key={actCell}
                  className={`grid__cell ${checkCellType(actCell, actRow)}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </KeyListener>
  );
};

export default Grid;
