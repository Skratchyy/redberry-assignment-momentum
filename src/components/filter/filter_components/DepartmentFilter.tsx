import { FieldValues, UseFormRegister } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetDepartmentsQuery } from "../../../services/api/departmentApi";

type DepartmentProps = {
  register: UseFormRegister<FieldValues>
}

function DepartmentFilter({register}: DepartmentProps) {
  const {data, isError, isLoading} = useGetDepartmentsQuery();
  if(!isLoading && !isError && data)
  return (<FilterComponent register={register} title="დეპარტამენი" name="departments">
    {data.map(dep => {
      return <Checkbox key={dep.id} register={register} name={`departments.${dep.id}`} label={dep.name} />
    })}
  </FilterComponent>)
}

export default DepartmentFilter;
