import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Task, TaskProps } from "../components/Task";

import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTaskStore } from "../store/useTaskStore";

const DATA = [
  {
    title: "First Item",
    isDone: true,
    uuid: "1",
    description: "This is a description",
  },
  {
    title: "Second Item",
    isChecked: false,
    isDone: true,
    uuid: "2",
    description: "This is a description",
  },
];

export const Home = () => {
  const { tasks } = useTaskStore();

  const renderItem = ({ item }: ListRenderItemInfo<TaskProps>) => {
    return (
      <Task
        isDone={item.isDone}
        title={item.title}
        uuid={item.uuid}
        description={item.description}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlashList data={tasks} renderItem={renderItem} estimatedItemSize={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
