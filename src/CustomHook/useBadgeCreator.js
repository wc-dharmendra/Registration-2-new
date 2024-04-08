import useBadgeCreatorStore from "@/Store/useBadgeCreatorStore";
import { useState } from "react";
import { fabric } from "fabric";

fabric.Object.prototype.toObject = (function (toObject) {
  return function (propertiesToInclude) {
    // Include the 'id' property in the resulting object
    return fabric.util.object.extend(toObject.call(this, propertiesToInclude), {
      id: this.id,
    });
  };
})(fabric.Object.prototype.toObject);

const useBadgeCreator = () => {
  const [canvas, setCanvas] = useState();
  const { canvasJsonStr, setCanvasJsonStr, setCanvasSVG } =
    useBadgeCreatorStore();

  const addTextBox = (name) => {
    // let div = new fabric.Text(name, {
    let div = new fabric.Textbox(name, {
      left: canvas.width / 2 - 100,
      top: canvas.height / 2 - 25,
      width: 200,
      height: 50,
      fill: "black",
      stroke: "black",
      fontFamily: "roboto",
      // editable: true,
      editable: false
    });
    div.id = name;
    div.setControlsVisibility({
      mt: false, // middle top disable
      mb: false, // midle bottom
    });
    div.on('scaling', function (e) {
      var obj = this;
      obj.set('textAlign', 'center'); // Set alignment to center while scaling
      if (obj.oCoords.ml.corner.tl.y < obj.oCoords.tl.corner.bl.y) {
        this.setControlsVisibility({
          ml: false,
          tr: false,
          bl: false,
          br: false
        });
      } else {
        this.setControlsVisibility({
          ml: true,
          tr: true,
          bl: true,
          br: true
        });
      }
    });
    let arr = canvas.getObjects()?.filter((obj) => obj?.id === name);
    if (!arr?.length) addToCanvas(div);
  };

  const addImageBox = (name) => {
    fabric.Image.fromURL(
      "https://diy-registration-and-ticketing.s3.ap-south-1.amazonaws.com/g/sample_qrcode.png",
      function (myImg) {
        var img1 = myImg.scale(0.5).set({ width: 300, height: 300 });
        let div = img1;
        div.id = name;
        let arr = canvas.getObjects()?.filter((obj) => obj?.id === name);
        if (!arr?.length) addToCanvas(div);
      }
    );
  };

  const addToCanvas = (div) => {
    canvas.add(div);
    canvas.setActiveObject(div);
    saveChanges();
  };

  const removeFromCanvas = (div) => {
    canvas.remove(div);
    saveChanges();
  };

  const saveChanges = () => {
    const json = canvas.toJSON();
    setCanvasJsonStr(json);
    const svgdata = canvas.toSVG();
    setCanvasSVG(svgdata);
  };

  const loadCanvas = () => {
    const savedJson = canvasJsonStr;
    canvas.loadFromJSON(savedJson, () => {
      canvas.renderAll();
    });
  };

  return {
    canvas,
    setCanvas,
    saveChanges,
    loadCanvas,
    addToCanvas,
    removeFromCanvas,
    addTextBox,
    addImageBox,
  };
};

export default useBadgeCreator;
