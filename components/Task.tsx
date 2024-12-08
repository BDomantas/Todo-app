import {
  Button,
  PlatformColor,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import type { TaskState } from "../store/types";
import { useCallback } from "react";
import { useTaskStore } from "../store/useTaskStore";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export interface TaskProps extends TaskState {}

const RIGHT_ACTION_WIDTH = 100;
const RightAction = ({
  drag,
  onDelete,
}: {
  drag: SharedValue<number>;
  onDelete: () => void;
}) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + RIGHT_ACTION_WIDTH }],
    };
  });

  return (
    <Animated.View style={[styleAnimation, styles.rightAction]}>
      <Button
        title={"Delete"}
        color={PlatformColor("systemGray6")}
        onPress={onDelete}
      />
    </Animated.View>
  );
};

export const Task = ({ isDone, title, uuid }: TaskProps) => {
  const { changeTaskStatus, deleteTask, setEditingTask } = useTaskStore();

  const onCheckboxPress = useCallback(
    (status: boolean) => {
      changeTaskStatus(uuid, status);
    },
    [uuid]
  );

  const onDelete = useCallback(() => {
    deleteTask(uuid);
  }, [uuid]);

  const renderRightActions = useCallback(
    (_: SharedValue<number>, drag: SharedValue<number>) => {
      return <RightAction drag={drag} onDelete={onDelete} />;
    },
    [onDelete]
  );

  const onEdit = useCallback(() => {
    setEditingTask(uuid);
  }, [uuid]);

  return (
    <>
      <ReanimatedSwipeable
        childrenContainerStyle={styles.container}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <Checkbox
          style={styles.checkbox}
          value={isDone}
          onValueChange={onCheckboxPress}
          color={isDone ? PlatformColor("systemGreen") : undefined}
        />
        <Pressable
          style={({ pressed }) => [
            styles.contentContainer,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={onEdit}
        >
          <Text style={[styles.text, isDone && styles.doneText]}>{title}</Text>
        </Pressable>
      </ReanimatedSwipeable>
      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: PlatformColor("separator"),
    height: 1,
    width: "100%",
  },
  rightAction: {
    width: RIGHT_ACTION_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PlatformColor("systemRed"),
  },
  contentContainer: {
    flex: 1,
  },
  doneText: {
    textDecorationLine: "line-through",
  },
  container: {
    flex: 1,
    backgroundColor: PlatformColor("quaternarySystemFill"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkbox: {
    margin: 8,
  },
  text: {
    color: PlatformColor("label"),
  },
});
