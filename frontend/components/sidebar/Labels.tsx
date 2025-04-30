"use client";
import React from "react";
import SidebarCollapsible from "./SidebarCollapsible";
import { Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import userAtom from "@/atoms/user.atom";
import { useAtom } from "jotai";

export interface labelResponseObject {
    name: string,
    colour: string
}

export const fetchLabels = async () => {
    const data = await HTTPRequest("/label/user", {}, "GET")
    if(data?.response.success){
        return data.response.message
    }else{
        return []
    }
}


const Labels = () => {
    const [user, ] = useAtom(userAtom);
    
    const {data: labels} = useQuery<labelResponseObject[]>({queryKey:["labels"],queryFn:fetchLabels,  enabled : !!user})
    console.log("labels ", labels)
    return (
    <SidebarCollapsible title="Labels" icon = {<Tag />}>
        {labels?.map((obj, key) => {
            return(
                <div key = {key} className=" flex-center gap-2 pl-2 border-l-2 my-2 cursor-pointer">
                    <span className={`w-3 h-3 rounded-full`} style={{backgroundColor:obj.colour}}></span>
                    {obj.name}
                </div>
            )
        })}
    </SidebarCollapsible>
  );
};

export default Labels;
