import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskFilters } from '../../types/api.types';
import { RootState } from '../store';

const loadStateFromStorage = (): TaskFilters => {
  try {
    const savedState = localStorage.getItem('tasksFilter');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
  }
  return {
    department_id: undefined,
    employee_id: undefined,
    priority_id: undefined,
  };
};

const initialState: TaskFilters = loadStateFromStorage();

const saveStateToStorage = (state: TaskFilters) => {
  try {
    localStorage.setItem('tasksFilter', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
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
      saveStateToStorage(state);
    },
    setEmployeeFilter: (state, action: PayloadAction<number[] | undefined>) => {
      if (!action.payload || action.payload.length === 0) {
        state.employee_id = undefined;
      } else {
        state.employee_id = action.payload;
      }
      saveStateToStorage(state);
    },
    setPriorityFilter: (state, action: PayloadAction<number[] | undefined>) => {
      if (!action.payload || action.payload.length === 0) {
        state.priority_id = undefined;
      } else {
        state.priority_id = action.payload;
      }
      saveStateToStorage(state);
    },
    resetFilters: () => {
      const resetState = {
        department_id: undefined,
        employee_id: undefined,
        priority_id: undefined,
      };
      saveStateToStorage(resetState);
      return resetState;
    },
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