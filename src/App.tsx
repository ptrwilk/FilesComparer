import { useEffect, useRef, useState } from "react";
import MainComponent from "./MainComponent";
import { useEffectOnce } from "./Hooks/useEffectOnce";

function App() {
  const [externalSelectedItem, setExternalSelectedItem] = useState<
    string | undefined
  >();

  const fileNamesRef = useRef<string[]>([]);

  useEffectOnce(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setExternalSelectedItem((prev) => {
          const fileNames = fileNamesRef.current ?? [];
          var prevItemIndex = fileNames.findIndex((x) => x === prev) - 1;

          return prevItemIndex >= 0 ? fileNames[prevItemIndex] : prev;
        });
      } else if (event.key === "ArrowDown") {
        setExternalSelectedItem((prev) => {
          const fileNames = fileNamesRef.current ?? [];
          var nextItemIndex = fileNames.findIndex((x) => x === prev) + 1;

          return nextItemIndex < fileNames.length
            ? fileNames[nextItemIndex]
            : prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleSelectedItemChange = (item: string) => {
    setExternalSelectedItem(item);
  };

  const handleDrop = (fileNames: string[]) => {
    fileNamesRef.current = fileNames;
  };

  return (
    <div className="ml-auto mr-auto h-screen max-w-[1200px]">
      <div className="flex justify-between">
        <MainComponent
          externalSelectedItem={externalSelectedItem}
          onSelectedItemChange={handleSelectedItemChange}
          onDrop={handleDrop}
        />
        <MainComponent externalSelectedItem={externalSelectedItem} />
      </div>
    </div>
  );
}

export default App;
