import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TaskState } from "./types";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskStoreState {
  tasks: TaskState[];
  editingTask: string | null;
}

interface TaskStoreActions {
  addTask: (title: string, description: string) => void;
  changeTaskStatus: (uuid: string, status: boolean) => void;
  deleteTask: (uuid: string) => void;
  updateTaskDetails: (
    uuid: string,
    title?: string,
    description?: string
  ) => void;
  setEditingTask: (uuid: string | null) => void;
}

export const useTaskStore = create<TaskStoreState & TaskStoreActions>()(
  devtools(
    persist(
      immer((set) => ({
        tasks: [],
        editingTask: null,
        setEditingTask: (uuid: string | null) => {
          set((state) => ({
            editingTask: uuid,
          }));
        },
        addTask: (title: string, description: string) => {
          const uuid = Crypto.randomUUID();
          set((state) => ({
            tasks: [
              { uuid, title, description, isDone: false },
              ...state.tasks,
            ],
          }));
        },
        changeTaskStatus: (uuid: string, status: boolean) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.uuid === uuid ? { ...task, isDone: status } : task
            ),
          }));
        },
        deleteTask: (uuid: string) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.uuid !== uuid),
          }));
        },
        updateTaskDetails: (
          uuid: string,
          title?: string,
          description?: string
        ) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.uuid === uuid
                ? {
                    ...task,
                    title: title ?? task.title,
                    description: description ?? task.description,
                  }
                : task
            ),
          }));
        },
      })),
      {
        name: "taskStore",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
