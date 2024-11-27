import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface InputProps {
  placeholder: string;
  type:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad"
    | "web-search"
    | "number-pad";
  onChange: (text: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  onChange,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        keyboardType={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: "center",
    width: "70%",
  },
});

export default Input;
