import React, { useState, useEffect } from "react";
import ResizableRect from "react-resizable-rotatable-draggable";

const ResizableInput = ({ id = "", children, onChangeBadgeDimension = () => { }, payload }) => {
  const [dimensions, setDimensions] = useState({
    width: id === "qr_code" ? 300 : 200,
    height: id === "qr_code" ? 300 : 200,
    top: 200,
    left: 200,
    rotateAngle: 0,
    color: '#000',
    fontSize: '20px',
  });

  const { width, top, left, height, rotateAngle } = dimensions;

  const handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    width = Math.round(width);
    height = Math.round(height);
    // top = Math.round(top);
    // left = Math.round(left);
    if (onChangeBadgeDimension) onChangeBadgeDimension({
      target: {
        name: id, value: {
          ...dimensions,
          width,
          height,
          rotateAngle: dimensions.rotateAngle,
        }
      }
    });
    setDimensions({
      // top,
      // left,
      ...dimensions,
      width,
      height,
      rotateAngle: dimensions.rotateAngle,
    });
  };

  const handleRotate = (rotateAngle) => {
    if (onChangeBadgeDimension) onChangeBadgeDimension({
      target: {
        name: id, value: {
          ...dimensions,
          rotateAngle: dimensions.rotateAngle,
        }
      }
    })
    setDimensions({
      ...dimensions,
      rotateAngle,
    });
  };

  const handleDrag = (deltaX, deltaY) => {
    if (onChangeBadgeDimension) onChangeBadgeDimension({
      target: {
        name: id, value: {
          ...dimensions,
          left: dimensions.left + deltaX,
          top: dimensions.top + deltaY,
        }
      }
    })
    setDimensions({
      ...dimensions,
      left: dimensions.left + deltaX,
      top: dimensions.top + deltaY,
    });
  };

  useEffect(() => {
    if (payload?.color) {
      setDimensions({
        ...payload
      });
      if (onChangeBadgeDimension) onChangeBadgeDimension({
        target: {
          name: id, value: {
            ...payload
          }
        }
      })
    } else {
      setDimensions({
        ...dimensions
      });
      if (onChangeBadgeDimension) onChangeBadgeDimension({
        target: {
          name: id, value: {
            ...dimensions
          }
        }
      })
    }

    return (() => onChangeBadgeDimension({
      target: {
        name: id, value: {}
      }
    }))
  }, [payload]);

  // useEffect(() => {
  //   if (onChangeBadgeDimension) onChangeBadgeDimension({
  //     target: {
  //       name: id, value: {
  //         ...dimensions,
  //       }
  //     }
  //   })

  //   return (() => onChangeBadgeDimension({
  //     target: {
  //       name: id, value: {}
  //     }
  //   }))
  // }, []);


  const wrapperStyle = {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    top: `${top}px`,
    left: `${left}px`,
    transform: `rotate(${rotateAngle}deg)`,
    color: '#000',
    fontSize: '20px',
  };

  return (
    <div className="ResizableInput" style={wrapperStyle}>
      {/* Render the ResizableRect */}
      <ResizableRect
        // left={left}
        // top={0}
        width={width}
        height={height}
        rotateAngle={rotateAngle}
        onRotate={handleRotate}
        onResize={handleResize}
        onDrag={handleDrag}
        rotatable={false}
        zoomable={id === "qr_code" ? '' : 'se'}
        // zoomable='se'

      // zoomable='n, w, s, e, nw, ne, se, sw'
      />
      {/* 'n, w, s, e, nw, ne, se, sw' */}
      {/* Overlay the input element */}
      {children}
    </div>
  );
};

const CustomBox = ({ id, children, onChangeBadgeDimension, payload = {} }) => {
  return (
    <ResizableInput payload={payload} id={id} onChangeBadgeDimension={onChangeBadgeDimension}>
      {children ? children : null}
    </ResizableInput>
  );
};

export default CustomBox;
