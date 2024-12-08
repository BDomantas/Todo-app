import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useState } from "react";
import { Button, PlatformColor, StyleSheet, Text, View } from "react-native";
import { useTaskStore } from "../store/useTaskStore";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { TaskState } from "../store/types";

const getEditingTaskData = (tasks: TaskState[], editingTask: string | null) => {
  return tasks.filter((task) => task.uuid === editingTask)?.[0];
};

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTaskStore();
  const { close } = useBottomSheet();

  const { editingTask, tasks, updateTaskDetails, setEditingTask } =
    useTaskStore();

  useEffect(() => {
    if (editingTask) {
      const task = getEditingTaskData(tasks, editingTask);
      if (task) {
        setTitle(task.title);
        setDescription(task.description ?? "");
      }
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleAddTask = useCallback(() => {
    addTask(title, description);
    setTitle("");
    setDescription("");
    close();
  }, [title, description, addTask]);

  const handleUpdateTask = useCallback(() => {
    if (editingTask) {
      updateTaskDetails(editingTask, title, description);
      setTitle("");
      setDescription("");
      setEditingTask(null);
      close();
    }
  }, [editingTask, title, description, updateTaskDetails]);

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <BottomSheetTextInput
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Text>Description</Text>
      <BottomSheetTextInput
        style={[styles.input, styles.multilineInput]}
        multiline={true}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <Button
        title={editingTask ? "Save" : "Add Task"}
        onPress={editingTask ? handleUpdateTask : handleAddTask}
      />
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
    backgroundColor: PlatformColor("secondarySystemBackground"),
  },
  multilineInput: {
    height: 100,
  },
});
