import { LucideIcon } from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function NavigationItem({
  icon: Icon,
  label,
  onClick,
}: NavigationItemProps) {
  const { isCollapsed } = useSidebar();

  return (
    <button
      onClick={onClick}
      className={`flex items-center text-white hover:text-white transition-colors w-full py-2 px-4 rounded-lg hover:bg-gray-800 ${
        isCollapsed ? "justify-center" : "space-x-2"
      }`}
    >
      <Icon size={20} />
      <span
        className={`transition-opacity duration-200 ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
