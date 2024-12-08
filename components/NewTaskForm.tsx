import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button, StyleSheet, Text, View } from "react-native";

export const NewTaskForm = () => {
  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <BottomSheetTextInput style={styles.input} />
      <Text>Description</Text>
      <BottomSheetTextInput
        style={[styles.input, styles.multilineInput]}
        multiline={true}
      />
      <Button title="Add Task" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  multilineInput: {
    height: 100,
  },
});
