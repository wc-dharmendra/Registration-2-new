"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { QuillToolbar, modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Button from "@/Components/Button/Button";
import Svg from "../../../../public/Assets/Svg";

export default function EmailEditor({ placeHolder = "Add your custom message here.", value = "", onChange = () => { }, triggerAction = false }) {
  const quillRef = useRef();
  const [show, setShow] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if(!triggerAction){
      setShow(false)
    }
}, [triggerAction]);

  return (
    <div className="text-editor relative">
      <div className="absolute left-[-20px] top-2 z-10">
        <Button type={'button'} className="" onClick={(e) => { setShow(!show); }} > {Svg().TextboxPlus}</Button>
        <QuillToolbar show={show} quillRef={quillRef} setIsActivated={setIsActivated} />
      </div>
      <ReactQuill
        ref={quillRef}
        placeholder={placeHolder}
        theme="snow"
        modules={modules}
        // value={value}
        // formats={formats}
        defaultValue={value}
        onChange={(e) => {
          if (quillRef?.current) {
            const editor = quillRef?.current?.getEditor();
            const content = editor?.getContents();
            const isEmpty = content?.ops?.length === 1 && content?.ops?.[0]?.insert === '\n';
            // console.log(isEmpty, content?.ops, content?.ops?.length);
            if (isEmpty) {
              // If the block is empty, clear the editor content
              editor.deleteText(0, editor.getLength(), 'user');
              editor.format('header', false); // Remove the header format
              onChange('');
              setIsActivated(false);
            } else {
              onChange(e);
            }
          }
          setShow(false);
        }}
      />
    </div>
  );
}