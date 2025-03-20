import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_TOKEN}`);

      return headers;
    },
  }),
  tagTypes: ['Tasks', 'Comments', 'Employees', 'Statuses', 'Priorities', 'Departments'],
  endpoints: () => ({}),
});