import React, { useEffect } from "react";
import { fabric } from "fabric";
import useBadgeCreator from "@/CustomHook/FabricHook/useBadgeCreator";
import useBadgeCreatorStore from "@/Store/FabricBadge/useBadgeCreatorStore";


const ReusableBadgeCreator = ({ id, canvasWidth, canvasHeight, badgefieldsBtn, currentTab, imgSrc }) => {
  const { canvasJsonStr } = useBadgeCreatorStore();
  const {
    canvas,
    setCanvas,
    saveChanges,
    loadCanvas,
    removeFromCanvas,
    addTextBox,
    addImageBox,
  } = useBadgeCreator();

  const addDiv = async (name) => {
    if (canvas) {
      if (name === "QRCode") {
        addImageBox(name);
      } else {
        addTextBox(name);
      }
    }
  };

  const handleDeleteClick = (name) => {
    if (canvas) {
      let divToBeDeleted = canvas
        .getObjects()
        ?.filter((obj) => obj?.id === name);

      if (divToBeDeleted) {
        removeFromCanvas(divToBeDeleted[0]);
      }
    }
  };

  const handleAddClick = (name) => {
    // if (!checkIfFieldExists(name)) {
    addDiv(name);
    // }
  };

  useEffect(() => {
    const addBtns = document.querySelectorAll("button[id^=addButton]");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleAddClick(btn?.id?.split("-")[1]);
      });
    });

    const deleteBtns = document.querySelectorAll("button[id^=deleteButton]");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        handleDeleteClick(btn?.id?.split("-")[1]);
      });
    });

    if (canvasJsonStr && canvas) {
      loadCanvas();
    }

    if (canvas) {
      canvas.on("object:modified", saveChanges);
    }

    return () => {
      if (addBtns) {
        addBtns.forEach((btn) => {
          btn.removeEventListener("click", () => {
            handleAddClick(btn?.id?.split("-")[1]);
          });
        });
      }

      if (deleteBtns) {
        deleteBtns.forEach((btn) => {
          btn.removeEventListener("click", () => {
            handleDeleteClick(btn?.id?.split("-")[1]);
          });
        });
      }
    };
  }, [canvas, badgefieldsBtn, currentTab]);

  useEffect(() => {
    const mycanvas = new fabric.Canvas(id, {
      width: canvasWidth,
      height: canvasHeight,
    });
    const imageURL = imgSrc;
    // Load the image and add it to the canvas as a background
    fabric.Image.fromURL(imageURL, function (img) {
      // Set the image as a background
      mycanvas.setBackgroundImage(img, mycanvas.renderAll.bind(mycanvas), {
        // Adjust options as needed
        scaleX: mycanvas.width / img.width,
        scaleY: mycanvas.height / img.height,
        top: 0,
        left: 0,
        selectable: false, // Make background image not selectable
        evented: false // Make background image not trigger events
      });
    });
    setCanvas(mycanvas);
  }, [imgSrc]);

  return (
    <div style={{ textAlign: "center", maxWidth: "4in" }}>
      <div>
        <canvas
          id={id}
          style={{
            border: "1px solid #ccc",
            margin: "0 auto"
          }}
        ></canvas>
        <img id="previewImage" src="" alt="Preview Image"></img>
      </div>
    </div>
  );
};

export default ReusableBadgeCreator;
