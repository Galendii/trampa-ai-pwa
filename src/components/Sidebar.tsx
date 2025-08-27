import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  HandshakeIcon,
  LayoutDashboard,
  LogOut,
  LucideProps,
  Menu,
  MenuIcon,
  Settings,
  Users,
} from "lucide-react";

import { useProfessionalStore } from "@/stores/useProfessionalStore";

type SidebarLinkProps = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  text: string;
  isCollapsed: boolean;
  href: string;
};

// --- Sub-component for individual sidebar links ---
const SidebarLink = ({
  icon: Icon,
  text,
  isCollapsed,
  href,
}: SidebarLinkProps) => {
  return (
    <Link className="flex items-center" href={href}>
      <Icon size={20} />
      <span
        className={clsx(
          "overflow-hidden transition-all whitespace-nowrap",
          isCollapsed ? "w-0 ml-0" : "w-full ml-3"
        )}
      >
        {text}
      </span>
      {/* Tooltip that appears only when collapsed on desktop */}
      {isCollapsed && (
        <div
          className={clsx(
            "absolute left-full rounded-md px-2 py-1 ml-6",
            "bg-blue-100 text-blue-800 text-sm",
            "invisible opacity-20 -translate-x-3 transition-all",
            "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          )}
        >
          {text}
        </div>
      )}
    </Link>
  );
};

type SidebarProps = {
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
};

// --- Main Sidebar Component ---
const Sidebar = ({ isMobileOpen, setMobileOpen }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { professional } = useProfessionalStore();
  const pathname = usePathname();
  const toggleDesktopSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: FileText,
      text: "Contratos",
      href: "/dashboard/contratos",
    },
    {
      icon: Users,
      text: "Clientes",
      href: "/dashboard/clientes",
    },
    {
      icon: HandshakeIcon,
      text: "Serviços",
      href: "/dashboard/servicos",
    },
    {
      icon: Calendar,
      text: "Agenda",
      href: "/dashboard/agenda",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={() => setMobileOpen(false)}
        className={clsx(
          "fixed inset-0 bg-black/50 z-30 md:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
      />
      <aside
        className={clsx(
          "fixed top-0 left-0 h-screen flex flex-col bg-white border-r transition-all duration-300 ease-in-out z-40",
          // Mobile state
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop state
          "md:sticky md:translate-x-0",
          isCollapsed ? "md:w-20" : "md:w-64",
          // Default width for mobile
          "w-64"
        )}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={clsx(
              "text-xl font-bold text-blue-800 transition-opacity duration-200 whitespace-nowrap",
              isCollapsed ? "md:opacity-0" : "opacity-100"
            )}
          >
            TrampaAI
          </span>
        </div>

        <nav className="flex-1 flex flex-col px-3">
          <ul className="flex-1 flex flex-col">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={`${index}-${item.href}`}
                  className={clsx(
                    "relative flex items-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors group",
                    isActive
                      ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
                      : "hover:bg-blue-50 text-gray-600"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <SidebarLink
                    key={index}
                    {...item}
                    isCollapsed={isCollapsed}
                  />
                </li>
              );
            })}
          </ul>
          {/* Logout button for desktop */}
          <button
            className="flex py-3 px-4 text-danger-500"
            onClick={() => setMobileOpen(false)}
          >
            <SidebarLink
              href="/login"
              icon={LogOut}
              text="Sair"
              isCollapsed={isCollapsed}
            />
          </button>
        </nav>

        <div className="border-t flex p-3 relative">
          <div className="w-10 h-10 rounded-md bg-blue-200 flex-shrink-0"></div>
          <div
            className={clsx(
              "flex justify-between items-center overflow-hidden transition-all",
              isCollapsed ? "w-0" : "w-full ml-3"
            )}
          >
            <div className="leading-4 whitespace-nowrap">
              <h4 className="font-semibold">
                {professional?.firstName} {professional?.lastName}
              </h4>
              <span className="text-xs text-gray-600">
                {professional?.email}
              </span>
            </div>
          </div>
          {/* Desktop collapse button */}
          <button
            onClick={toggleDesktopSidebar}
            className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border hidden md:block"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
      </aside>
      {!isMobileOpen && (
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="absolute bottom-2 left-2 -translate-y-1/2 p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border z-20"
          >
            <MenuIcon size={24} />
          </button>
        </div>
      )}
    </>
  );
};
export default Sidebar;
