import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface HistoryListProps {
  num: number;
  attempts: number;
}

const HistoryList: React.FC<HistoryListProps> = ({ num, attempts }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Number: {num}</Text>
      <Text style={styles.text}>Tries: {attempts}</Text>
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#b4affa",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
  },
});
