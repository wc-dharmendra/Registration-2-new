import React, { useEffect } from "react";
import { fabric } from "fabric";
import useBadgeCreatorStore from "@/Store/useBadgeCreatorStore";
import useBadgeCreator from "@/CustomHook/useBadgeCreator";

const BadgeCreator = ({ id, canvasWidth, canvasHeight, badgefieldsBtn ,currentTab}) => {
  const { checkIfFieldExists, canvasJsonStr } = useBadgeCreatorStore();
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
  }, [canvas, badgefieldsBtn,currentTab]);

  useEffect(() => {
    const mycanvas = new fabric.Canvas(id, {
      width: canvasWidth,
      height: canvasHeight,
    });
    setCanvas(mycanvas);
  }, []);

  return (
    <div style={{ textAlign: "center", maxWidth: "4in" }}>
      <img width={"100%"} src="./Assets/Images/badgeInfo.jpg"></img>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <canvas
          id={id}
          style={{
            border: "1px solid #ccc",
            margin: "0 auto",
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default BadgeCreator;
