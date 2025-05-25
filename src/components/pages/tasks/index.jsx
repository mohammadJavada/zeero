import { useGetTasksQuery } from "@/services/pages/tasks/index";
import React from "react";

const TasksPage = () => {
  const { data } = useGetTasksQuery();
  console.log(data);
  return <div>TasksPage</div>;
};

export default TasksPage;
