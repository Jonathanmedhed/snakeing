import React from "react";

const StatsBar = ({ health, power, score, stamina }) => {
  const stats = [
    //{className: "score", label: "Score", value: score },
    { className: "health", label: "Health", value: health },
    { className: "stamina", label: "Stamina", value: stamina },
    /**
    { className: "anxiety", label: "Anxiety", value: anxiety },
    { className: "cholesterol", label: "Cholesterol", value: cholesterol },
     */
  ];

  return (
    <div className="stats">
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

          <div className="stats__score">{`Score: ${score}`}</div>
          <div className="stats__score">{`Power: ${power}`}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
