import { useGetDepartmentsQuery } from "../../../services/api/departmentApi";
import { Employee } from "../../../types/api.types";
import './DetailEmployee.css'
function DetailEmployee(props: Employee) {
  const { data, isLoading } = useGetDepartmentsQuery();
  const { avatar, name, department } = props;
  if (!isLoading && data)
    return (
      <div className="detail_employee">
        <img src={avatar} alt="" />
        <div className="detail_employee_dets">
          <span>{data?.find((dep) => dep.id === department.id)?.name}</span>
          <p>{name}</p>
        </div>
      </div>
    );
}

export default DetailEmployee;
