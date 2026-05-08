"use client";

import React from "react";

export function Button({ variant, size, className = "", asChild, children, ...props }) {
  const classes = className;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [children.props.className, classes].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
