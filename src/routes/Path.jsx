import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path={"/*"} element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
