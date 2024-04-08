import Utils from '@/Utils/Utils';
import React, { useState, useEffect, useRef } from 'react';
import Svg from '../../../public/Assets/Svg';
import Button from '../Button/Button';
import LinkModal from '../LinkModal/LinkModal';
import './TextEditor.module.css'

function TextEditor() {
  const [showAdd, setShowAdd] = useState(true);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false); // State to control the link modal
  const editorRef = useRef(null);
  const imageUploadRef = useRef(null);
  const dropDiscriptRef = useRef(null);
  const openDiscriptRef = useRef(null);

  function toggleToolbarVisibility() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let node = range.startContainer;

    while (node) {
      if (node === editor) {
        const textBeforeCursor = range.startOffset > 0 ? range.startContainer.textContent.substring(0, range.startOffset) : "";
        if (textBeforeCursor.trim() === "") {
          setShowAdd(true);
          return;
        }
      }
      node = node.parentNode;
    }
    // setShowAdd(false);
  }

  function applyHeading() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const heading = document.createElement('h1');
    heading.textContent = range.toString();
    if (!heading.textContent.trim()) {
      heading.innerHTML = '&#8203;'; // Insert zero-width space if no text
    }
    range.deleteContents();
    range.insertNode(heading);
    setShowToolbar(false);
    editorRef.current.focus(); // Focus on the editor input area after applying heading
  }

  function applySubheading() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const subheading = document.createElement('h2');
    subheading.textContent = range.toString();
    if (!subheading.textContent.trim()) {
      subheading.innerHTML = '&#8203;'; // Insert zero-width space if no text
    }
    range.deleteContents();
    range.insertNode(subheading);
    setShowToolbar(false);
    editorRef.current.focus(); // Focus on the editor input area after applying subheading
  }

  function applyBlockquote() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = range.toString();
    if (!blockquote.textContent.trim()) {
      blockquote.innerHTML = '&#8203;'; // Insert zero-width space if no text
    }
    range.deleteContents();
    range.insertNode(blockquote);

    // Intercept Enter key press to allow the cursor to move out of the blockquote
    editorRef.current.addEventListener('keydown', handleEnterKeyPress);
  }

  function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const currentNode = range.startContainer;
      const newNode = document.createElement('div');
      newNode.innerHTML = '&#8203;'; // Insert zero-width space
      range.insertNode(newNode);
      range.setStartAfter(newNode);
      range.setEndAfter(newNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  useEffect(() => {
    const handleBlockquoteMousedown = (event) => {
      event.preventDefault();
      const range = document.createRange();
      range.setStartAfter(event.target);
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    };

    const blockquote = editorRef.current.querySelector('blockquote');
    if (blockquote) {
      blockquote.addEventListener('mousedown', handleBlockquoteMousedown);
    }

    return () => {
      if (blockquote) {
        blockquote.removeEventListener('mousedown', handleBlockquoteMousedown);
      }
    };
  }, []);





  function insertLink() {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand('createLink', false, url);
    }
    setShowToolbar(false);
    editorRef.current.focus(); // Focus on the editor input area after inserting link
  }

  function insertButton() {
    const linkText = prompt("Enter the button text:");
    const linkUrl = prompt("Enter the URL:");
    if (linkText && linkUrl) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const button = document.createElement('a');
      button.href = linkUrl;
      button.textContent = linkText;
      button.className = 'insertButton'; // Add the class to the anchor tag
      button.contentEditable = false; // Make the anchor tag non-editable

      // Insert the button
      range.deleteContents();
      range.insertNode(button);

      // Create a new range and set it to the end of the button
      const newRange = document.createRange();
      newRange.setStartAfter(button);
      newRange.collapse(true);

      // Clear existing selection and set the new range
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    setShowToolbar(false);
    editorRef.current.focus(); // Focus on the editor input area after inserting link
  }




  function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      tooltip.style.display = 'block';
      tooltip.style.top = (rect.bottom - editorRect.top + scrollTop) + 'px'; // Position directly below the selected text
      tooltip.style.left = (rect.left - editorRect.left + scrollLeft) + 'px'; // Position the tooltip at the left edge of the selection
      tooltip.classList.add('show'); // Apply CSS class to show the tooltip
    } else {
      tooltip.style.display = 'none';
      tooltip.classList.remove('show'); // Remove CSS class to hide the tooltip
    }
  }


  function showTool() {
    setShowToolbar(true);

  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        editorRef.current.appendChild(img);
        setShowToolbar(false);
        editorRef.current.focus(); // Focus on the editor input area after inserting image
      };
      reader.readAsDataURL(file);
    }
    setShowToolbar(false);
  }

  useEffect(() => {
    document.addEventListener('selectionchange', toggleToolbarVisibility);
    document.addEventListener('mouseup', showTooltip);
    document.addEventListener('keyup', showTooltip); // Listen for keyup events
    return () => {
      document.removeEventListener('selectionchange', toggleToolbarVisibility);
      document.removeEventListener('mouseup', showTooltip);
      document.removeEventListener('keyup', showTooltip); // Remove the keyup event listener
    };
  }, []);

  useEffect(() => {
    Utils?.removeModal(dropDiscriptRef, openDiscriptRef, () => {
      setShowToolbar(false);
    });
  }, [dropDiscriptRef, openDiscriptRef]);



  return (
    <div className='relative'>
      <div className="absolute left-[-16px] top-[6px] cursor-pointer">
        {showAdd && (
          <Button id="addButton" type={'button'} className=""
            buttonRef={dropDiscriptRef}
            onClick={showTool}
          > {Svg().TextboxPlus}</Button>
        )}

        {showToolbar ? (<div id='toolbar' ref={openDiscriptRef} className="absolute boxShadow bg-[#fff] rounded-[10px] max-w-[220px] left-[14px] top-[34px] z-500 border z-10">
          <input type="text" placeholder="Search" className="rounded-t-[10px] text-[#131517] border-b border-b-[#EBECED] outline-none text-[14px] px-[12px] py-[6px]" />
          <ul className="" style={{ padding: '5px' }}>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={applyHeading}>{Svg().HeadingIcon} Heading</Button>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={applySubheading}>{Svg().SubHeadingIcon} Subheading</Button>
            <li type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => imageUploadRef.current.click()}>
              <input ref={imageUploadRef} type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
              <Button className='flex gap-1.5 w-full' onClick={() => imageUploadRef.current.click()}>{Svg().ImageIcon} Image</Button></li>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={applyBlockquote}>{Svg().BlockquoteIcon} Blockquote</Button>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => { document.execCommand('insertHorizontalRule'), setShowToolbar(false) }}>{Svg().DeviderIcon} Devider</Button>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => { document.execCommand('insertUnorderedList'), setShowToolbar(false) }}>{Svg().ListIcon} List</Button>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => { document.execCommand('insertOrderedList'), setShowToolbar(false) }}>{Svg().NumberListIcon} Numbered List</Button>
            <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => insertButton()}>{Svg().ButtonLink} Button</Button>
            {/* <Button type='button' className="hover:bg-[#f0f0f0] rounded-md text-[#131517] px-[8px] py-[4px] text-[14px] flex items-center gap-1.5 w-full" onClick={() => insertLink()}>Link</Button> */}
          </ul>
        </div>
        ) : null}
      </div>
      <div
        id="editor"
        ref={editorRef}
        className='textarea min-h-[150px]'
        contentEditable={true}
        onClick={() => setShowToolbar(false)} // Close toolbar on editor click
      ></div>

      {showLinkModal && (
        <LinkModal
          onLinkSubmit={insertLink}
          onClose={() => setShowLinkModal(false)}
        />
      )}

      <div id="tooltip">
        <div className='flex gap-1.5 items-center'>
          <button onClick={applyHeading}>{Svg().HeadingIcon}</button>
          <button onClick={applySubheading}>{Svg().SubHeadingIcon}</button>
          <button onClick={() => insertLink()}>{Svg().Link}</button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
