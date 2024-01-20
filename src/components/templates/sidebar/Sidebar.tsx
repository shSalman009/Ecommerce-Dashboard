import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { sidebarItems } from "@/config/sidebar.config";
import { toggleSidebar } from "@/features/ui/uiSlice";
import useResponsive from "@/hooks/useResponsive";
import { useNavigate } from "react-router-dom";
import SidebarItemWithIcon from "./SidebarItemWithIcon";
import SidebarItemWithTitle from "./SidebarItemWithTitle";

function Sidebar() {
  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  const { larger } = useResponsive();

  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  const ItemsWithTitleAndIcon = sidebarItems.map((item) => (
    <SidebarItemWithTitle key={item.title} item={item} onClick={handleClick} />
  ));

  const ItemsWithIcon = sidebarItems.map((item) => (
    <SidebarItemWithIcon key={item.title} item={item} onClick={handleClick} />
  ));

  const SIDEBAR_WIDTH = larger.xxs ? 240 : "100%";
  const SIDEBAR_COLLAPSED_WIDTH = 80;

  const sidebarOpenStyle = {
    width: SIDEBAR_WIDTH,
    minWidth: SIDEBAR_WIDTH,
  };

  const sidebarClosedStyle = {
    width: SIDEBAR_COLLAPSED_WIDTH,
    minWidth: SIDEBAR_COLLAPSED_WIDTH,
  };

  return (
    <>
      {larger.md ? (
        <div style={isSidebarOpen ? sidebarOpenStyle : sidebarClosedStyle}>
          <div className="h-full flex flex-col justify-start items-start space-y-2 p-4 bg-background">
            {isSidebarOpen ? ItemsWithTitleAndIcon : ItemsWithIcon}
          </div>
        </div>
      ) : (
        <Sheet
          open={isSidebarOpen}
          onOpenChange={() => {
            dispatch(toggleSidebar());
          }}
        >
          <SheetContent className="p-0" side="left" style={sidebarOpenStyle}>
            <div className="h-full flex flex-col justify-start items-start space-y-2 p-4 bg-background">
              {ItemsWithTitleAndIcon}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

export default Sidebar;
