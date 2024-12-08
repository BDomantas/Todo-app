import { Button, View, StyleSheet } from "react-native";

interface ListHeaderControlsProps {
  onNewTask: () => void;
  // TODO: add picker for filter
  onFilter: () => void;
}

export const ListHeaderControls = ({
  onNewTask,
  onFilter,
}: ListHeaderControlsProps) => {
  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={onFilter} />
      <Button title="New Task" onPress={onNewTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
