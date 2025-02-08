import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

export function AppSidebar() {
    return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center flex-row gap-4 border-b-2">
        <div className="w-[50px] h-full bg-secondary flex items-center text-xl justify-center rounded-md">
          AS
        </div>
        <div>
          <h5 className="text-xl font-xl font-bold">Akash Sharma&apos;s</h5>
          <p>Workspace</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant={"secondary"}>Settings</Button>
        <Button variant={"destructive"}>Sign out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
