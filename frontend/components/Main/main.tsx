import React from "react";
import Files from "./Files";
import Viewer from "./Viewer";


const Main = () => {
  return (
    <div className="grid grid-cols-3  w-full">
        <Files />
        <Viewer />
    </div>
  );
};

export default Main;
