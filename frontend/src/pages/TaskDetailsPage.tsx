import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTask, updateTask } from "../redux/tasksSlice";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.tasks.items);
  const task = useMemo(() => tasks.find((item) => item.id === Number(id)), [tasks, id]);

  if (!auth.token) return <Navigate to="/login" replace />;
  if (!task) return <p>Task not found. <Link to="/">Back</Link></p>;

  return (
    <section className="dashboard">
      <h1>Task Details</h1>
      <TaskForm
        initial={task}
        submitLabel="Save Changes"
        onSubmit={(payload) => {
          void dispatch(updateTask({ id: task.id, ...payload }));
          navigate("/");
        }}
      />
      <button
        type="button"
        onClick={() => {
          void dispatch(deleteTask(task.id));
          navigate("/");
        }}
      >
        Delete Task
      </button>
      <p>
        <Link to="/">Back to Dashboard</Link>
      </p>
    </section>
  );
}
