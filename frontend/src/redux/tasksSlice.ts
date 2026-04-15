import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import type { Task, TaskPriority, TaskSortBy, TaskStatus } from "../types";

type TaskFilters = {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  sortBy: TaskSortBy;
};

type TasksState = {
  items: Task[];
  filters: TaskFilters;
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  items: [],
  filters: {
    status: "all",
    priority: "all",
    sortBy: "createdAt"
  },
  loading: false,
  error: null
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, { getState }) => {
  const state = getState() as { tasks: TasksState };
  const { status, priority, sortBy } = state.tasks.filters;
  const params: Record<string, string> = { sortBy };
  if (status !== "all") params.status = status;
  if (priority !== "all") params.priority = priority;
  const { data } = await api.get<Task[]>("/tasks", { params });
  return data;
});

export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const { data } = await api.post<Task>("/tasks", payload);
    return data;
  }
);

export const updateTask = createAsyncThunk("tasks/update", async (payload: Partial<Task> & { id: number }) => {
  const { data } = await api.put<Task>(`/tasks/${payload.id}`, payload);
  return data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (taskId: number) => {
  await api.delete(`/tasks/${taskId}`);
  return taskId;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((task) => (task.id === action.payload.id ? action.payload : task));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  }
});

export const { setFilters } = tasksSlice.actions;
export default tasksSlice.reducer;
