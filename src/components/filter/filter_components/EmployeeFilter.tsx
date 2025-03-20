import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetEmployeesQuery } from "../../../services/api/employeeApi";
import { useSelector } from "react-redux";
import { selectTasksFilter } from "../../../store/filterSlice/taskFilterSlice";
import { useEffect } from "react";

type DepartmentProps = {
  register: UseFormRegister<FieldValues>
}

function EmployeeFilter({register}: DepartmentProps) {
  const filter = useSelector(selectTasksFilter);
  const { setValue } = useFormContext();
  const {data, isError, isLoading} = useGetEmployeesQuery();
  useEffect(() => {
    if (data && filter.employee_id) {
      data.forEach(employee => {
        const isChecked = filter.employee_id?.some(id => id === employee.id);
        setValue(`employee.${employee.id}`, isChecked);
      });
    }
    if (data && !filter.employee_id){
      data.forEach(employee => {
        setValue(`employee.${employee.id}`, false);
      });
    }
  }, [filter.employee_id, data, setValue]);

  if(!isLoading && !isError && data)
  return (
    <FilterComponent register={register} title="თანამშრომელი" name="employee">
      {data.map(employee => {
        return <Checkbox
          key={employee.id}
          image={employee.avatar || ""}
          register={register}
          name={`employee.${employee.id}`}
          label={employee.name}
        />
      })}
    </FilterComponent>
  )
}

export default EmployeeFilter;