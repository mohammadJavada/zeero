import React from "react";

const Card = ({
  title,
  subtitle,
  content,
  imageUrl,
  imageAlt = "Card image",
  variant = "default",
  colorScheme = "neutral",
  rounded = "md",
  shadow = "md",
  hoverEffect = "none",
  actionButton,
  className = "",
  children,
}) => {
  // Color schemes
  const colorSchemes = {
    primary: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-200",
      filled: "bg-blue-500 text-white",
      button: {
        contained: "bg-blue-600 hover:bg-blue-700 text-white",
        outlined: "border-blue-600 text-blue-600 hover:bg-blue-50",
        text: "text-blue-600 hover:bg-blue-50",
      },
    },
    secondary: {
      bg: "bg-purple-50",
      text: "text-purple-800",
      border: "border-purple-200",
      filled: "bg-purple-500 text-white",
      button: {
        contained: "bg-purple-600 hover:bg-purple-700 text-white",
        outlined: "border-purple-600 text-purple-600 hover:bg-purple-50",
        text: "text-purple-600 hover:bg-purple-50",
      },
    },
    neutral: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-200",
      filled: "bg-gray-500 text-white",
      button: {
        contained: "bg-gray-600 hover:bg-gray-700 text-white",
        outlined: "border-gray-600 text-gray-600 hover:bg-gray-50",
        text: "text-gray-600 hover:bg-gray-50",
      },
    },
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-200",
      filled: "bg-green-500 text-white",
      button: {
        contained: "bg-green-600 hover:bg-green-700 text-white",
        outlined: "border-green-600 text-green-600 hover:bg-green-50",
        text: "text-green-600 hover:bg-green-50",
      },
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-200",
      filled: "bg-yellow-500 text-white",
      button: {
        contained: "bg-yellow-600 hover:bg-yellow-700 text-white",
        outlined: "border-yellow-600 text-yellow-600 hover:bg-yellow-50",
        text: "text-yellow-600 hover:bg-yellow-50",
      },
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
      filled: "bg-red-500 text-white",
      button: {
        contained: "bg-red-600 hover:bg-red-700 text-white",
        outlined: "border-red-600 text-red-600 hover:bg-red-50",
        text: "text-red-600 hover:bg-red-50",
      },
    },
  };

  // Variants
  const variants = {
    default: `bg-white ${colorSchemes[colorScheme].text}`,
    outlined: `bg-white border ${colorSchemes[colorScheme].border} ${colorSchemes[colorScheme].text}`,
    elevated: `bg-white ${colorSchemes[colorScheme].text}`,
    filled: `${colorSchemes[colorScheme].filled}`,
  };

  // Rounded corners
  const roundness = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // Shadows
  const shadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  // Hover effects
  const hoverEffects = {
    none: "",
    scale: "hover:scale-[1.02] transition-transform duration-200",
    shadow: "hover:shadow-lg transition-shadow duration-200",
    translate: "hover:-translate-y-1 transition-transform duration-200",
  };

  // Button variants
  const buttonVariants = {
    contained: `px-4 py-2 rounded-md font-medium ${colorSchemes[colorScheme].button.contained}`,
    outlined: `px-4 py-2 rounded-md font-medium border ${colorSchemes[colorScheme].button.outlined}`,
    text: `px-4 py-2 rounded-md font-medium ${colorSchemes[colorScheme].button.text}`,
  };

  return (
    <div
      className={`overflow-hidden ${variants[variant]} ${roundness[rounded]} ${shadows[shadow]} ${hoverEffects[hoverEffect]} ${className}`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        {subtitle && (
          <p
            className={`text-sm font-medium mb-1 ${colorSchemes[colorScheme].text}`}
          >
            {subtitle}
          </p>
        )}
        {title && (
          <h3
            className={`text-xl font-bold mb-2 ${colorSchemes[colorScheme].text}`}
          >
            {title}
          </h3>
        )}
        {(content || children) && (
          <div className={`mb-4 ${colorSchemes[colorScheme].text}`}>
            {content && <p className="text-base">{content}</p>}
            {children}
          </div>
        )}

        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className={`${buttonVariants[actionButton.variant || "contained"]}`}
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
