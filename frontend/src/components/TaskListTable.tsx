const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "completed-status";
      case "Pending":
        return "pending-status";
      case "In Progress":
        return "in-progress-status";
      default:
        return "default-status";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "high-priority";
      case "Medium":
        return "medium-priority";
      case "Low":
        return "low-priority";
      default:
        return "default-priority";
    }
  };
  return <div>TaskListTable</div>;
};

export default TaskListTable;
