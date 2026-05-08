"use client";

export function Badge({ className = "", children, ...props }) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
