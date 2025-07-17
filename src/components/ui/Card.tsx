import { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type RootProps = {
  children: React.ReactNode;
  borderColor?: string;
  hoverColor?: string;
  className?: string;
};

const Root: React.FC<RootProps> = ({
  children,
  borderColor = "border-slate-200",
  hoverColor = "border-slate-300",
  className = "",
}) => {
  return (
    <div
      className={cn(
        `
                  relative bg-white rounded-2xl border-2 ${borderColor} hover:${hoverColor}
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group
                  p-8 md:p-4
                `,
        className
      )}
    >
      {children}
    </div>
  );
};

const Icon = ({
  className = "",
  bgColor = "bg-primary-100",
  Icon,
  iconClassName,
}: {
  className?: string;
  bgColor?: string;
  Icon: LucideIcon;
  iconClassName?: string;
}) => {
  return (
    <div
      className={cn(
        `w-12 h-12 sm:w-16 sm:h-16 ${bgColor} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${className}`
      )}
    >
      <Icon
        className={cn(
          `w-5 h-5 sm:w-6 sm:h-6 text-primary-600 ${iconClassName}`
        )}
      />
    </div>
  );
};

type HeaderProps = {
  title: string;
  description: string;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ title, description, className }) => {
  return (
    <div className={cn(`w-full text-left ${className}`)}>
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-slate-600 mb-4 sm:mb-6 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return <div className={cn("space-y-3", className)}>{children}</div>;
};

export default {
  Root,
  Icon,
  Header,
  Footer,
};
