import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Draggable = ({ children, x, y, onPositionChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // mouse move
  const handleMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        onPositionChange({ x: event.clientX - 19, y: event.clientY - 100, isDragging });
      }
    },
    [isDragging]
  );

  // mouse left click release
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  // mouse left click hold
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  // adding/cleaning up mouse event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return children({isDragging, x, y, handleMouseDown });
};

export default Draggable;