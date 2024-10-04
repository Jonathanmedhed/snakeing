import React, { useEffect } from "react";

/**
 * @description Container with a key listener, takes an array of keys to be listened.
 * @param {Component} children content inside listener e.g:  <KeyListener> { chilren } </KeyListener>
 * @param {Array} keys objects of keys [{ id: "ArrowLeft", action: () => setIsLeft(true) }]
 * @returns component with a listener
 */
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
