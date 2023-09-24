import React, { useEffect, useState } from "react";

interface ISVGUploaderProps {
  selectedFileName?: string;
  onDrop?: (fileNames: string[]) => void;
}

type File = {
  dataURL: any;
  name: string;
  type: "svg" | "pdf";
};

const SVGUploader: React.FC<ISVGUploaderProps> = ({
  selectedFileName,
  onDrop,
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (selectedFileName === undefined) {
      return;
    }

    const file = files.find((f) => f.name === selectedFileName);

    if (file === undefined) {
      setFile(undefined);

      return;
    }

    if (file.type === "application/pdf") {
      setFile({ dataURL: file, name: file.name, type: "pdf" });
    } else {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setFile({ dataURL: event.target.result, name: file.name, type: "svg" });
      };

      reader.readAsDataURL(file);
    }
  }, [selectedFileName]);

  const handleDrop = (event: any) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files) as any[];

    setFiles(files);

    onDrop?.(files.map((f) => f.name));
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: "768px", height: "600px", border: "1px dashed black" }}
    >
      {file ? (
        <FileView file={file} />
      ) : (
        <p>Drag and drop a PDF/SVG files here</p>
      )}
    </div>
  );
};

const FileView = ({ file }: { file: File }) => (
  <div className="h-full">
    {file.type === "pdf" ? (
      <embed
        src={URL.createObjectURL(file.dataURL)}
        width="100%"
        height="100%"
      />
    ) : (
      <img src={file.dataURL} alt="Uploaded SVG" />
    )}

    <p>File Name: {file.name}</p>
  </div>
);

export default SVGUploader;
