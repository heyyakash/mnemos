"use client";
import { Braces, Folder } from "lucide-react";
import React, { FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import currentSnippetAtom from "@/atoms/currentSnippet";
import { File } from "@/types/file.type";

interface props {
  file: File
}

const FileCard: FC<props> = ({ file }) => {
  const [,setBreadCrumb ] = useAtom(BreadCrumbAtom)
  const [,setCurrentSnippet] = useAtom(currentSnippetAtom)

  const clickBehaviour = () => {
    if(file.folder){
      setBreadCrumb((breadCrumb) => [...breadCrumb, {id: file.id, name:file.name}])
    }else{
      if(file.snippet){
        setCurrentSnippet(file.snippet.id)
      }
      
    }
  }

  return (
    <TableRow onClick={()=>clickBehaviour()} className="cursor-pointer">
      <TableCell className="font-medium">
        {file.folder ? <Folder className="text-xs text-orange-500 h-4" /> : <Braces className="text-xs text-blue-500 h-4" />}
      </TableCell>
      <TableCell>{file.name}</TableCell>
      <TableCell className="max-w-[20ch] truncate">
        {file.description}
      </TableCell>
      <TableCell>{file.language || ""}</TableCell>
      <TableCell className="text-right">
        {new Date(file.createdAt * 1000).toUTCString().slice(0, 16)}
      </TableCell>
    </TableRow>
  );
};

export default FileCard;
