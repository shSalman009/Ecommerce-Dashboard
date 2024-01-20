import { useAppDispatch } from "@/app/hooks";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { toggleSidebar } from "@/features/ui/uiSlice";
import { Menu, Moon } from "lucide-react";
import { UserNav } from "./UserNav";

function Header() {
  const dispatch = useAppDispatch();

  const handleSidebarCollapsed = () => {
    dispatch(toggleSidebar());
  };

  const { setTheme, theme } = useTheme();

  return (
    <>
      <header className="w-full h-full rounded flex items-center justify-between p-4 bg-background">
        <div className="flex items-center">
          <Button
            onClick={handleSidebarCollapsed}
            size="icon"
            variant="outline"
          >
            <Menu className="h-5 w-5 dark:text-white" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h1 className="ml-6 text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size="icon"
            variant="ghost"
            className="rounded-full"
          >
            <Moon className="h-6 w-6 dark:text-white" />
            <span className="sr-only">Toggle Dark Mode</span>
          </Button>

          {/* <ModeToggle /> */}

          <UserNav />
        </div>
      </header>
    </>
  );
}

export default Header;
