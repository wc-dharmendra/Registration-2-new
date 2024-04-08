import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "../Button/Button";
import Svg from "../../../public/Assets/Svg";
import Input from "../InputForm/InputForm";
import useCommonStore from "@/Store/useCommonStore";

const ReOrder = ({
  children,
  onPosChange = null,
  items = [],
  keyId = "",
  label = "",
  deleteBtn = true,
  onEdit = () => {},
  handleDelete = () => {},
}) => {
  const { isLoading } = useCommonStore();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    if (onPosChange) onPosChange(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable
                key={item[keyId]}
                draggableId={item[keyId]}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    ref={draggableProvided.innerRef}
                  >
                    {/* {children} */}

                    <div className="flex gap-2 pt-1.5 pb-1.5 items-center">
                      
                      <div className="question grow flex items-center gap-2">
                        <div className="drag pr-1">{Svg().Drag}</div>
                        <Input
                          inputCls="input w-full"
                          readOnly
                          placeholder={item[label]}
                        />
                      </div>
                      {item["isCustomField"] ||
                      item["field_type"] === "custom" || deleteBtn ? (
                        <div className="w-[55px] gap-1 flex items-center justify-end">
                          {item["isCustomField"] ||
                          item["field_type"] === "custom" ? (
                            <Button
                              onClick={() => onEdit([item])}
                              className="p-[6px]"
                              type="button"
                            >
                              {Svg().EditPencil}
                            </Button>
                          ) : null}
                          {deleteBtn ? (
                            <Button
                              showLoader={false}
                              type="button"
                              disabled={isLoading}
                              className="p-[6px] pr-0"
                              onClick={() => {
                                handleDelete([item]);
                              }}
                            >
                              {Svg().Delete}
                            </Button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReOrder;
