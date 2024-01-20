export interface SidebarItemsInterface {
  title: string;
  icon: React.ComponentType;
  path?: string;
  children?: {
    title: string;
    path: string;
  }[];
}
