import { createSlice } from "@reduxjs/toolkit";
import { ICardTask } from "../../../types";
import { data } from "../../../data";

interface AppStoreState {
  tasks: ICardTask[];
}

export const initialState: AppStoreState = {
  tasks: [],
  // tasks: data,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetAppState: () => initialState,
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { index, newvalue } = action.payload;
      state.tasks[index] = newvalue;
    },
    deleteTask: (state, action) => {
      const index = action.payload;
      state.tasks.splice(index, 1);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, clearTasks } =
  appSlice.actions;
export default appSlice.reducer;
