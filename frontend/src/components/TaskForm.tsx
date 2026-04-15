import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../types";

type TaskFormProps = {
  initial?: Partial<Task>;
  onSubmit: (payload: {
    title: string;
    description: string | null;
    dueDate: string | null;
    priority: TaskPriority;
    status: TaskStatus;
  }) => void;
  submitLabel: string;
};

export default function TaskForm({ initial, onSubmit, submitLabel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [dueDate, setDueDate] = useState(initial?.dueDate?.slice(0, 10) || "");
  const [priority, setPriority] = useState<TaskPriority>(initial?.priority || "medium");
  const [status, setStatus] = useState<TaskStatus>(initial?.status || "pending");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          title,
          description: description || null,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          priority,
          status
        });
      }}
      className="task-form"
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
