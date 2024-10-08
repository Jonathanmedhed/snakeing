import React, { useEffect, useState } from "react";
import KeyListener from "./KeyListener";
import { getRandom } from "../utils/functions";
import Overlay from "./Overlay";

const Grid = () => {
  // for the active direction
  const [direction, setDirection] = useState(false);
  const [oppositeDirection, setOpositeDirection] = useState(false);
  const [lastDirection, setLastDirection] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  // Number of Rows and Cells per row
  const cellAmount = 20;
  const rows = [...Array(cellAmount)];
  const cells = [...Array(cellAmount)];

  // Snake's cells
  const [snakeCells, setSnakeCells] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
  ]);
  // Target cells
  const [targetCells, setTargetCells] = useState([
    { x: Math.floor(cellAmount / 2), y: Math.floor(cellAmount / 2) },
  ]);
  // Corner cells
  const [cornerCells, setCornerCells] = useState([]);

  // Snake status
  const [isCrashed, setIsCrashed] = useState(false);

  // Show screens
  const [showScreen, setShowScreen] = useState(false);

  // Keys for the key listener
  const keys = [
    { id: "ArrowLeft", action: () => setDirection("left") },
    {
      id: "ArrowRight",
      action: () => setDirection("right"),
    },
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
    // get index if snake cell, so direction can be used
    let index = snakeCells.findIndex((cell) => cell.x === x && cell.y === y);
    return `${
      checkIfContact(x, y, snakeCells)
        ? `snake-cell ${
            snakeCells[snakeCells.length - 1].x === x &&
            snakeCells[snakeCells.length - 1].y === y
              ? `--head --${direction || "neutral"}`
              : ""
          } ${
            snakeCells[0].x === x && snakeCells[0].y === y
              ? `--tail --${snakeCells[index + 1].direction || "neutral"}`
              : ""
          }`
        : ""
    } ${checkIfContact(x, y, targetCells) ? "target-cell" : ""} ${
      checkIfContact(x, y, snakeCells) && checkIfContact(x, y, targetCells)
        ? "collided-cell"
        : ""
    } ${isCrashed ? "--crashed" : ""}`;
  };

  /**
   * @description Returns cell className
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const checkCornerType = (x, y) => {
    if (checkIfContact(x, y, cornerCells)) {
      let index = cornerCells.findIndex((cell) => cell.x === x && cell.y === y);
      return cornerCells[index].className;
    } else {
      return "";
    }
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

  // Remove corners cells that are not snake cells
  const updateCornerCells = () => {
    cornerCells.forEach((cCell) => {
      if (!checkIfContact(cCell.x, cCell.y, snakeCells)) {
        let newCorners = cornerCells.filter((cell) => {
          return cell.x !== cCell.x && cell.y !== cCell.y;
        });
        setCornerCells(newCorners);
      }
    });
  };

  // Return game to initial states
  const restartGame = () => {
    setDirection(false);
    setSnakeCells([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
    setMovesCount(0);
    setIsCrashed(false);
  };

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      let newX;
      let newY;
      let isInLimits;
      let opposite;
      const newSnakeCells = snakeCells;
      let newCornerCells = cornerCells;
      let directionToTake = direction;

      // if going on opposite direction, continue last direction
      if (directionToTake === oppositeDirection) {
        directionToTake = lastDirection;
      }

      switch (directionToTake) {
        case "up":
          newX = false;
          newY = -1;
          isInLimits = snakeCells[snakeCells.length - 1].y !== 0;
          opposite = "down";
          break;
        case "right":
          newX = 1;
          newY = false;
          isInLimits = snakeCells[snakeCells.length - 1].x !== cells.length - 1;
          opposite = "left";
          break;
        case "down":
          newX = false;
          newY = 1;
          isInLimits = snakeCells[snakeCells.length - 1].y !== rows.length - 1;
          opposite = "up";
          break;
        case "left":
          newX = -1;
          newY = false;
          isInLimits = snakeCells[snakeCells.length - 1].x !== 0;
          opposite = "right";
          break;
        default:
          break;
      }

      const newCellX = snakeCells[snakeCells.length - 1].x + newX || 0;
      const newCellY = snakeCells[snakeCells.length - 1].y + newY || 0;

      // if directionToTake selected and hasn't crashed
      if (directionToTake && !isCrashed) {
        // if collide with self, crash
        if (snakeCells.some((e) => e.x === newCellX && e.y === newCellY)) {
          setIsCrashed(true);
          setShowScreen(true);
        }
        // if inside grid limits
        if (isInLimits) {
          // add new cell to head (move next cell)
          newSnakeCells.push({
            x: newCellX,
            y: newCellY,
            direction: directionToTake,
          });
          // update targers
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
          }
          // Check if last snake cell is a corner, if it is, remove lsat from corners
          if (
            cornerCells.length >= 1 &&
            cornerCells[0].x === snakeCells[0].x &&
            cornerCells[0].y === snakeCells[0].y
          ) {
            newCornerCells.shift();
          }
          // create corner cells on turn
          if (directionToTake !== lastDirection) {
            let newCornerCell = {
              x: snakeCells[snakeCells.length - 2].x,
              y: snakeCells[snakeCells.length - 2].y,
              className: `--corner-cell --${directionToTake}-${
                lastDirection || "right"
              }`,
            };
            newCornerCells.push(newCornerCell);
            setCornerCells(newCornerCells);
          }
          updateCornerCells();
          // update snake
          setSnakeCells(newSnakeCells);
          // update moves count so useEffect continues
          setMovesCount(movesCount + 1);
        } else {
          // if outside limits
          setIsCrashed(true);
          setShowScreen(true);
        }
        setOpositeDirection(opposite);
        setLastDirection(directionToTake);
      }
    }, 100);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [snakeCells, movesCount, direction]); // eslint-disable-line

  return (
    <KeyListener keys={keys}>
      <Overlay hide={() => setShowScreen(false)} show={false}>
        <h1>GAME OVER</h1>
        <span
          onClick={() => {
            restartGame();
            setShowScreen(false);
          }}
        >
          Restart
        </span>
      </Overlay>
      <div className="grid">
        grid
        <div className="grid__container">
          grid container
          {rows.map((row, actRow) => (
            <div key={actRow} className="grid__row">
              {cells.map((cell, actCell) => (
                <div
                  key={actCell}
                  className={`grid__cell ${checkCellType(
                    actCell,
                    actRow
                  )} ${checkCornerType(actCell, actRow)}`}
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
