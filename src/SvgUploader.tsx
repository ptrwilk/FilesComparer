import React, { useState } from "react";

const SVGUploader = () => {
  const [svg, setSVG] = useState({ dataURL: null, fileName: null });
  const [files, setFiles] = useState<any[]>([]);

  const handleDrop = (event: any) => {
    event.preventDefault();

    setFiles(event.dataTransfer.files);
    //const file = event.dataTransfer.files[0];
    // const reader = new FileReader();

    // reader.onload = (event: any) => {
    //   setSVG({ dataURL: event.target.result, fileName: file.name });
    // };

    // reader.readAsDataURL(file);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: "300px", height: "300px", border: "1px dashed black" }}
    >
      {svg.dataURL ? (
        <div>
          <img src={svg.dataURL} alt="Uploaded SVG" />
          <p>File Name: {svg.fileName}</p>
        </div>
      ) : (
        <p>Drag and drop an SVG file here</p>
      )}
    </div>
  );
};

export default SVGUploader;
