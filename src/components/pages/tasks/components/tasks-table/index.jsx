import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckBox from "@/components/atom/check-box/index";
import { BsThreeDotsVertical, BsFilter } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineDesktopAccessDisabled, MdModeEdit } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useDeleteTaskMutation } from "@/services/pages/tasks/index";

const TasksTable = ({
  data = [],
  className,
  showActions = true,
  customColumns = [],
  rowClassName,
  cellClassName,
  headerClassName,
  onStatusChange,
}) => {
  const [statusFilter, setStatusFilter] = useState(null);

  const [deleteTask] = useDeleteTaskMutation();

  const defaultColumns = [
    { key: "title", label: "عنوان" },
    { key: "text", label: "توضیحات" },
    { key: "completionStatus", label: "وضعیت" },
  ];

  const columns = [...defaultColumns, ...customColumns];

  const filteredData =
    statusFilter === null
      ? data
      : data.filter((task) => task.completionStatus === statusFilter);

  if (!data || data.length === 0) {
    return <div className={className}>تسکی وجود ندارد .</div>;
  }

  const handleStatusChange = (taskId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(taskId, newStatus);
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-start mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 !bg-transparent !outline-0 !shadow-none !border-0"
            >
              <BsFilter />
              فیلتر وضعیت
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-right">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  فیلتر بر اساس وضعیت
                </h4>
                <p className="text-sm text-muted-foreground">
                  وضعیت مورد نظر را انتخاب کنید
                </p>
              </div>
              <div className="flex flex-col items-end justify-start gap-3 !w-full">
                <div className="flex items-center space-x-2 space-x-reverse !w-full justify-end gap-2 ">
                  <Label htmlFor="all">همه</Label>
                  <CheckBox
                    id="all"
                    checked={statusFilter === null}
                    onChange={() => setStatusFilter(null)}
                  />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse !w-full justify-end gap-2">
                  <Label htmlFor="completed">تکمیل شده</Label>
                  <CheckBox
                    id="completed"
                    checked={statusFilter === true}
                    onChange={() => setStatusFilter(true)}
                  />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse !w-full justify-end gap-2">
                  <Label htmlFor="pending">در انتظار</Label>
                  <CheckBox
                    id="pending"
                    checked={statusFilter === false}
                    onChange={() => setStatusFilter(false)}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Table>
        <TableHeader className={headerClassName}>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={`header-${column.key}`} className="text-right">
                {column.label}
              </TableHead>
            ))}
            {showActions && (
              <TableHead key="actions-header" className="text-right">
                عملیات
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((task, index) => {
            const rowKey = task.taskId
              ? `task-${task.taskId}`
              : `task-${index}`;

            return (
              <TableRow key={rowKey} className={rowClassName}>
                {columns.map((column) => {
                  const cellKey = `${rowKey}-${column.key}`;

                  return (
                    <TableCell
                      key={cellKey}
                      className={`text-right ${cellClassName}`}
                    >
                      {column.key === "completionStatus" ? (
                        <CheckBox
                          checked={task.completionStatus}
                          onChange={() =>
                            handleStatusChange(
                              task.taskId,
                              !task.completionStatus
                            )
                          }
                        />
                      ) : column.render ? (
                        column.render(task[column.key], task)
                      ) : (
                        task[column.key]
                      )}
                    </TableCell>
                  );
                })}
                {showActions && (
                  <TableCell key={`${rowKey}-actions`} className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="!bg-transparent !border-0 !shadow-none !outline-none focus-visible:ring-0 focus-visible:ring-offset-0 !p-0">
                        <BsThreeDotsVertical className="text-2xl" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center flex-row-reverse hover:!bg-orange-200 hover:!text-orange-700">
                          <MdOutlineDesktopAccessDisabled className="hover:!text-orange-700" />
                          فعال / غیر فعال
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center flex-row-reverse hover:!bg-pink-200 hover:!text-pink-700">
                          <BiMessageDetail className="hover:!text-pink-700" />
                          مشاهده جزئیات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center flex-row-reverse hover:!bg-blue-200 hover:!text-blue-700">
                          <MdModeEdit className="hover:!text-blue-700" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer flex gap-2 items-center flex-row-reverse hover:!bg-red-200 hover:!text-red-700"
                          onClick={() => deleteTask()}
                        >
                          <BsTrash className="hover:!text-red-700" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
