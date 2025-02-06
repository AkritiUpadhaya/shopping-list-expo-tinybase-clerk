import React from "react";
import { ActivityIndicator, Pressable, Text, useColorScheme } from "react-native";
import { zincColors } from "~/constants/Colors";


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
    filled: isDark 
      ? "bg-zinc-50 text-zinc-900" 
      : "bg-zinc-900 text-zinc-50",
    outline: isDark 
      ? "border border-zinc-700 text-zinc-50" 
      : "border border-zinc-300 text-zinc-900",
    ghost: "bg-transparent text-zinc-900 dark:text-zinc-50",
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
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50" : ""} ${className || ""}`}
    >
      {loading ? (
        <ActivityIndicator color={isDark ? "black" : "white"} />
      ) : (
        <Text className={`font-medium ${
          variant === 'ghost' 
            ? 'text-zinc-900 dark:text-zinc-50' 
            : variant === 'filled'
              ? isDark ? 'text-zinc-900' : 'text-zinc-50'
              : isDark ? 'text-zinc-50' : 'text-zinc-900'
        }`}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
