import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarItemsInterface } from "@/types/sidebar";
import { useLocation } from "react-router-dom";

interface SidebarItemWithIconProps {
  onClick?: (path: string) => void;
  item: SidebarItemsInterface;
}

interface ItemWithIconProps {
  IconComponent: React.ComponentType;
  path?: string;
  onClick?: (path: string) => void;
}

interface ItemWithChildrenProps {
  children: {
    title: string;
    path: string;
  }[];
  IconComponent: React.ComponentType;
  onClick?: (path: string) => void;
}

export default function SidebarItemWithIcon({
  item,
  onClick,
}: SidebarItemWithIconProps) {
  return (
    <>
      {item && item.children ? (
        <ItemWithChildren
          children={item.children}
          IconComponent={item.icon}
          onClick={onClick}
        />
      ) : (
        <ItemWithIcon
          IconComponent={item.icon}
          onClick={onClick}
          path={item.path}
        />
      )}
    </>
  );
}

function ItemWithIcon({
  IconComponent,
  path = "",
  onClick,
}: ItemWithIconProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => onClick && onClick(path)}
      className={`p-2 rounded cursor-pointer select-none ${
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <IconComponent />
    </div>
  );
}

function ItemWithChildren({
  children,
  IconComponent,
  onClick,
}: ItemWithChildrenProps) {
  const location = useLocation();
  const isActive = children.some((item) => item.path === location.pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={`p-2 rounded cursor-pointer select-none ${
            isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <IconComponent />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={15}>
        {children?.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <DropdownMenuItem
              className={`${
                isActive ? "bg-accent text-accent-foreground" : ""
              }`}
              key={item.title}
              onClick={() => onClick && onClick(item.path)}
            >
              <span className="inline-block font-semibold text-sm select-none">
                {item.title}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
