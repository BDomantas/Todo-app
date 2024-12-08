import { Button, View, StyleSheet } from "react-native";

interface ListHeaderControlsProps {
  onNewTask: () => void;
  onFilter: () => void;
}

export const ListHeaderControls = ({
  onNewTask,
  onFilter,
}: ListHeaderControlsProps) => {
  return (
    <View style={styles.container}>
      <Button title="New Task" onPress={onNewTask} />
      <Button title="Filter" onPress={onFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
