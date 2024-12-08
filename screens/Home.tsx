import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Task, TaskProps } from "../components/Task";

import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";

const DATA = [
  {
    title: "First Item",
    isChecked: true,
  },
  {
    title: "Second Item",
    isChecked: false,
  },
];

export const Home = () => {
  const renderItem = ({ item }: ListRenderItemInfo<TaskProps>) => {
    return <Task isChecked={true} title={item.title} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlashList data={DATA} renderItem={renderItem} estimatedItemSize={100} />
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
