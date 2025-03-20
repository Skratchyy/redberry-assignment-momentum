import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import Checkbox from "../../checkbox/Checkbox";
import FilterComponent from "./FilterComponent";
import { useGetDepartmentsQuery } from "../../../services/api/departmentApi";
import { useSelector } from "react-redux";
import { selectTasksFilter } from "../../../store/filterSlice/taskFilterSlice";
import { useEffect } from "react";

type DepartmentProps = {
  register: UseFormRegister<FieldValues>;
};

function DepartmentFilter({ register }: DepartmentProps) {
  const filter = useSelector(selectTasksFilter);
  const { data, isError, isLoading } = useGetDepartmentsQuery();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (data) {
      data.forEach(department => {
        const isChecked = Array.isArray(filter.department_id) &&
          filter.department_id.some(id => id === department.id);
        setValue(`departments.${department.id}`, !!isChecked);
      });
    }
  }, [filter.department_id, data, setValue]);


  if (!isLoading && !isError && data)
    return (
      <FilterComponent
        register={register}
        title="დეპარტამენი"
        name="departments"
      >
        {data.map((dep) => {
          return (
            <Checkbox
              key={dep.id}
              register={register}
              name={`departments.${dep.id}`}
              label={dep.name}
            />
          );
        })}
      </FilterComponent>
    );
}

export default DepartmentFilter;
