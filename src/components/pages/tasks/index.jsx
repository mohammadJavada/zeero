import { useGetTasksQuery } from "@/services/pages/tasks/index";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import TasksTable from "./components/tasks-table/index";
import { useState } from "react";

const TasksPage = () => {
  const { data, isLoading } = useGetTasksQuery();

  const [list, setList] = useState([]);

  if (isLoading) return <div>Loading...</div>;

  const tasks = data?.data || [];

  const handleEdit = (task) => {
    console.log("Edit task:", task);
  };

  const handleDelete = (task) => {
    console.log("Delete task:", task);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button className="!bg-sky-700 hover:bg-sky-800">
          <FiPlus className="mr-2" />
          افزودن وظیفه
        </Button>
      </div>

      <TasksTable
        data={list?.length ? list : tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        className="rounded-md border"
        headerClassName="bg-muted/50"
        rowClassName="hover:bg-muted/50"
        onStatusChange={(taskId, newStatus) => {
          const listArray = tasks.map(task => ({
            ...task,
            completionStatus: task.taskId === taskId ? newStatus : task.completionStatus
          }));
          setList(listArray);
        }}
      />
    </div>
  );
};

export default TasksPage;
