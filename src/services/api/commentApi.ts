import { Comment, CreateCommentRequest } from '../../types/api.types';
import { api } from './baseApi';

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskComments: builder.query<Comment[], number>({
      query: (taskId) => `/tasks/${taskId}/comments`,
      providesTags: (_result, _error, taskId) => [{ type: 'Comments', id: taskId }],
    }),

    createComment: builder.mutation<Comment, { taskId: number; comment: CreateCommentRequest }>({
      query: ({ taskId, comment }) => ({
        url: `/tasks/${taskId}/comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (_result, _error, { taskId }) => [{ type: 'Comments', id: taskId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTaskCommentsQuery, useCreateCommentMutation } = commentApi;