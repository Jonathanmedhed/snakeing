import React from "react";
import foodIcon from "../images/food.svg";
import powerIcon from "../images/power.svg";
import snakeIcon from "../images/snake.webp";

const StatsBar = ({ health, power, score, stamina }) => {
  const stats = [
    { className: "health", label: "Health", value: health },
    { className: "stamina", label: "Stamina", value: stamina },
  ];

  return (
    <div className="stats">
      <div className="stats__title">
        <h1>Snaking!</h1>
        <img alt="snake-icon" src={snakeIcon} />
      </div>
      <div className="stats__content">
        <div className="stats__list">
          {stats?.map((stat, i) => (
            <div className="stats__item" key={i}>
              <div className={`stats__item-bar  ${stat.className || ""}`}>
                <div
                  className={`stats__item-amount ${stat.className || ""}`}
                  style={{ width: `${stat.value || 0}%` }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
          <div className="stats__scores">
            <div className="stats__score">
              {`Score: ${score}`}
              <img alt="score" src={foodIcon} />
            </div>
            <div className="stats__score">
              {`Power: ${power}`}
              <img alt="power" src={powerIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
