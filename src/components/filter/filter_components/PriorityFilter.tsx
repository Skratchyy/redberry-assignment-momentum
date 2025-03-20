import { FieldValues, UseFormRegister, useFormContext } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetPrioritiesQuery } from "../../../services/api/priorityApi";
import { useSelector } from "react-redux";
import { selectTasksFilter } from "../../../store/filterSlice/taskFilterSlice";
import { useEffect } from "react";

type PriorityFilterProps = {
  register: UseFormRegister<FieldValues>
}

function PriorityFilter({register}: PriorityFilterProps) {
  const {data, isError, isLoading} = useGetPrioritiesQuery();
  const filter = useSelector(selectTasksFilter);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (data && filter.priority_id) {
      data.forEach(priority => {
        const isChecked = Array.isArray(filter.priority_id) ?
          filter.priority_id.some(id => id === priority.id) :
          filter.priority_id === priority.id;
        setValue(`priority.${priority.id}`, isChecked);
      });
    }
    if (data && !filter.priority_id) {
      data.forEach(priority => {
        setValue(`priority.${priority.id}`, false);
      });
    }
  }, [filter.priority_id, data, setValue]);

  if(!isLoading && !isError && data)
    return (
      <FilterComponent register={register} title="პრიორიტეტი" name="priority">
        {data.map(priority => {
          return <Checkbox
            key={priority.id}
            register={register}
            name={`priority.${priority.id}`}
            label={priority.name}
          />
        })}
      </FilterComponent>
    );
}

export default PriorityFilter;