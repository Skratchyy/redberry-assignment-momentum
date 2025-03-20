import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksFilter } from '../store/filterSlice/taskFilterSlice';
import { useGetTasksQuery } from '../services/api/taskApi';
import { Task } from '../types/api.types';

export const useFilteredTasks = () => {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();
  const filters = useSelector(selectTasksFilter);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {

      if (filters.department_id !== undefined && !filters.department_id.includes( task.department.id )) {
        return false;
      }

      if (filters.employee_id !== undefined && !filters.employee_id.includes( task.employee.id )) {
        return false;
      }

      if (filters.priority_id !== undefined && !filters.priority_id.includes(task.priority.id )) {
        return false;
      }

      return true;
    });
  }, [tasks, filters]);

  return {
    tasks: filteredTasks,
    isLoading,
    error,
  };
};