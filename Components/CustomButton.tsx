import { ReactNode } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps {
  children: ReactNode;
  onClick: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.outerLayer,
        pressed && styles.pressedLayer,
        style,
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      <Text style={[styles.innerLayer, textStyle]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerLayer: {
    backgroundColor: "#6f8af7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  innerLayer: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
  },
  pressedLayer: {
    opacity: 0.7,
  },
});

export default CustomButton;
