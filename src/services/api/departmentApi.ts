import { Department } from '../../types/api.types';
import { api } from './baseApi';

export const departmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
      providesTags: ['Departments'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDepartmentsQuery } = departmentApi;