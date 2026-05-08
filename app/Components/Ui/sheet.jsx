"use client";

import React, { createContext, useContext, useState } from "react";

const SheetContext = createContext(null);

export function Sheet({ children }) {
  const [open, setOpen] = useState(false);
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
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={() => context.setOpen(false)} />
      <div className={`relative h-full overflow-y-auto bg-white dark:bg-slate-950 ${side === "left" ? "mr-auto" : "ml-auto"} ${className}`}>
        {children}
      </div>
    </div>
  );
}
