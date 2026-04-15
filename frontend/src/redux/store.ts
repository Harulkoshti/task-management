import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tasksReducer from "./tasksSlice";
import { attachAuthInterceptor } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer
  }
});

attachAuthInterceptor(store.getState);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
