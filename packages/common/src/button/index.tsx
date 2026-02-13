'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'border' | 'bggray' | 'bgred' | 'bordergray' | 'outline' | 'outlinegray';
  size?: 'default' | 'medium' | 'semiMedium' | 'small';
  fontSize?: string;
}

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  fontSize = 'font-h6',
  ...props
}: ButtonProps) {
  const baseStyles = `text-center rounded-[2px] ${fontSize} inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:text-text-4 disabled:outline-line-3`;
  
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    default: 'bg-primary text-white hover:bg-primary/90 disabled:bg-surface-fourth',
    border: 'border border-[1px] border-primary text-primary disabled:bg-surface-fourth',
    outline: 'outline outline-[1px] outline-primary text-primary focus-visible:ring-0 disabled:bg-surface-fourth',
    bordergray: 'border border-[1px] border-line-03 text-text-03 disabled:bg-surface-fourth',
    outlinegray: 'outline outline-[1px] outline-line-03 text-text-03 focus-visible:ring-0 disabled:bg-surface-fourth',
    bggray: 'bg-surface-third disabled:bg-surface-fourth',
    bgred: 'bg-red-500 text-white hover:bg-red-500/85 disabled:bg-red-500',
  };
  

  const sizes = {
    default: 'py-[8px] px-[12px]',
    medium: 'py-[14px] px-[12px]',
    semiMedium: 'py-[11px] px-[12px]',
    small: 'py-[4px] px-[10px]',
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
