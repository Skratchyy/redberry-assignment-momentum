import { FieldValues, UseFormRegister } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetEmployeesQuery } from "../../../services/api/employeeApi";

type DepartmentProps = {
  register: UseFormRegister<FieldValues>
}

function EmployeeFilter({register}: DepartmentProps) {
  const {data, isError, isLoading} = useGetEmployeesQuery();
  if(!isLoading && !isError && data)
  return (<FilterComponent register={register} title="თანამშრომელი" name="employee">
    {data.map(employee => {
      return <Checkbox key={employee.id} image={employee.avatar || ""} register={register} name={`employee.${employee.id}`} label={employee.name} />
    })}
  </FilterComponent>)
}

export default EmployeeFilter;
