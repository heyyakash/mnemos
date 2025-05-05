"use client";
import React from "react";
import SidebarCollapsible from "./SidebarCollapsible";
import { Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import userAtom from "@/atoms/user.atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { Label } from "@/types/label.type";



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
    
    const {data: labels} = useQuery<Label[]>({queryKey:["labels"],queryFn:fetchLabels,  enabled : !!user})
    console.log("labels ", labels)
    return (
    <SidebarCollapsible title="Labels" icon = {<Tag />}>
        {labels?.map((obj, key) => {
            return(
                <Link href = {`/store/label/${obj.id}`} key = {key} className=" flex-center gap-2 p-2 border-l-2 my-2 cursor-pointer hover:bg-background">
                    <span className={`w-3 h-3 rounded-full`} style={{backgroundColor:obj.colour}}></span>
                    {obj.name}
                </Link>
            )
        })}
    </SidebarCollapsible>
  );
};

export default Labels;
