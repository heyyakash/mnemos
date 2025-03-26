import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";

const BreadcrumbComponent = () => {
  const [breadCrumb] = useAtom(BreadCrumbAtom);
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg">
        {breadCrumb.map((link, index) => {
          return (
            <div key={index} className="flex-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink>{link.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
