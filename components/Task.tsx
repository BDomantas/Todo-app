import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

interface TaskProps {
  isChecked?: boolean;
}

export const Task = ({}: TaskProps) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <Pressable style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text style={isChecked && styles.doneText}>This is a task</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  doneText: {
    textDecorationLine: "line-through",
  },
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkbox: {
    margin: 8,
  },
});
