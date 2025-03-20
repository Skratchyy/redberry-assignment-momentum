import { FieldValues, UseFormRegister } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetPrioritiesQuery } from "../../../services/api/priorityApi";

type DepartmentProps = {
  register: UseFormRegister<FieldValues>
}

function PriorityFilter({register}: DepartmentProps) {
  const {data, isError, isLoading} = useGetPrioritiesQuery();

  if(!isLoading && !isError && data)
  return (<FilterComponent register={register} title="პრიორიტეტი" name="priority">
    {data.map(priority => {
      return <Checkbox key={priority.id} register={register} name={`priority.${priority.id}`} label={priority.name} />
    })}
  </FilterComponent>)
}

export default PriorityFilter;
