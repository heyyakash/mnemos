"use client"

import editorModeAtom from "@/atoms/editorMode.atom";
import { useAtom } from "jotai";
import React from "react";
import Editor from "./Editor";
import Content from "./Content";

const Viewer = () => {
  const [editorMode] = useAtom(editorModeAtom);
  if(editorMode) return <Editor />
  return <Content />
};

export default Viewer;
