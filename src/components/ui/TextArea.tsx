import clsx from "clsx";
import React from "react";

type TextAreaProps = {
  className?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// ✨ Wrap your component with React.forwardRef
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <textarea
          ref={ref} // ✨ Forward the ref to the native textarea
          className={clsx(
            "w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

// Add a display name for better debugging
TextArea.displayName = "TextArea";
