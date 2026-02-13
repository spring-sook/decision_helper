import React from "react";
import { OnIcon, OffIcon } from "../icons";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isLabel?: boolean;
};

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  isLabel = false,
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-[17px] w-[32px] items-center rounded-full transition-colors duration-300 
        ${checked ? "bg-primary-040" : "bg-content-05"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-[15px] w-[15px] rounded-full bg-white shadow transform transition-transform duration-300
          ${checked ? "translate-x-[16px]" : "translate-x-[1px]"}`}
      />
      {isLabel && (
        <span
          className={`relative ${checked ? "right-[10px]" : "left-[6px]"}`}
        >
          {checked ? <OnIcon /> : <OffIcon />}
        </span>
      )}
    </button>
  );
};
