import React from "react";
import { ActivityIndicator, Pressable, Text, useColorScheme, View } from "react-native";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from "react-native";

type TextVariant = "default" | "filled" | "outline" | "ghost";
type  TextSize = "sm" | "md" | "lg";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  variant = "filled",
  size = "md",
  className,
  disabled= false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";


  const baseStyle = "rounded-lg flex-row items-center justify-center";


  const variantStyles: Record<TextVariant, string> = {
    filled: isDark ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-50",
    outline: isDark
      ? "border border-gray-700 bg-transparent text-blue-500"
      : "border border-gray-300 bg-transparent text-blue-500",
    ghost: "bg-transparent text-blue-500",
    default: "bg-gray-50 text-gray-900",    
  };


  const sizeStyles: Record<TextSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-14 px-5 text-lg",
  };

  return (
    <View className="flex-1">
        {label && <Text>{label}</Text>}
        <View>
            {error && <Text>{error}</Text>}
        </View>
      </View>
  );
};

export default TextInput;
