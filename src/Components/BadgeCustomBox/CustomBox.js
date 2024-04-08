import React, { useState, useEffect } from "react";
import ResizableRect from "react-resizable-rotatable-draggable";

const CustomBox = () => {
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    rotateAngle: 0,
  });

  const handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setDimensions({
      top,
      left,
      width,
      height,
      rotateAngle: dimensions.rotateAngle,
    });
  };

  const handleRotate = (rotateAngle) => {
    setDimensions({
      ...dimensions,
      rotateAngle,
    });
  };

  const handleDrag = (deltaX, deltaY) => {
    setDimensions({
      ...dimensions,
      left: dimensions.left + deltaX,
      top: dimensions.top + deltaY,
    });
  };

  const handleInputEvent = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // Cleanup function or any other effect logic can be added here
  }, []); // Empty dependency array to run the effect only once

  const { width, top, left, height, rotateAngle } = dimensions;

  const wrapperStyle = {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    top: `${top}px`,
    left: `${left}px`,
    transform: `rotate(${rotateAngle}deg)`,
  };

  return (
    <div className="ResizableInput" style={wrapperStyle}>
      {/* Render the ResizableRect */}
      <ResizableRect
        left={0}
        top={0}
        width={width}
        height={height}
        rotateAngle={rotateAngle}
        onRotate={handleRotate}
        onResize={handleResize}
        onDrag={handleDrag}
      />

      {/* Overlay the input element */}
      <input
        type="text"
        placeholder="Your input placeholder"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
          fontFamily: 'sans-serif',
        }}
        onMouseDown={handleInputEvent}
        onMouseMove={handleInputEvent}
        onMouseUp={handleInputEvent}
        onChange={handleInputEvent}
      />
    </div>
  );
};

export default CustomBox;
