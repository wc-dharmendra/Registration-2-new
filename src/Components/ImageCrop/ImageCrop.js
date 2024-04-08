import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageCrop({ src, setCroppedImg }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const handleCropImage = useCallback(() => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImg(base64Image);
  }, [crop, image, setCroppedImg]);


  useEffect(() => {
    if (image) handleCropImage();
  }, [image, handleCropImage]);

  return (
    <ReactCrop
      crop={crop}
      onChange={(c) => setCrop(c)}
      onDragEnd={handleCropImage}
      keepSelection={true}
      aspect={1}
    >
      {/* {src ? <Image layout="fill" objectFit="cover" src={src} alt="crop" onLoad={({ target }) => setImage(target)} /> : null} */}
      {src ? <img layout="fill" style={{objectFit: "cover"}} src={src} alt="crop" onLoad={({ target }) => setImage(target)} /> : null}
    </ReactCrop>
  );
}
