import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import colors from "../config/colors";

function Chrono(props) {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPause) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPause]);

  const handlePause = () => {
    setIsPause(true);
    setIsActive(false);
  };

  const handleRestart = () => {
    setTimer(0);
    setIsPause(false);
    setIsActive(true);
  };

  const handleContinue = () => {
    setIsPause(false);
    setIsActive(true);
  };

  const handleFinish = () => {
    setElapsedTime(timer);
    setIsPause(true);
    setIsActive(false);
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Text style={styles.tagtitle}> Bon Travail ... </Text>

      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {isPause ? (
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handlePause}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Terminer</Text>
          </TouchableOpacity>
        </View>
        {elapsedTime > 0 && (
          <Text style={styles.elapsedTime}>
            Temps écoulé : {formatTime(elapsedTime)}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tagtitle: {
    fontSize: 50,
    marginTop: 25,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.marron,
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  timer: {
    fontSize: 50,
    color: colors.marron,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.beige,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  elapsedTime: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "normal",
  },
});

export default Chrono;
