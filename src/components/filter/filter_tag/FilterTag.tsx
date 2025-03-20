import { useSelector, useDispatch } from "react-redux";
import { useGetDepartmentsQuery } from "../../../services/api/departmentApi";
import { useGetEmployeesQuery } from "../../../services/api/employeeApi";
import { useGetPrioritiesQuery } from "../../../services/api/priorityApi";
import {
  selectTasksFilter,
  setDepartmentFilter,
  setEmployeeFilter,
  setPriorityFilter,
  resetFilters
} from "../../../store/filterSlice/taskFilterSlice";
import "./filterTag.css";
import x from "../../../assets/x.svg";
function FilterTag() {
  const filters = useSelector(selectTasksFilter);
  const dispatch = useDispatch();
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: priorities = [] } = useGetPrioritiesQuery();

  const removeDepartment = (idToRemove: number) => {
    const newDepartments = filters.department_id?.filter(
      (id) => id !== idToRemove
    );
    dispatch(
      setDepartmentFilter(newDepartments?.length ? newDepartments : undefined)
    );
  };

  const removeEmployee = (idToRemove: number) => {
    const newEmployees = filters.employee_id?.filter((id) => id !== idToRemove);
    dispatch(
      setEmployeeFilter(newEmployees?.length ? newEmployees : undefined)
    );
  };

  const removePriority = (idToRemove: number) => {
    const newPriorities = filters.priority_id?.filter(
      (id) => id !== idToRemove
    );
    dispatch(
      setPriorityFilter(newPriorities?.length ? newPriorities : undefined)
    );
  };

  const departmentTags =
    filters.department_id?.map((id) => (
      <p
        className="filter_tag"
        key={`dept-${id}`}
        onClick={() => removeDepartment(id)}
      >
        {departments.find((department) => department.id === id)?.name}
        <img src={x} alt="x" />
      </p>
    )) || [];

  const employeesTags =
    filters.employee_id?.map((id) => (
      <p
        className="filter_tag"
        key={`emp-${id}`}
        onClick={() => removeEmployee(id)}
      >
        {employees.find((employee) => employee.id === id)?.name}
        <img src={x} alt="x" />
      </p>
    )) || [];

  const prioritiesTags =
    filters.priority_id?.map((id) => (
      <p
        className="filter_tag"
        key={`pri-${id}`}
        onClick={() => removePriority(id)}
      >
        {priorities.find((priority) => priority.id === id)?.name}
        <img src={x} alt="x" />
      </p>
    )) || [];

  return (
    <section className="filter_tag_section">
      {departmentTags}
      {employeesTags}
      {prioritiesTags}
      {(departmentTags?.length > 0 || employeesTags?.length > 0 || prioritiesTags?.length > 0) && <span className="fiter_tag_reset" onClick={() => dispatch(resetFilters())}>გასუფთავება</span>}
    </section>
  );
}

export default FilterTag;
