import { SideBar } from "@/modules";

import type { ReactNode } from "react";

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <SideBar>{children}</SideBar>;
};

export default MainLayout;
