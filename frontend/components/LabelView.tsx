"use client";

import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import { Label } from "@/types/label.type";
import FileList from "./Main/FileList";
import { File } from "@/types/file.type";

const LabelView = () => {
    const path = useParams()
    const getLabelDetails = async () =>  {
        const id = path.id
        const data = await HTTPRequest(`/label/${id}`,{}, "GET")
        if(data?.response.success){
            return data.response.message
        }else{
            return null
        }
    }

    const getFilteredSnippets = async () => {
        const id = path.id
        const data = await HTTPRequest(`/file/label/${id}`,{},"GET")
        if(data?.response.success){
            return data.response.message
        }else{
            return null
        }
    }

    const {data: labelDetails} = useQuery<Label>({queryKey : [`label-${path.id}`], enabled:!!path?.id, queryFn: getLabelDetails})
    const {data: files, isLoading: filesIsLoading} = useQuery<File[]>({queryKey:[`label-snippets-${path.id}`], enabled: !!path?.id, queryFn: getFilteredSnippets})


  return (
    <div className="col-span-1  border-r">
      <div className="p-4 flex items-center h-[80px] flex-row gap-4 border-b">
        <SidebarTrigger />
        <Separator className="-ml-2" orientation="vertical" />
        {labelDetails?.name}
      </div>
      <div>
        <FileList list={files} isLoading = {filesIsLoading} />
      </div>
    </div>
  );
};

export default LabelView;
