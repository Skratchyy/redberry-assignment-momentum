import { useParams } from "react-router-dom";
import './Assignment.css';
import Comments from "../components/comments/Comments";

function Assignment() {
  const params = useParams();
  const id = Number(params.id)!;


  return (
    <>
    <Comments id={id} />
    </>
  );
}

export default Assignment;
