import { Priority } from '../../types/api.types';
import { api } from './baseApi';

export const priorityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPriorities: builder.query<Priority[], void>({
      query: () => '/priorities',
      providesTags: ['Priorities'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPrioritiesQuery } = priorityApi;