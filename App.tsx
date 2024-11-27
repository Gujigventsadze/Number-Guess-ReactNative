import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Title from "./Components/Title";
import Input from "./Components/Input";
import CustomButton from "./Components/CustomButton";
import { useEffect, useState, useContext } from "react";
import GameModal from "./Components/GameModal";
import { GameProvider, GameContext } from "./GeneralContext/GameContext";
import HistoryList from "./Components/HistoryList";

const AppContent = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);
  const [generatedNum, setGeneratedNum] = useState<number>(1);
  const [numOfAttempt, setNumOfAttempt] = useState<number>(0);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);

  const { gameHistory, addGameHistory } = useContext(GameContext);

  const handleChange = (text: string) => {
    setInputText(text);
  };

  const handleCancel = () => {
    setInputText("");
  };
  const handleGameStart = () => {
    if (
      inputText.length === 0 ||
      parseInt(inputText) > 100 ||
      parseInt(inputText) < 1
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    } else {
      setIsGameOn(true);
      setGeneratedNum(generateRandomNumber(min, max));
    }
  };

  const generateRandomNumber = (min: number, max: number): number => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  };

  const handleMinusClick = () => {
    if (parseInt(inputText) > generatedNum) {
      alert("Don't Lie");
      return;
    }
    setNumOfAttempt(numOfAttempt + 1);
    setMax(generatedNum);
    setGeneratedNum(generateRandomNumber(min, generatedNum - 1));
  };

  const handlePlusClick = () => {
    if (parseInt(inputText) < generatedNum) {
      alert("Don't Lie");
      return;
    }
    setNumOfAttempt(numOfAttempt + 1);
    setMin(generatedNum);
    setGeneratedNum(generateRandomNumber(generatedNum + 1, max));
  };

  const handleTryAgain = () => {
    addGameHistory(numOfAttempt, parseInt(inputText));
    setMin(1);
    setMax(100);
    setHasGuessed(false);
    setIsGameOn(false);
    setInputText("");
    setNumOfAttempt(0);
  };

  useEffect(() => {
    if (isGameOn) {
      if (generatedNum === parseInt(inputText)) {
        setHasGuessed(true);
      }
    }
  }, [isGameOn, min, max, generatedNum]);

  return (
    <>
      {!isGameOn && (
        <SafeAreaView style={styles.container}>
          <Title>Number Guessing Game</Title>
          <Input
            placeholder="Enter a Number"
            type="number-pad"
            onChange={handleChange}
            value={inputText}
          />
          {error && <Text style={styles.error}>Enter Valid Number 1-100</Text>}
          <View style={styles.buttonContainer}>
            <CustomButton style={styles.btn} onClick={handleCancel}>
              Cancel
            </CustomButton>
            <CustomButton style={styles.btn} onClick={handleGameStart}>
              Confirm
            </CustomButton>
          </View>
          <View style={styles.historyBox}>
            <Text style={styles.guessHistory}>Guess History</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
              {/* <HistoryList num={12} attempts={40} /> */}
              {gameHistory.map((item, index) => (
                <HistoryList
                  key={index}
                  num={item.correctNum}
                  attempts={item.attempts}
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
      <GameModal
        onMinusClick={handleMinusClick}
        onPlusClick={handlePlusClick}
        generatedNum={generatedNum}
        visible={isGameOn}
        hasGuessed={hasGuessed}
        onTryAgain={handleTryAgain}
        totalTries={numOfAttempt}
      />
    </>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 10,
    paddingHorizontal: 40,
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
  },
  historyBox: {
    alignItems: "center",
    gap: 10,
    padding: 20,
    backgroundColor: "#d7d5f5",
    width: "85%",
    borderRadius: 20,
    flex: 0.8,
  },
  guessHistory: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scroll: {
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
