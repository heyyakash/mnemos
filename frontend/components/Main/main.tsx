import React from "react";
import Files from "./Files";
import Content from "./Content";


const Main = () => {
  return (
    <div className="grid grid-cols-3  w-full">
        <Files />
        <Content />
    </div>
  );
};

export default Main;
