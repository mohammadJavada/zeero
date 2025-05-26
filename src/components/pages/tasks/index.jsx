import { useGetTasksQuery } from "../../../services/pages/tasks";
import React from "react";

const TasksPage = () => {
  const { data, error, isLoading } = useGetTasksQuery();

  // console.log('Tasks Query Result:', { data, error, isLoading });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;


  const tasks = data.data || []





  return (
    <div>
      {Array.isArray(tasks) ? (
        tasks.map(task => (
          <div key={task.id}>{task.title}</div>
        ))
      ) : (
        <div>Data is not in the expected format</div>
      )}
    </div>
  );
};

export default TasksPage;
