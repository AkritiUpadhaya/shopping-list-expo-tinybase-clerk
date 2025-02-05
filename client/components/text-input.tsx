import React from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  useColorScheme,
  View,
  ViewStyle,
  TextStyle,
  StyleProp
} from "react-native";

type TextVariant = "filled" | "outline" | "ghost";
type TextSize = "sm" | "md" | "lg";

interface TextInputProps extends RNTextInputProps {
  variant?: TextVariant;
  size?: TextSize;
  label?: string;
  error?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const TextInput: React.FC<TextInputProps> = ({
  variant = "filled",
  size = "md",
  label,
  error,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getVariantStyle = (variant: TextVariant): TextStyle => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: isDark ? "#1F2937" : "#F3F4F6",
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? "#374151" : "#D1D5DB",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
    }
  };

  const getSizeStyle = (size: TextSize): TextStyle => {
    switch (size) {
      case "sm":
        return {
          height: 36,
          paddingHorizontal: 12,
        };
      case "md":
        return {
          height: 44,
          paddingHorizontal: 16,
        };
      case "lg":
        return {
          height: 56,
          paddingHorizontal: 20,
        };
    }
  };

  const getLabelSize = (size: TextSize): TextStyle => {
    switch (size) {
      case "sm":
        return {
          fontSize: 12,
          marginBottom: 4,
        };
      case "md":
        return {
          fontSize: 14,
          marginBottom: 6,
        };
      case "lg":
        return {
          fontSize: 16,
          marginBottom: 8,
        };
    }
  };

  const getTextColor = (): string => {
    if (disabled) return isDark ? "#6B7280" : "#9CA3AF";
    if (error) return isDark ? "#EF4444" : "#DC2626";
    return isDark ? "#F9FAFB" : "#111827";
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            getLabelSize(size),
            { color: isDark ? "#D1D5DB" : "#374151" },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      
      <RNTextInput
        {...props}
        editable={!disabled}
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        style={[
          styles.input,
          getVariantStyle(variant),
          getSizeStyle(size),
          {
            color: getTextColor(),
            borderColor: error 
              ? (isDark ? "#EF4444" : "#DC2626")
              : (isDark ? "#374151" : "#D1D5DB"),
          } as TextStyle,
          disabled && (styles.disabled as TextStyle),
          inputStyle,
          style,
        ] as StyleProp<TextStyle>}
      />

      {error && (
        <Text
          style={[
            styles.error,
            { color: isDark ? "#EF4444" : "#DC2626" },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderRadius: 8,
    width: "100%",
  },
  label: {
    marginLeft: 8,
    fontWeight: "500",
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default TextInput;