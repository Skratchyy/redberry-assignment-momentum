import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskFilters } from '../../types/api.types';
import { RootState } from '../store';

const initialState: TaskFilters = {
  department_id: undefined,
  employee_id: undefined,
  priority_id: undefined,
};

const tasksFilterSlice = createSlice({
  name: 'tasksFilter',
  initialState,
  reducers: {
    setDepartmentFilter: (state, action: PayloadAction<number[] | undefined>) => {
      if (!action.payload || action.payload.length === 0) {
        state.department_id = undefined;
      } else {
        state.department_id = action.payload;
        state.employee_id = undefined;
      }
    },
    setEmployeeFilter: (state, action: PayloadAction<number[] | undefined>) => {
      if (!action.payload || action.payload.length === 0) {
        state.employee_id = undefined;
      } else {
        state.employee_id = action.payload;
      }
    },
    setPriorityFilter: (state, action: PayloadAction<number[] | undefined>) => {
      if (!action.payload || action.payload.length === 0) {
        state.priority_id = undefined;
      } else {
        state.priority_id = action.payload;
      }
    },
    resetFilters: () => initialState,
  },
});

export const {
  setDepartmentFilter,
  setEmployeeFilter,
  setPriorityFilter,
  resetFilters,
} = tasksFilterSlice.actions;

export const selectTasksFilter = (state: RootState) => state.tasksFilter;

export default tasksFilterSlice.reducer;