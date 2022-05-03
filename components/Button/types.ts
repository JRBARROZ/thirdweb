import React from "react";

export interface IButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  type: "button" | "submit";
  handleClick?: () => void;
}
