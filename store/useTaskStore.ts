import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TaskState } from "./types";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskStoreState {
  tasks: TaskState[];
}

interface TaskStoreActions {
  addTask: (title: string, description: string) => void;
  completeTask: (uuid: string) => void;
  deleteTask: (uuid: string) => void;
  updateTask: (uuid: string, title?: string, description?: string) => void;
}

export const useTaskStore = create<TaskStoreState & TaskStoreActions>()(
  devtools(
    persist(
      immer((set) => ({
        tasks: [],
        addTask: (title: string, description: string) => {
          const uuid = Crypto.randomUUID();
          set((state) => ({
            tasks: [
              ...state.tasks,
              { uuid, title, description, isDone: false },
            ],
          }));
        },
        completeTask: (uuid: string) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.uuid === uuid ? { ...task, isDone: true } : task
            ),
          }));
        },
        deleteTask: (uuid: string) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.uuid !== uuid),
          }));
        },
        updateTask: (uuid: string, title?: string, description?: string) => {
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
