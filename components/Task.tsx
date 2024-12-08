import { Pressable, StyleSheet, Text } from "react-native";
import Checkbox from "expo-checkbox";
import type { TaskState } from "../store/types";
export interface TaskProps extends TaskState {}

export const Task = ({ isDone, title }: TaskProps) => {
  return (
    <Pressable style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isDone}
        onValueChange={() => {}}
        color={isDone ? "#4630EB" : undefined}
      />
      <Text style={[styles.text, isDone && styles.doneText]}>{title}</Text>
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
  text: {
    flex: 1,
  },
});
