import { Status } from '../../types/api.types';
import { api } from './baseApi';

export const statusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query<Status[], void>({
      query: () => '/statuses',
      providesTags: ['Statuses'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatusesQuery } = statusApi;