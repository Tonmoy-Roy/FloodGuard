"use client";

import React, { createContext, useContext, useState } from "react";

const SheetContext = createContext(null);

export function Sheet({ children, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if props are provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (val) => {
    if (onOpenChange) onOpenChange(val);
    if (controlledOpen === undefined) setInternalOpen(val);
  };

  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ asChild, children }) {
  const context = useContext(SheetContext);
  if (!context) return null;

  const handleClick = (event) => {
    context.setOpen(true);
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
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export function SheetContent({ side = "right", className = "", children }) {
  const context = useContext(SheetContext);
  if (!context || !context.open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => context.setOpen(false)} />
      {/* Sidebar Content */}
      <div className={`relative h-full overflow-y-auto bg-white dark:bg-gray-950 shadow-2xl transition-transform ${side === "left" ? "mr-auto border-r" : "ml-auto border-l"} border-gray-200 dark:border-gray-800 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function SheetTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}
