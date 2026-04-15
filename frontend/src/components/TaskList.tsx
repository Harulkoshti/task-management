import { Link } from "react-router-dom";
import type { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, onDelete }: TaskListProps) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-card" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description || "No description"}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
          <div className="task-actions">
            <Link to={`/tasks/${task.id}`}>Edit</Link>
            <button onClick={() => onDelete(task.id)} type="button">
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
