"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface props {
  list : {name: string}[]
  title : string
  children?: React.ReactNode
}


const SidebarCollapsible: React.FC<props> = ({list, title, children}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <div className="flex items-center justify-between p-2">
        <h4 className=" font-medium flex gap-2 items-center text-md">
          {children}
          {title}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="w-[95%] ml-auto">
        {list.map((x) => {
          return(
            <div key = {x.name} className="rounded-sm my-1 border p-2 text-sm">
              {x.name}
          </div>
          )
        })}
      </CollapsibleContent>
    </Collapsible>
  )
}


export default SidebarCollapsible