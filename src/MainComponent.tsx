import { useEffect, useState } from "react";
import ListItems from "./ListItems";
import SVGUploader from "./SvgUploader";

interface IMainComponentProps {
  externalSelectedItem?: string;
  onSelectedItemChange?: (item: string) => void;
  onDrop?: (fileNames: string[]) => void;
}

const MainComponent: React.FC<IMainComponentProps> = ({
  externalSelectedItem,
  onSelectedItemChange,
  onDrop,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (externalSelectedItem === undefined) {
      return;
    }

    setSelectedFileName(externalSelectedItem);
  }, [externalSelectedItem]);

  const handleDrop = (fileNames: string[]) => {
    setFileNames(fileNames);
    onDrop?.(fileNames);
  };

  const handleSelectedItemChange = (item: string) => {
    setSelectedFileName(item);

    onSelectedItemChange?.(item);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <ListItems
        externalSelectedItem={externalSelectedItem}
        items={fileNames}
        onSelectedItemChange={handleSelectedItemChange}
      />
      <SVGUploader onDrop={handleDrop} selectedFileName={selectedFileName} />
    </div>
  );
};

export default MainComponent;
