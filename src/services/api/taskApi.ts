import { Task, CreateTaskRequest, UpdateTaskStatusRequest } from '../../types/api.types';
import { api } from './baseApi';

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),

    getTask: builder.query<Task, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tasks', id }],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTaskStatus: builder.mutation<Task, { id: number; request: UpdateTaskStatusRequest }>({
      query: ({ id, request }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }, 'Tasks'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation
} = taskApi;