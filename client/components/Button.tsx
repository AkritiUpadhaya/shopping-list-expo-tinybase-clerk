import React from "react";
import { ActivityIndicator, Pressable, Text, useColorScheme } from "react-native";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  className,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";


  const baseStyle = "rounded-lg flex-row items-center justify-center";


  const variantStyles: Record<ButtonVariant, string> = {
    filled: isDark ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-50",
    outline: isDark
      ? "border border-gray-700 bg-transparent text-blue-500"
      : "border border-gray-300 bg-transparent text-blue-500",
    ghost: "bg-transparent text-blue-500",
  };


  const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-14 px-5 text-lg",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled && "opacity-50"} ${className}`}
    >
      {loading ? <ActivityIndicator color={isDark ? "black" : "white"} /> : <Text className="font-bold">{children}</Text>}
    </Pressable>
  );
};

export default Button;
