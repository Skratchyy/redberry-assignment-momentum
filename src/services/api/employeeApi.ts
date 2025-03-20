import { Employee, CreateEmployeeRequest } from '../../types/api.types';
import { api } from './baseApi';

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => '/employees',
      providesTags: ['Employees'],
    }),

    createEmployee: builder.mutation<Employee, CreateEmployeeRequest>({
      query: (employee) => {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('surname', employee.surname);
        formData.append('department_id', employee.department_id.toString());

        if (employee.avatar) {
          formData.append('avatar', employee.avatar);
        }

        return {
          url: '/employees',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Employees'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetEmployeesQuery, useCreateEmployeeMutation } = employeeApi;