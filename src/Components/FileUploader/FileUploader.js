import React, { useState, useEffect, Fragment, useRef } from "react";
import Svg from "../../../public/Assets/Svg";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import ImageCrop from "../ImageCrop/ImageCrop";
import CropImgPopup from "../ImageCrop/CropImgPopup";
import useEventStore from "@/Store/useEventStore";

const FileUploader = ({
  setIsImgSelected = null,
  avatar = "",
  onSuccess = null,
  accept = ".jpeg,.png,.jpg,.webp",
  allowedExtensions = ["jpeg", "png", "jpg", "webp"],
  cropImage = false,
  id = "file-upload",
  multiple = false,
  cls = "",
  imgCls = "",
  cb = () => {},
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [open, setOpen] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);
  const [imgToCrop, setImgToCrop] = useState("");
  const [progress, setProgress] = useState("");
  const mulFiles = useRef([]);
  const fileToUpload = useRef(0);

  const { setIsEventUpdated } = useEventStore();

  const handleMultipleFiles = (files = mulFiles.current) => {
    const fileList = Object.values(files);
    const filterFileSize = fileList.filter(
      (elem) => elem?.size <= Utils?.multiFileSize * 1024 * 1024
    );
    const maxFileSize = fileList.filter(
      (elem) => elem?.size > Utils?.multiFileSize * 1024 * 1024
    );
    const invalidFiles = [];

    for (let i = 0; i < filterFileSize.length; i++) {
      const file = filterFileSize[i];
      const fileExtension = Utils?.getFileExtension(file.name);
      if (!allowedExtensions.includes(fileExtension)) {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      ShowToast({
        message: `Only ${allowedExtensions.toString()} are allowed.`,
        variant: "error",
      });
    }

    const validFiles = filterFileSize.filter((file) => {
      const fileExtension = Utils?.getFileExtension(file.name);
      return allowedExtensions.includes(fileExtension);
    });

    if (validFiles.length > 0) {
      if (!mulFiles.current.length) mulFiles.current = validFiles;
      let remFiles = [...mulFiles.current];
      uploadFile(
        remFiles.shift(),
        ++fileToUpload.current,
        Utils?.multiFileSize
      );
      mulFiles.current = remFiles;
    }

    setTimeout(() => {
      if (maxFileSize.length > 0) {
        maxFileSize.map((e) => {
          setTimeout(() => {
            ShowToast({
              message: `Files can be uploaded, with up to ${Utils?.multiFileSize} MB size.`,
              variant: "error",
            });
          }, 100);
        });
      }
    }, 500);
  };

  const handleFiles = (files) => {
    if (files) {
      let fileSize = files.size;
      let sizeInMB = fileSize / (1024 * 1024);
      if (sizeInMB > Utils?.singleFileSize) {
        ShowToast({
          message: `Files can be uploaded, with up to ${Utils?.singleFileSize} MB size.`,
          variant: "info",
        });
        return;
      }
    }
    uploadFile(files);
    setSelectedFile(files);
    setIsEventUpdated(false);
  };

  const uploadFile = async (file) => {
    if (file) {
      if (cb) cb(file);
    }
  };

  const onConfirmRemoveFiles = () => {
    if (open) {
      removeFiles();
    } else {
      setOpen(true);
    }
  };

  const removeFiles = (e) => {
    if (onSuccess) {
      onSuccess({});
    }
    setProgress("");
    setSelectedFile();
    setPreview("");
    setOpen(false);
    if (setIsImgSelected) setIsImgSelected(false);
    document.getElementById(id).value = "";
  };

  const onImgErr = (e) => {
    // e.target.src = DefaultImg;
  };

  const isFileValid = (files) => {
    const fileData = files;
    const fileExtension = Utils?.getFileExtension(fileData?.name);
    if (!allowedExtensions.includes(fileExtension)) {
      ShowToast({
        message: `Only ${allowedExtensions
          .toString()
          .replace(",", " ,")} files are allowed.`,
        variant: "error",
      });
      return false;
    } else if (fileData?.size > Utils?.singleFileSize5 * 1024 * 1024) {
      ShowToast({
        message: `Files can be uploaded, with up to ${Utils?.singleFileSize} MB size.`,
        variant: "error",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleGetImage = (files) => {
    if (files?.[0]) {
      if (isFileValid(files[0])) {
        setProgress("");
        if (cropImage) setImgToCrop(URL.createObjectURL(files[0]));
        else handleFiles(files[0]);
      }
      const fileInput = document.getElementById(id);
      // Clear the value of the file input
      fileInput.value = "";
    }
  };

  const handleCropImage = async () => {
    let blob = await fetch(croppedImg);
    blob = await blob.blob();
    handleFiles(blob);
    setIsBtnDisabled(true);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      if (setIsImgSelected) setIsImgSelected(false);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    if (setIsImgSelected) setIsImgSelected(true);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, setIsImgSelected]);

  useEffect(() => {
    if (avatar) {
      setPreview(avatar);
      if (setIsImgSelected) setIsImgSelected(true);
    }
  }, [avatar, setIsImgSelected]);

  return (
    <Fragment>
      {!imgToCrop ? (
        <input
          encType="multipart/form-data"
          id={id}
          className={cls}
          type="file"
          multiple={multiple}
          onChange={(e) =>
            (multiple ? handleMultipleFiles : handleGetImage)(e.target.files)
          }
          accept={accept}
        />
      ) : null}
      {(progress !== "100%" && progress !== "") || isBtnDisabled ? (
        <>
          {" "}
          <div className="loading-file-percentage">
            <div
              className={`flex gap-2 inline-block w-4 h-4 rounded-full border-2 border-[rgba(255,255,255,0.5)] border-[2px] border-t-[#fff] animate-spin`}
            ></div>
            <div className="loading-percentage">{/* {`${progress}`} */}</div>
          </div>
        </>
      ) : null}
      {(progress !== "100%" && progress !== "") || isBtnDisabled ? (
        <>
          {" "}
          <div className="loading-file-percentage">
            <div
              className={`flex gap-2 inline-block w-4 h-4 rounded-full border-2 border-[rgba(255,255,255,0.5)] border-[2px] border-t-[#fff] animate-spin`}
            ></div>
            <div className="loading-percentage">{/* {`${progress}`} */}</div>
          </div>
        </>
      ) : null}
      <CropImgPopup
        onClose={() => {
          setImgToCrop("");
          setIsBtnDisabled(false);
        }}
        openModal={imgToCrop}
        onClickChange={() => {
          setImgToCrop(null);
          setTimeout(() => {
            document.getElementById(id)?.click();
          }, 10);
        }}
        onClickCrop={handleCropImage}
        disabled={isBtnDisabled}
      >
        <ImageCrop src={imgToCrop} setCroppedImg={setCroppedImg} />
      </CropImgPopup>

      <div className={imgCls}>
        <div className="MidSelecetd">
          {(selectedFile && selectedFile?.type?.includes("image")) || avatar ? (
            preview && (
              <img
                className="w-[100px] h-[100px] object-cover object-center"
                height={100}
                width={100}
                onError={onImgErr}
                src={preview}
                alt=""
              />
            )
          ) : selectedFile && selectedFile?.type?.includes("text") ? (
            <div className="UploadDocx">{selectedFile?.name}</div>
          ) : null}
          {/* {(selectedFile || preview) ? <img  loading="lazy"  src={preview} /> : null} */}
          {(selectedFile || preview) && !isBtnDisabled ? (
            <div className="ImgActionUp">
              {/* <button
                type="button"
                onClick={() => {
                  removeFiles();
                  document.getElementById(id)?.click();
                }}
                className="EditImgBtn"
              >
                {Svg().EditPencil}
              </button> */}
              {!cropImage ? (
                <button
                  disabled={isBtnDisabled}
                  onClick={onConfirmRemoveFiles}
                  className="RemoveImgBtn"
                >
                  {Svg().DeleteIcon}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default FileUploader;
