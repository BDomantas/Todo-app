import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TaskState } from "./types";

interface TaskStoreState {
  tasks: TaskState[];
}

interface TaskStoreActions {
  addTask: (title: string, description: string) => void;
  completeTask: (uuid: string) => void;
  deleteTask: (uuid: string) => void;
  updateTask: (uuid: string, title?: string, description?: string) => void;
}
