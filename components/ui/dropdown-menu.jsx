"use client";

import React, { createContext, useContext, useState } from "react";

const DropdownMenuContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }) {
  const context = useContext(DropdownMenuContext);
  if (!context) return null;

  const handleClick = (event) => {
    context.setOpen((prev) => !prev);
    if (children.props?.onClick) {
      children.props.onClick(event);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} className="inline-flex items-center">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ align, className = "", children }) {
  const context = useContext(DropdownMenuContext);
  if (!context || !context.open) return null;

  const alignClass = align === "end" ? "right-0" : "left-0";

  return (
    <div className={`absolute z-50 mt-2 min-w-40 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-slate-900 ${alignClass} ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ asChild, children, className = "", ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [children.props.className, className].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <div className={`cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className = "", children, ...props }) {
  return (
    <div className={`px-3 py-2 text-xs uppercase tracking-[.08em] text-gray-500 dark:text-gray-400 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = "", ...props }) {
  return <div className={`my-1 h-px bg-gray-200 dark:bg-gray-800 ${className}`} {...props} />;
}
