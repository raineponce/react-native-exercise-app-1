import React from "react";
import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-web";

const Stack = createNativeStackNavigator();

// repetition exercise
function RepetitionExercise({ route, navigation }) {
  const { name } = route.params;

  let goToExercise = () => {
    navigation.navigate("RepetitionExercise");
  };

  // suggested decider
  let suggestedTitle = "Suggested: Home";
  let suggestedPage = () => navigation.navigate("Home");

  if (name === "Push Ups") {
    suggestedTitle = "Suggested: Jumping Jacks";
    suggestedPage = () =>
      navigation.navigate("RepetitionExercise", { name: "Jumping Jacks" });
  } else if (name === "Jumping Jacks") {
    suggestedTitle = "Suggested: Push Ups";
    suggestedPage = () =>
      navigation.navigate("RepetitionExercise", { name: "Push Ups" });
  }

  // repetition counter
  const [counter, setCounter] = useState(0);
  const addRep = () => {
    setCounter(counter + 1);
  };
  const resetReps = () => {
    setCounter(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>{name}</Text>

      {/* repetition */}
      <Text style={styles.h2}>{counter}</Text>
      <View style={styles.fixToText}>
        <Button color="#758c75" onPress={addRep} title="Add Rep"></Button>
        <Button color="#758c75" onPress={resetReps} title="Reset"></Button>
      </View>

      {/* navigation */}
      <Button
        color="#93af92"
        onPress={suggestedPage}
        title={suggestedTitle}
      ></Button>

      <Button
        color="#93af92"
        onPress={() => navigation.navigate("Home")}
        title="Home"
      ></Button>
    </SafeAreaView>
  );
}

// home screen
function Home({ navigation }) {
  let exerciseList = [
    {
      name: "Push Ups",
      key: "1",
      suggested: "Jumping Jacks",
      type: "RepetitionExercise",
    },
    {
      name: "Jumping Jacks",
      key: "2",
      suggested: "Push Ups",
      type: "RepetitionExercise",
    },
  ];

  let goToExercise = ({ name }) => {
    // possible if statement for duration exercise
    navigation.navigate("RepetitionExercise", { name: name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Exercises</Text>
      <FlatList
        data={exerciseList}
        renderItem={({ item }) => (
          <Button
            color="#93af92"
            onPress={() => goToExercise(item)}
            title={item.name}
          ></Button>
        )}
      />
    </SafeAreaView>
  );
}

// app
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="RepetitionExercise"
            component={RepetitionExercise}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    margin: 100,
  },
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    maxWidth: 300,
    margin: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 30,
  },
});
