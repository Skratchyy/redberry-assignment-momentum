import { useParams } from "react-router-dom";
import "./Assignment.css";
import Comments from "../components/comments/Comments";
import { useGetTaskQuery } from "../services/api/taskApi";
import DetailEmployee from "../components/details/detailcomponents/DetailEmployee";
import PriorityTag from "../components/card/card_components/PriorityTag";
import DepartmentTag from "../components/card/card_components/DepartmentTag";
import chartLogo from "../assets/pie-chart.svg";
import employeeLogo from "../assets/employee.svg";
import calendarLogo from "../assets/date.svg";
import { useForm } from "react-hook-form";
import { useUpdateTaskStatusMutation } from "../services/api/taskApi";
import { useEffect } from "react";
import { useGetStatusesQuery } from "../services/api/statusApi";

const dayNames = ["ორშ", "სამ", "ოთხ", "ხუთ", "შაბ", "კვი"];

const formatDate = (date: Date): string => {
  if (!date) return "";
  const dayOfWeek = date.getDay();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${dayNames[dayOfWeek]} - ${day}/${month}/${year}`;
};

function Assignment() {
  const { register, watch } = useForm({ mode: "onChange" });
  const {data: status = []} = useGetStatusesQuery()
  const params = useParams();
  const id = Number(params.id)!;
  const { data, isLoading } = useGetTaskQuery(id);
  const selectedDepartment = watch("department");
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (selectedDepartment) {
      updateTaskStatus({
        id: id,
        request: { status_id: Number(selectedDepartment) }
      });
    }
  }, [selectedDepartment, id, updateTaskStatus]);

  if (!isLoading && data) {
    const date = formatDate(new Date(data?.due_date));

    return (
      <section className="assignment_main_section">
        <div style={{ width: "53%" }}>
          <div className="assignment_descriotion">
            <div className="assignment_description_tags">
              <PriorityTag {...data.priority} />
              <DepartmentTag department={data.department.name} />
            </div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
          <div className="assignment_details_wrapper">
            <h3>დავალების დეტალები</h3>
            <div className="assignment_details">
              <div className="assigment_detail_left">
                <img src={chartLogo} alt="Status" />
                <span>სტატუსი</span>
              </div>
              <div className="assigment_detail_right">
                <select className="mySelect" {...register("department")}>
                  <option value={data.status.id}>{data.status.name}</option>
                  {status.map((status) => (
                    <option
                      key={status.id}
                      value={status.id}
                      selected={status.name === data.department.name}
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="assignment_details">
              <div className="assigment_detail_left">
                <img src={employeeLogo} alt="Employee" />
                <span>თანამშრომელი</span>
              </div>
              <div className="assigment_detail_right">
                <DetailEmployee {...data.employee} />
              </div>
            </div>
            <div className="assignment_details">
              <div className="assigment_detail_left">
                <img src={calendarLogo} alt="Due date" />
                <span>დავალების ვადა</span>
              </div>
              <div className="assigment_detail_right">
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Comments id={id} />
        </div>
      </section>
    );
  }

  return <div>Loading...</div>;
}

export default Assignment;