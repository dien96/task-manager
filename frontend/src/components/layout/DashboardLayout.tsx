import { UserContext } from "@/context/UserContext";
import { useContext, type ReactNode } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

interface DashboardLayoutProps {
  children: ReactNode;
  activeMenu: string;
}

const DashboardLayout = ({ children, activeMenu }: DashboardLayoutProps) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
