// Text are based on my input styles

import clsx from "clsx";

type TextAreaProps = {
  className: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        "w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white",
        className
      )}
      {...props}
    />
  );
};
