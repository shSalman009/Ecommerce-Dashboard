import { SidebarItemsInterface } from "@/types/sidebar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface SidebarItemWithTitleProps {
  onClick: (path: string) => void;
  item: SidebarItemsInterface;
}

interface SimpleSidebarItemProps {
  IconComponent: React.ComponentType;
  title: string;
  path?: string;
  onClick: (path: string) => void;
}

interface CollapsibleSidebarItemProps {
  children: {
    title: string;
    path: string;
  }[];
  title: string;
  onClick: (path: string) => void;
  IconComponent: React.ComponentType;
}

export default function SidebarItemWithTitle({
  item: { title, path, children, icon: IconComponent },
  onClick,
}: SidebarItemWithTitleProps) {
  return (
    <>
      {children ? (
        <CollapsibleSidebarItem
          IconComponent={IconComponent}
          title={title}
          children={children}
          onClick={onClick}
        />
      ) : (
        <SimpleSidebarItem
          IconComponent={IconComponent}
          title={title}
          path={path}
          onClick={onClick}
        />
      )}
    </>
  );
}

function SimpleSidebarItem({
  title,
  IconComponent,
  path = "",
  onClick,
}: SimpleSidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => onClick(path)}
      className={`flex justify-start items-center rounded w-full cursor-pointer select-none ${
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <div className="p-2">
        <IconComponent />
      </div>
      <h6 className="ml-2 text-sm py-2">{title}</h6>
    </div>
  );
}

function CollapsibleSidebarItem({
  children,
  title,
  IconComponent,
  onClick,
}: CollapsibleSidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const location = useLocation();

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-start items-center rounded w-full hover:bg-accent hover:text-accent-foreground cursor-pointer select-none mb-1"
      >
        <div className="p-2">
          <IconComponent />
        </div>
        <h6 className="ml-2 text-sm py-2">{title}</h6>

        <ChevronDown
          className="inline-block ml-auto transition-transform mr-2"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          size={15}
          strokeWidth={3}
        />
      </button>
      <div
        className={`${
          !isExpanded ? "max-h-0" : "max-h-60"
        } transition-[max-height] overflow-hidden w-full pl-8 space-y-1`}
      >
        {children.map((child) => {
          const isActive = location.pathname === child.path;
          return (
            <div
              key={child.path}
              onClick={() => onClick(child.path)}
              className={`flex justify-start items-center rounded w-full cursor-pointer select-none ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <h6 className="ml-2 text-sm py-2">{child.title}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
