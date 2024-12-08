import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

export interface TaskProps {
  isChecked?: boolean;
  title: string;
}

export const Task = ({ isChecked, title }: TaskProps) => {
  return (
    <Pressable style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={() => {}}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text style={[styles.text, isChecked && styles.doneText]}>{title}</Text>
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
