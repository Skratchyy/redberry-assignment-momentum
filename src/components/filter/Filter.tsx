import "./Filter.css"
import DepartmentFilter from "./filter_components/DepartmentFilter";
import PriorityFilter from "./filter_components/PriorityFilter";
import EmployeeFilter from "./filter_components/EmployeeFilter";
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from "react-redux";
import { setDepartmentFilter } from "../../store/filterSlice/taskFilterSlice";

function Filter() {
  const methods = useForm({ mode: "onSubmit" });
  const dispatch = useDispatch()

  function handleSubmit(formData: FieldValues) {
    if(formData.departments) {
      dispatch(setDepartmentFilter(formData.departments.reduce((acc: number[], val: boolean, id: number) => {
        if (val === true) {
          acc.push(id);
        }
        return acc;
      }, [])));
    }

    if(formData.employee) {
      dispatch(setDepartmentFilter(formData.employee.reduce((acc: number[], val: boolean, id: number) => {
        if (val === true) {
          acc.push(id);
        }
        return acc;
      }, [])));
    }

    if(formData.priority) {
      dispatch(setDepartmentFilter(formData.priority.reduce((acc: number[], val: boolean, id: number) => {
        if (val === true) {
          acc.push(id);
        }
        return acc;
      }, [])));
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <menu className="menu">
          <DepartmentFilter register={methods.register} />
          <PriorityFilter register={methods.register} />
          <EmployeeFilter register={methods.register} />
        </menu>
      </form>
    </FormProvider>
  )
}

export default Filter;