import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { logout } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createTask, deleteTask, fetchTasks } from "../redux/tasksSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (auth.token) {
      void dispatch(fetchTasks());
    }
  }, [dispatch, auth.token, tasks.filters]);

  if (!auth.token) return <Navigate to="/login" replace />;

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h1>{auth.user?.email}'s Tasks</h1>
        <button onClick={() => dispatch(logout())} type="button">
          Logout
        </button>
      </header>
      <TaskFilters />
      <TaskForm
        submitLabel="Add Task"
        onSubmit={(payload) => {
          void dispatch(createTask(payload));
        }}
      />
      {tasks.loading && <p>Loading tasks...</p>}
      {tasks.error && <p className="error">{tasks.error}</p>}
      <TaskList
        tasks={tasks.items}
        onDelete={(id) => {
          void dispatch(deleteTask(id));
        }}
      />
    </section>
  );
}
