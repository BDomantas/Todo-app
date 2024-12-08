import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Task, TaskProps } from "../components/Task";

import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTaskStore } from "../store/useTaskStore";
import { ListHeaderControls } from "../components/ListHeaderControls";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { NewTaskForm } from "../components/NewTaskForm";

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    console.log("openBottomSheet");
  }, []);

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

  const renderHeader = () => {
    return (
      <ListHeaderControls onNewTask={openBottomSheet} onFilter={() => {}} />
    );
  };

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlashList
        data={tasks}
        renderItem={renderItem}
        estimatedItemSize={100}
        keyExtractor={(item) => item.uuid}
        ListHeaderComponent={renderHeader}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        snapPoints={["50%"]}
        keyboardBehavior="interactive"
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <NewTaskForm />
        </BottomSheetView>
      </BottomSheet>
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
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
