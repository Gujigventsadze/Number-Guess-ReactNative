import { View, Text, Modal, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

interface GameModalProps {
  visible: boolean;
  generatedNum: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
  hasGuessed: boolean;
  onTryAgain: () => void;
  totalTries: number;
}

const GameModal: React.FC<GameModalProps> = ({
  visible,
  generatedNum,
  onMinusClick,
  onPlusClick,
  hasGuessed,
  onTryAgain,
  totalTries,
}) => {
  return (
    <Modal visible={visible}>
      <View style={styles.mainContainer}>
        <View style={styles.modalOverlay}>
          <View>
            <Text style={styles.text}>{generatedNum}</Text>
          </View>
          <View>
            <Text style={styles.compGuess}>Computer Guess</Text>
          </View>
          <View style={styles.buttons}>
            <CustomButton
              style={styles.btn}
              textStyle={styles.btnText}
              onClick={onMinusClick}
              disabled={hasGuessed}
            >
              -
            </CustomButton>
            <CustomButton
              style={styles.btn}
              textStyle={styles.btnText}
              onClick={onPlusClick}
              disabled={hasGuessed}
            >
              +
            </CustomButton>
          </View>
          {hasGuessed && (
            <CustomButton style={styles.tryAgain} onClick={onTryAgain}>
              Try Again
            </CustomButton>
          )}
          <Text style={styles.totalTries}>Total Tries: {totalTries}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default GameModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 0.5,
    justifyContent: "space-around",
    alignItems: "center",
    width: "70%",
    gap: 10,
    backgroundColor: "lightblue",
    paddingVertical: 80,
    borderRadius: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  compGuess: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 30,
  },
  tryAgain: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 30,
  },
  totalTries: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
