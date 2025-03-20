import { useGetTaskCommentsQuery } from "../../services/api/commentApi";
import { Task } from "../../types/api.types";
import DateField from "./card_components/DateIField";
import DepartmentTag from "./card_components/DepartmentTag";
import PriorityTag from "./card_components/PriorityTag";
import commentSVG from '../../assets/Comments.png'
import { useNavigate } from "react-router-dom";
import './assignmentCard.css'

type assignmentProps = {
  task: Task
}

function AssignmentCard({task}: assignmentProps) {
  const {data, isLoading} = useGetTaskCommentsQuery(task.id);
  const navigate = useNavigate();
  const borderColors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"]

  if(!isLoading)
  return <div className="assignment_card" style={{borderColor: borderColors[task.status.id]}} onClick={() => navigate(`/assignment/${task.id}`)}>
    <section className="assignment_card_first_section">
      <div>
        <PriorityTag icon={task.priority.icon} id={task.priority.id} name={task.priority.name}/>
        <DepartmentTag department={task.department.name} />
      </div>
      <DateField date={new Date(task.due_date)} />
    </section>
    <section className="assignment_card_second_section">
      <h5>{task.name}</h5>
      <p>{task.description.length > 100 ? `${task.description.slice(100)} ...` : task.description}</p>
    </section>
    <section className="assignment_card_third_section">
      <img src={task.employee.avatar} alt="" />
      <span><img src={commentSVG} alt="Comments"/>{data?.length}</span>
    </section>
  </div>;
}

export default AssignmentCard;
