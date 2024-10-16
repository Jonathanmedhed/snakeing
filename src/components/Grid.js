import React, { useEffect, useState } from "react";
import deadSound from "../sounds/dead.ogg";
import eatSound from "../sounds/eat.ogg";
import ouchSound from "../sounds/ouch.ogg";
import KeyListener from "./KeyListener";
import Overlay from "./Overlay";
import StatsBar from "./StatsBar";
import Screen from "./Screen";
import { getRandom } from "../utils/functions";
import ArrowController from "./ArrowController";
import snakeHead from "../images/snake-head.svg";
import snakeHeadDead from "../images/snake-head-dead.svg";
import snakeHeadNo from "../images/snake-head-no.svg";
import snakeWebP from "../images/snake.webp";
import snakeDeadWebP from "../images/snake-dead.webp";
import cat from "../images/cat.svg";
import cow from "../images/cow.svg";
import crow from "../images/crow.svg";
import dog from "../images/dog.svg";
import dove from "../images/dove.svg";
import dragon from "../images/dragon.svg";
import frog from "../images/frog.svg";
import hippo from "../images/hippo.svg";
import horse from "../images/horse.svg";
import kiwi from "../images/kiwi.svg";
import locust from "../images/locust.svg";
import otter from "../images/otter.svg";
import person from "../images/person.svg";
import personMilitary from "../images/person-military.svg";
import personRifle from "../images/person-rifle.svg";

const Grid = () => {
  //Sounds
  const soundDead = new Audio(deadSound);
  const soundEat = new Audio(eatSound);
  const soundOuch = new Audio(ouchSound);

  // for the active direction
  const [direction, setDirection] = useState(false);
  const [oppositeDirection, setOpositeDirection] = useState(false);
  const [lastDirection, setLastDirection] = useState("right");
  const [movesCount, setMovesCount] = useState(0);

  // Number of Rows and Cells per row
  const cellAmount = 20;
  const rows = [...Array(cellAmount)];
  const cells = [...Array(cellAmount)];

  let startSnakeCells = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ];

  // Snake's cells
  const [snakeCells, setSnakeCells] = useState(startSnakeCells);

  const targets = [
    { media: locust, name: "locust", type: false, power: 10 },
    { media: frog, name: "frog", type: false, power: 10 },
    { media: dove, name: "dove", type: false, power: 15 },
    { media: crow, name: "crow", type: false, power: 20 },
    { media: kiwi, name: "kiwi", type: false, power: 25 },
    { media: cat, name: "cat", type: false, power: 30 },
    { media: dog, name: "dog", type: false, power: 35 },
    { media: otter, name: "otter", type: false, power: 40 },
    { media: person, name: "person", type: false, power: 55 },
    { media: cow, name: "cow", type: false, power: 75 },
    { media: horse, name: "horse", type: false, power: 95 },
    { media: hippo, name: "hippo", type: false, power: 115 },
    { media: personMilitary, name: "person-military", type: false, power: 135 },
    { media: personRifle, name: "person-rifle", type: false, power: 155 },
    { media: dragon, name: "dragon", type: false, power: 1000 },
  ];

  // Target cells
  const [targetCells, setTargetCells] = useState([
    {
      x: Math.floor(cellAmount / 2),
      y: Math.floor(cellAmount / 2),
      target: targets[getRandom(0, 2)],
    },
  ]);

  // Corner cells
  const [cornerCells, setCornerCells] = useState([]);

  // Snake status
  const [isCrashed, setIsCrashed] = useState(false);
  const [showTongue, setShowTongue] = useState(false);

  // Game Stats
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [stamina, setStamina] = useState(100);
  const [power, setPower] = useState(10);

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
   * @description Returns the snake cells with the direction of the tail
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const getSnakeCells = (x, y) => {
    // get index if snake cell, so direction can be used
    let index = snakeCells.findIndex((cell) => cell.x === x && cell.y === y);
    return `${
      checkIfContact(x, y, snakeCells)
        ? `snake-cell ${
            snakeCells[0].x === x && snakeCells[0].y === y
              ? `--tail --${snakeCells[index + 1].direction || "neutral"}`
              : ""
          }`
        : ""
    }`;
  };

  /**
   * @description Returns cell className
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const getCornerType = (x, y) => {
    if (checkIfContact(x, y, cornerCells)) {
      let index = cornerCells.findIndex((cell) => cell.x === x && cell.y === y);
      return cornerCells[index].className;
    } else {
      return "";
    }
  };

  /**
   * @description Returns cell className
   * @param {Number} x number of cell in row (from 0(top) to 0+(down))
   * @param {Number} y number of row in frid (from 0(top) to 0+(down))
   * @returns
   */
  const getTargetType = (x, y) => {
    if (checkIfContact(x, y, targetCells)) {
      let index = targetCells.findIndex((cell) => cell.x === x && cell.y === y);
      return targetCells[index];
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
      target: targets[getRandom(0, targets.length - 1)],
    };

    // change target if is includen in snakes cells
    while (
      checkIfContact(newTarget.x, newTarget.y, snakeCells) ||
      checkIfContact(newTarget.x, newTarget.y, targetCells)
    ) {
      newTarget.x = getRandom(0, cellAmount - 1);
      newTarget.y = getRandom(0, cellAmount - 1);
    }

    // remove target collided
    let newTargets = targetCells.filter((cell) => {
      return cell.x !== x && cell.y !== y;
    });

    newTargets.push(newTarget);
    setTargetCells(newTargets);
  };

  /**
   * Remove corners cells that are not snake cells
   */
  const deleteCornerCells = () => {
    cornerCells.forEach((cCell) => {
      if (!checkIfContact(cCell.x, cCell.y, snakeCells)) {
        let newCorners = cornerCells.filter((cell) => {
          return cell.x !== cCell.x && cell.y !== cCell.y;
        });
        setCornerCells(newCorners);
      }
    });
  };

  /**
   * Return head type component
   */
  const snakeHeadClass = `--${
    lastDirection === oppositeDirection
      ? lastDirection
      : lastDirection || "neutral"
  }`;
  const SnakeHead = isCrashed ? (
    <img
      alt="head"
      className={`snake-head ${snakeHeadClass}`}
      src={snakeHeadDead}
    />
  ) : showTongue ? (
    <img
      alt="head"
      className={`snake-head ${snakeHeadClass}`}
      src={snakeHead}
    />
  ) : (
    <img
      alt="head"
      className={`snake-head --no-tongue ${snakeHeadClass}`}
      src={snakeHeadNo}
    />
  );

  /**
   * Returns game to initial states
   */
  const restartGame = () => {
    setDirection(false);
    setSnakeCells(startSnakeCells);
    setCornerCells([]);
    setMovesCount(0);
    setIsCrashed(false);
  };

  const playAudio = (sound) => {
    soundDead.pause();
    soundDead.currentTime = 0;
    soundEat.pause();
    soundEat.currentTime = 0;
    soundOuch.pause();
    soundOuch.currentTime = 0;
    if (sound === "dead") {
      soundDead.play();
    }
    if (sound === "eat") {
      soundEat.play();
    }
    if (sound === "ouch") {
      soundOuch.play();
    }
  };

  const onEat = (targetPower) => {
    let healValue;
    let staValue;
    if (targetPower <= power) {
      staValue = stamina + 10 > 100 ? 100 : stamina + 10;
      setStamina(staValue);
      healValue = health + 10 > 100 ? 100 : health + 10;
      setHealth(healValue);
      playAudio("eat");
    } else {
      staValue = stamina + 1 > 100 ? 100 : stamina + 1;
      setStamina(staValue);
      healValue = health - 10 <= 0 ? 0 : health - 10;
      setHealth(healValue);
      playAudio("ouch");
    }
    setScore(score + 10);
    setPower(power + 1);
  };

  /**
   * Set isCrash and make sound
   */
  const onCrash = () => {
    setIsCrashed(true);
    playAudio("dead");
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
      // Assign values depending on direction
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

      // Asign x and y to new cell
      const newCellX = snakeCells[snakeCells.length - 1].x + newX || 0;
      const newCellY = snakeCells[snakeCells.length - 1].y + newY || 0;

      // if directionToTake selected and hasn't crashed
      if (directionToTake && !isCrashed) {
        // if collide with self, crash
        if (
          snakeCells.some((e) => e.x === newCellX && e.y === newCellY) ||
          stamina === 0 ||
          health === 0
        ) {
          onCrash();
          clearInterval(interval);
        }
        // if inside grid limits
        if (isInLimits) {
          // update stamina
          setStamina(stamina - 0.5);
          // add new cell to head (move next cell)
          newSnakeCells.push({
            x: newCellX,
            y: newCellY,
            direction: directionToTake,
          });
          // if collided with target, update targets and other stats
          if (checkIfContact(newCellX, newCellY, targetCells)) {
            addNewTarget(newCellX, newCellY);
            onEat(getTargetType(newCellX, newCellY)?.target?.power);
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
          // Check if last snake cell is a corner, if it is, remove last cell from corner cells
          if (
            cornerCells.length >= 1 &&
            cornerCells[0].x === snakeCells[0].x &&
            cornerCells[0].y === snakeCells[0].y
          ) {
            newCornerCells.shift();
          }
          // if direction is different to the previous direction, create corner cell and add it to corner cells
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
          // delete corner cells that are not in snake cells
          deleteCornerCells();
          // update snake
          setSnakeCells(newSnakeCells);
          // update moves count so useEffect continues
          setMovesCount(movesCount + 1);
        } else {
          // if outside limits
          onCrash();
          clearInterval(interval);
        }
        // Add 1 more target if less than 3
        if (targetCells.length < 3) {
          addNewTarget(newCellX, newCellY);
        }
        // show or hide thongue
        setShowTongue(!showTongue);
        // set oposite direction so the snake don't go the opposite direction e.g: from right to left.
        setOpositeDirection(opposite);
        // set last direction to compared to the next one
        setLastDirection(directionToTake);
      }
    }, 100);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [snakeCells, movesCount, direction]); // eslint-disable-line

  return (
    <KeyListener keys={keys}>
      <Overlay
        hide={() => {
          setIsCrashed(false);
          setIsGameStarted(false);
          restartGame();
        }}
        show={isCrashed}
      >
        <Screen
          img={<img alt="snake-icon" src={snakeDeadWebP} />}
          title="GAME OVER"
          content={
            <div className="screen__score">
              <p>Reason:</p>{" "}
              <span>
                {health <= 0 ? "Health" : stamina <= 0 ? "Stamina" : "Crashed"}
              </span>
              <p className="--mt-1">Final Score:</p> <span>{score}</span>
            </div>
          }
          btns={[
            {
              label: "Main Menu",
              onClick: () => {
                setIsCrashed(false);
                setIsGameStarted(false);
                restartGame();
              },
            },
          ]}
        />
      </Overlay>
      <div className="grid">
        {!isGameStarted ? (
          <Screen
            img={<img alt="snake-icon" src={snakeWebP} />}
            title="Sneaking"
            content={<p className="screen__intro">Just a silly game...</p>}
            btns={[
              {
                label: "Start",
                onClick: () => {
                  setIsGameStarted(true);
                  restartGame();
                },
              },
            ]}
          />
        ) : (
          <>
            <div className="grid__container">
              <StatsBar
                health={health}
                power={power}
                score={score}
                stamina={stamina}
              />
              {rows.map((row, actRow) => (
                <div key={actRow} className="grid__row">
                  {cells.map((cell, actCell) => (
                    <div
                      key={actCell}
                      className={`grid__cell ${getSnakeCells(
                        actCell,
                        actRow
                      )} ${getCornerType(actCell, actRow)} ${
                        isCrashed ? "--crashed" : ""
                      }`}
                    >
                      {/** check if is snake head */}
                      {checkIfContact(actCell, actRow, snakeCells) &&
                        snakeCells[snakeCells.length - 1].x === actCell &&
                        snakeCells[snakeCells.length - 1].y === actRow &&
                        SnakeHead}
                      {/** check if is snake tail */}
                      {checkIfContact(actCell, actRow, snakeCells) &&
                        snakeCells[0].x === actCell &&
                        snakeCells[0].y === actRow && (
                          <div className="snake-tail"></div>
                        )}{" "}
                      {/** check if is snake corner */}
                      {checkIfContact(actCell, actRow, cornerCells) && (
                        <div className="snake-corner"></div>
                      )}
                      {/** check if is target */}
                      {checkIfContact(actCell, actRow, targetCells) && (
                        <div
                          className={`target ${
                            getTargetType(actCell, actRow)?.target?.power >
                            power
                              ? "--danger"
                              : ""
                          }`}
                        >
                          {getTargetType(actCell, actRow) && (
                            <img
                              alt={getTargetType(actCell, actRow)?.target?.name}
                              className={`target-img`}
                              src={
                                getTargetType(actCell, actRow)?.target?.media
                              }
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <ArrowController selectDirection={setDirection} />
          </>
        )}
      </div>
    </KeyListener>
  );
};

export default Grid;
