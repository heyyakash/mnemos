import { Braces, Folder } from "lucide-react";
import React, { FC } from "react";
import { Badge } from "../ui/badge";

interface props{
    type: "file" | "folder",
    title: string
    language? : string
    mode? :"grid" | "list"
}

const FileCard: FC<props> = ({type, title, language,mode}) => {

    if(mode === "grid"){
        return(
            <div className="border-2 w-full gap-4 p-4 flex flex-col">
            <div className="w-full bg-secondary h-[40px] rounded-sm flex-hard-center">
              {type === "file" ? <Braces /> : <Folder />}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex-center justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>

              </div>

    
              <div className="mt-3 flex gap-2 ">
                <Badge className="self-start">CLI</Badge>
                <Badge className="self-start">Bash</Badge>
              </div>
            </div>
          </div>
        )
    }
  return (
  
      <div className="border-2 w-full gap-4 p-4 flex">
        <div className="w-[20%] bg-secondary rounded-sm flex-hard-center">
          {type === "file" ? <Braces /> : <Folder />}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            {language && <Badge variant={"outline"}>{language}</Badge>}
          </div>
          {/* <p className="text-xs">{new Date().toString()}</p> */}

          <p className="text-primary/50 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            excepturi odit est. Dolore, debitis?
          </p>

          <div className="mt-3 flex gap-2 ">
            <Badge className="self-start">CLI</Badge>
            <Badge className="self-start">Bash</Badge>
          </div>
        </div>
      </div>
    
  );
};

export default FileCard;
