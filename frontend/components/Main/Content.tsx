import { Archive, EllipsisVertical, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Content = () => {
  return (
    <div className="col-span-2">
      <div className="p-4 flex  items-center h-[80px] flex-row gap-4 border-b-2">
        <div className="flex gap-2">
          <Button variant={"ghost"} className="h-10 w-10">
            <Archive />
          </Button>
          <Button variant={"ghost"} className="h-10 w-10">
            <Trash2 />
          </Button>
        </div>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>

                <EllipsisVertical />

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Content;
