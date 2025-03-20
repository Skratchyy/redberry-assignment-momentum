import { Priority } from "../../../types/api.types";
import './cardComponentsStyle.css';

function PriorityTag({icon, name, id}: Priority) {
  return <div className={`priority_tag_${id}`}>
    <img src={icon} alt={name} />
    <p>{name}</p>
  </div>
}

export default PriorityTag;