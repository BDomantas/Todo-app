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
import { JSX, useCallback, useEffect, useRef } from "react";
import { TaskForm } from "../components/TaskForm";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

export const Home = () => {
  const { tasks, editingTask, setEditingTask } = useTaskStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setEditingTask(null);
      }
    },
    [setEditingTask]
  );

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const onNewTask = useCallback(() => {
    setEditingTask(null);
    openBottomSheet();
  }, [openBottomSheet]);

  useEffect(() => {
    if (editingTask) {
      openBottomSheet();
    }
  }, [editingTask, openBottomSheet]);

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

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
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
      <View style={styles.list}>
        <ListHeaderControls onNewTask={onNewTask} onFilter={() => {}} />

        <FlashList
          data={tasks}
          renderItem={renderItem}
          estimatedItemSize={100}
          keyExtractor={(item) => item.uuid}
        />
      </View>

      {/* Would separate this to "New task" and "Edit task" bottom sheets in more complex scenarios, but for this simple case I believe this is fine  */}
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
          <TaskForm />
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
  list: {
    flex: 1,
  },
});
