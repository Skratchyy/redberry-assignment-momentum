import AssignmentCard from "../../components/card/AssignmentCard";
import { Status, Task } from "../../types/api.types";
import './homeComponent.css'
type HomeComponent = {
  tasks: Task[];
  status: Status
}

function HomeComponent({tasks, status}: HomeComponent) {
  const borderColors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"]

  return (
  <section className="task_section">
    <div className="task_section_header" style={{backgroundColor: borderColors[status.id]}}>{status.name}</div>
    {tasks.map((task, id) => {
      if(task.status.id === status.id)
      {
        return <AssignmentCard key={id} task={task}/>
      }
    })}
  </section>
  )
}

export default HomeComponent;