import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import SidebarCollapsible from "./sidebar/SidebarCollapsible";
import { Archive, Home, Languages, Tag } from "lucide-react";

export function AppSidebar() {
  const labels = [
    {
      name: "Script",
      // colour: "#231231",
    },
    {
      name: "General",
      // colour: "#231231",
    },
    {
      name: "Web",
      // colour: "#231231",
    },
    {
      name: "cli",
      // colour: "#231231",
    },
  ];
  const language = [
    {
      name: "Python",
    },
    {
      name: "Typescript",
    },
    {
      name: "Java",
    },
    {
      name: "Bash",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center h-[80] flex-row gap-4 border-b-2">
        <div className="w-[50px] h-full bg-secondary flex items-center text-xl justify-center rounded-md">
          AS
        </div>
        <div>
          <h5 className="text-xl font-xl font-bold">Akash Sharma&apos;s</h5>
          <p>Workspace</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <div className="w-full cursor-pointer p-2 flex items-center gap-2 text-md hover:bg-secondary rounded-sm">
              <Home /> Home
            </div>
            <div className="w-full cursor-pointer p-2 flex items-center gap-2 text-md hover:bg-secondary rounded-sm">
            <Archive /> Archived
            </div>
            <SidebarCollapsible title="Labels" list={labels}>
              <Tag />
            </SidebarCollapsible>
            <SidebarCollapsible title="Languages" list={language}>
              <Languages />
            </SidebarCollapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant={"secondary"}>Settings</Button>
        <Button variant={"destructive"}>Sign out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
