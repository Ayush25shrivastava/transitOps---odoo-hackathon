import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(
  ({ className = '', variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-bg-base";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
      secondary: "bg-[var(--color-border)] text-text-primary hover:bg-gray-700 focus-visible:ring-gray-500",
      outline: "border border-border hover:bg-[var(--color-border)] focus-visible:ring-gray-500 text-text-primary",
      ghost: "hover:bg-[var(--color-border)] text-text-secondary hover:text-text-primary",
      danger: "bg-danger text-white hover:bg-red-600 focus-visible:ring-danger",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
