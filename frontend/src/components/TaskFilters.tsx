import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFilters } from "../redux/tasksSlice";
import type { TaskPriority, TaskSortBy, TaskStatus } from "../types";

export default function TaskFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tasks.filters);

  return (
    <div className="filters">
      <select value={filters.status} onChange={(e) => dispatch(setFilters({ status: e.target.value as TaskStatus | "all" }))}>
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => dispatch(setFilters({ priority: e.target.value as TaskPriority | "all" }))}
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={filters.sortBy} onChange={(e) => dispatch(setFilters({ sortBy: e.target.value as TaskSortBy }))}>
        <option value="createdAt">Newest</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}
