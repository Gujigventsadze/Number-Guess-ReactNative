import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Title;
