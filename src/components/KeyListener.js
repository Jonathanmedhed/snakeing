import React, { useEffect } from "react";

const KeyListener = ({ children, keys }) => {
  const handleKeyPress = (e) => {
    keys.forEach((key) => {
      if (e.key === key.id) {
        key.action();
      }
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // eslint-disable-line

  return <span tabIndex={0}>{children}</span>;
};

export default KeyListener;
