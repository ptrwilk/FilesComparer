import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SVGUploader from "./SvgUploader";
import ListItems from "./ListItems";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{}}>
      <ListItems />
      <SVGUploader />
    </div>
  );
}

export default App;
