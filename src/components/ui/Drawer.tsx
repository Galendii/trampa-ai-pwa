import clsx from "clsx";
import { XIcon } from "lucide-react";

type DrawerProps = {
  className?: string;
  handleCloseDrawer: () => void;
  opened?: boolean;
  children: React.ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  children,
  handleCloseDrawer,
  opened = false,
  className = "",
}) => {
  return (
    <div>
      <div
        onClick={handleCloseDrawer}
        className={clsx(
          "bg-neutral-500 opacity-45 h-dvh w-dvw fixed top-0 right-0",
          {
            "hidden opacity-0": !opened,
          }
        )}
      ></div>
      <div
        className={clsx(
          "transition-all duration-500 ease-in-out h-dvh bg-white fixed top-0 right-0 p-2 overflow-auto",
          className,
          {
            "w-[85%]": opened,
            "w-0 translate-x-[100%]": !opened,
          }
        )}
      >
        <div
          className={opened ? "w-full h-full opacity-100" : "hidden opacity-0"}
        >
          {children}
        </div>
      </div>
      <button
        className="fixed top-2 left-2 bg-white rounded-full p-2"
        onClick={handleCloseDrawer}
        hidden={!opened}
      >
        <XIcon className="h-4 w-4 text-black" />
      </button>
    </div>
  );
};
