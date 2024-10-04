import React, { useEffect, useState } from "react";
import KeyListener from "./KeyListener";
import { getRandom } from "../utils/functions";

const Grid = () => {
  // for the active direction
  const [direction, setDirection] = useState(false);

  // Number of Rows and Cells per row
  const cellAmount = 20;
  const rows = [...Array(cellAmount)];
  const cells = [...Array(cellAmount)];

  // Snake's cells
  const [snakeCells, setSnakeCells] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
  // Target cells
  const [targetCells, setTargetCells] = useState([
    { x: Math.floor(cellAmount / 2), y: Math.floor(cellAmount / 2) },
  ]);

  // Snake direction
  const [snakeDirection, setSnakeDirection] = useState("right");

  // Snake status
  const [isCrashed, setIsCrashed] = useState(false);

  // Keys for the key listener
  const keys = [
    { id: "ArrowLeft", action: () => setDirection("left") },
    { id: "ArrowRight", action: () => setDirection("right") },
    { id: "ArrowUp", action: () => setDirection("up") },
    { id: "ArrowDown", action: () => setDirection("down") },
  ];

  /**
   * @description Checks if there is contact
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @param {Array} cells Array of cells e.g: [{x: 0, y: 0}]
   * @returns true if contact
   */
  const checkIfContact = (x, y, cells) => {
    if (cells.some((e) => e.x === x && e.y === y)) {
      return true;
    }
  };

  /**
   * @description Returns cell className
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkCellType = (x, y) => {
    return `${checkIfContact(x, y, snakeCells) ? "snake-cell" : ""} ${
      checkIfContact(x, y, targetCells) ? "target-cell" : ""
    } ${
      checkIfContact(x, y, snakeCells) && checkIfContact(x, y, targetCells)
        ? "collided-cell"
        : ""
    } ${isCrashed ? "--crashed" : ""}`;
  };

  /**
   * @description adds next target
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   */
  const addNewTarget = (x, y) => {
    let newTarget = {
      x: getRandom(0, cellAmount - 1),
      y: getRandom(0, cellAmount - 1),
    };

    // change target if is includen in snakes cells
    if (checkIfContact(newTarget.x, newTarget.y, snakeCells)) {
      newTarget = {
        x: getRandom(0, cellAmount - 1),
        y: getRandom(0, cellAmount - 1),
      };
    }

    // remove target collided
    let newTargets = targetCells.filter((cell) => {
      return cell.x !== x && cell.y !== y;
    });

    newTargets.push(newTarget);
    setTargetCells(newTargets);
  };

  /**
   * @description Creates action depending on next cell, if next cell is empty removes tail cell and adds one to head; if next cell is wall or snake it crashes and stops snake; if next cell is target updates the targets
   * @param {Boolean} isSelected on key down
   * @param {String} oppositeDirection opposite direction to key direction
   * @param {Function} finishMovement last action of movement
   * @param {String} direction new direction e.g: 'right'
   * @param {Condition} isInLimits condition to check if is going out of grid
   * @param {Number} newX value of x to add or substract
   * @param {Number} newY value of y to add or substract
   */
  const onDirectionSelected = (selectedDirection) => {
    let oppositeDirection;
    let isInLimits;
    let newX;
    let newY;
    const newSnakeCells = snakeCells;
    switch (selectedDirection) {
      case "left":
        oppositeDirection = "right";
        isInLimits = snakeCells[snakeCells.length - 1].x !== 0;
        newX = -1;
        newY = false;
        break;
      case "right":
        oppositeDirection = "left";
        isInLimits = snakeCells[snakeCells.length - 1].x !== cells.length - 1;
        newX = 1;
        newY = false;
        break;
      case "up":
        oppositeDirection = "down";
        isInLimits = snakeCells[snakeCells.length - 1].y !== 0;
        newX = false;
        newY = -1;
        break;
      case "down":
        oppositeDirection = "up";
        isInLimits = snakeCells[snakeCells.length - 1].y !== rows.length - 1;
        newX = false;
        newY = 1;
        break;
      default:
        break;
    }

    const newCellX = snakeCells[snakeCells.length - 1].x + newX || 0;
    const newCellY = snakeCells[snakeCells.length - 1].y + newY || 0;
    if (selectedDirection && !isCrashed) {
      if (snakeDirection !== oppositeDirection) {
        if (snakeCells.some((e) => e.x === newCellX && e.y === newCellY)) {
          setIsCrashed(true);
        }
        // Check if target cell is out of limits
        if (isInLimits) {
          // add new cell to head
          newSnakeCells.push({
            x: newCellX,
            y: newCellY,
          });

          /***************************** UPDATE TARGETS HERE ****************************************/
          if (checkIfContact(newCellX, newCellY, targetCells)) {
            addNewTarget(newCellX, newCellY);
          }
          // if not collided remove last cell (to remain same snake size)
          if (
            !(
              checkIfContact(newCellX, newCellY, snakeCells) &&
              checkIfContact(newCellX, newCellY, targetCells)
            )
          ) {
            newSnakeCells.shift();
            // if collided with target
          }
          // update snake cells
          setSnakeCells(newSnakeCells);
          // update snake direction
          setSnakeDirection(direction);
        } else {
          setIsCrashed(true);
        }
      }
      setDirection(false);
    }
  };

  useEffect(() => {
    onDirectionSelected(direction);
  }, [direction]); // eslint-disable-line

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
