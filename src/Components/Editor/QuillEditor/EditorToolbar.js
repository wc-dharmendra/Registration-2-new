import React, { useEffect, useRef } from "react";
import { Quill } from "react-quill";
import Svg from "../../../../public/Assets/Svg";
import { onFileUpload } from "@/Api/OnDataSend";
import ShowToast from "@/Toaster/Toaster";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = [
    "extra-small",
    "small",
    "medium-size",
    "large",
    "extra-large",
    "huge",
];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
];
Quill.register(Font, true);



// ********************************************* SPELL CHECK ISSUE  ************************************************************

const Inline = Quill.import('blots/inline');

class CustomColor extends Inline {
    constructor(domNode, value) {
        super(domNode, value);

        // Map <font> properties
        domNode.style.color = domNode.color;

        const span = this.replaceWith(new Inline(Inline.create()));

        span.children.forEach(child => {
            if (child.attributes) child.attributes.copy(span);
            if (child.unwrap) child.unwrap();
        });

        this.remove();

        return span;
    }
}

CustomColor.blotName = "customColor";
CustomColor.tagName = "FONT";

Quill.register(CustomColor, true);

// ********************************************* SPELL CHECK ISSUE  ************************************************************

// ******************************************** HORIZONTAL LINE ***************************************
// Custom blot definition
const BlockEmbed = Quill.import('blots/block/embed');

class HorizontalLineBlot extends BlockEmbed {
    static create() {
        const node = super.create();
        node.innerHTML = '<hr>';
        return node;
    }
}

HorizontalLineBlot.blotName = 'hr';
HorizontalLineBlot.tagName = 'hr';

Quill.register(HorizontalLineBlot);

// ******************************************** HORIZONTAL LINE ***************************************

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: "#toolbar",
        // handlers: {
        //     undo: undoChange,
        //     redo: redoChange,
        // },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
];

// Quill Toolbar component
export const QuillToolbar = ({ quillRef, show = false, setIsActivated }) => {
    const fileInputRef = useRef();
    const editor = quillRef?.current?.getEditor();
    const range = editor?.getSelection(true);

    const applyFormat = (format, value = null) => {
        // console.log(editor)
        setIsActivated(true);
        if (format === "button") {
            let linkText = prompt("Enter the button text:");
            let linkUrl = '';
            if (linkText) {
                linkUrl = prompt("Enter the URL:")
            }

            if (linkText && linkUrl) {
                const button = document.createElement('a');
                button.href = linkUrl;
                button.className = 'insertButton';
                // button.classList = 'editor-button';
                button.textContent = linkText;
                button.style.color = "#fff";
                button.style.backgroundColor = "#333537";
                button.style.fontWeight = "500";
                button.style.borderRadius = "8px";
                button.style.padding = "8px 20px";
                button.style.margin = "auto";
                button.style.display = "inline-block";
                button.style.textAlign = "center";
                button.style.width = "fit-content";
                button.style.cursor = "pointer";
                button.style.textDecoration = "none";
                button.contentEditable = false; // Make the anchor tag non-editable
                editor.insertEmbed(range.index, button, linkUrl);
                editor.setSelection(range.index + 1, 0);
            }
        } else if (format === "blockquote" || format === "hr") {
            // editor.insertEmbed("current", format, "");
            // editor.insertText(range.index, '\n', 'user'); // Insert a new line
            // editor.insertEmbed(range.index + 1, format, true, 'user'); // Insert a horizontal line
            if (format === "hr") {
                editor.insertText(range.index, '\n', 'user'); // Insert a new line
                editor.insertEmbed(range.index + 1, format, true, 'user');
                // Move cursor down after horizontal line
                editor.setSelection(range.index + 2, 0);
            } else {
                const content = editor?.getContents();
                const isEmpty = content?.ops?.length === 1 && content?.ops?.[0]?.insert === '\n';
                editor.insertEmbed(range.index, format, true, 'user');
                editor.setSelection(range.index + 1, 0);
            }
        } else if (value !== null) {
            editor.format(format, value);
        } else {
            editor.format(format);

        }
        // editor.setSelection(editor.getLength());
        // editor.insertText(length, '\n', 'user');
    };

    const insertLink = () => {
        const url = prompt('Enter link URL:');
        if (url) {
            const range = editor?.getSelection(true);
            editor.insertText(range?.index, url, 'link', url);
            editor.setSelection(editor.getLength());
            // editor.insertText(editor.getLength(), '\n', 'user');
        }
    };

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append("media", file);
            formData.append("type", "image");
            const res = await onFileUpload("uploadMedia", formData);
            if (res?.success) {
                if (res?.data?.response?.url) {
                    setTimeout(() => {
                        const url = res?.data?.response?.url
                        const range = editor?.getSelection();
                        editor.insertEmbed(range?.index, 'image', url, 'user');
                        editor.setSelection(editor.getLength());
                        const images = document.querySelectorAll('img');
                        images.forEach(img => {
                            img.setAttribute('loading', 'lazy');
                            img.style.maxWidth = "100%";
                        });
                        // editor.insertText(editor.getLength(), '\n', 'user');
                    }, 1000);
                }
            } else if (!res?.success && res?.errors?.media?.length) {
                ShowToast({
                    message: res?.errors?.media?.toString(),
                    variant: "error",
                });
            }
        }
        const fileInput = document.getElementById('fileUploader');
        // Clear the value of the file input
        fileInput.value = '';
    };

    useEffect(() => {
        if (quillRef?.current) {
            // Add a handler for the paste event
            editor?.container?.addEventListener('paste', (event) => {
                // Prevent the default paste behavior
                event.preventDefault();
                // Get the clipboard data
                const clipboardData = (event.originalEvent || event).clipboardData;
                const text = clipboardData.getData('text/plain');
                // Wrap the pasted content in a blockquote
                const formattedText = `<blockquote>${text}</blockquote>`;
                // Insert the formatted content at the current cursor position
                const selection = editor.getSelection();
                editor.clipboard.dangerouslyPasteHTML(selection?.index, formattedText, 'user');
            });
        }
    }, []);

    return (
        <div id="toolbar" style={{ display: show ? 'block' : 'none' }} className="editor-toolbar h-[150px] overflow-auto w-[175px]">
            <div style={{ display: show ? 'block' : 'none' }}>
                <button className="ql-header1" onClick={() => applyFormat('header', 1)}>{Svg().HeadingIcon} Heading</button>
                <button className="ql-header2" onClick={() => applyFormat('header', 2)}>{Svg().SubHeadingIcon} Subheading</button>
                <input id="fileUploader" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
                <button className="ql-image1" onClick={() => fileInputRef.current.click()}>{Svg().ImageIcon} Image</button>
                <button className="ql-blockquot" onClick={() => applyFormat('blockquote')}>{Svg().BlockquoteIcon} Blockquote</button>
                <button className="ql-divider" onClick={() => applyFormat('hr')}>{Svg().DeviderIcon} Divider</button>
                <button className="ql-list1" onClick={() => applyFormat('list', 'unordered')}>{Svg().ListIcon} List</button>
                <button className="ql-list2" onClick={() => applyFormat('list', 'ordered')}>{Svg().NumberListIcon} Numbered List</button>
                <button className="ql-button" onClick={() => applyFormat('button')}>{Svg().ButtonLink} Button</button>
                <button className="ql-link1" onClick={insertLink}>{Svg().Link} Link</button>



                {/* <span className="ql-formats">
            <select className="ql-font">
                <option value="arial">Arial</option>
                <option value="comic-sans">Comic Sans</option>
                <option value="courier-new">Courier New</option>
                <option value="georgia">Georgia</option>
                <option value="helvetica">Helvetica</option>
                <option value="lucida">Lucida</option>
            </select>

            <select className="ql-size" defaultValue="medium">
                <option value="extra-small">12px</option>
                <option value="small">14px</option>
                <option value="medium-size">18px</option>
                <option value="large">20px</option>
                <option value="extra-large">24px</option>
                <option value="huge">28px</option>
            </select>

            <select className="ql-header" defaultValue="3">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="3">Normal</option>
            </select>
        </span> */}
                {/* <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
        </span>
        <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
        </span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
        </span>
        <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
        </span>
        <span className="ql-formats">
            <button className="ql-undo">
                <CustomUndo />
            </button>
            <button className="ql-redo">
                <CustomRedo />
            </button>
        </span> */}
            </div>
        </div>
    )
};

export default QuillToolbar;