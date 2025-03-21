import { useRef, useState } from "react";
import { useGetTaskCommentsQuery } from "../../services/api/commentApi";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";

function Comments({ id }: { id: number }) {
  const { data, isLoading } = useGetTaskCommentsQuery(id);

  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleReplyClick = (commentId: number) => {
    setParentId(commentId);
    inputRef.current?.focus();
  };

  if (!isLoading)
    return (
      <section className="comments">
        <CommentInput
          assignmentId={id}
          parentId={parentId}
          inputRef={inputRef}
        />
        <section>
          <div className="comments_header">
            <h4>კომენტარები</h4>
            <span>{data?.length}</span>
          </div>
          {data?.map((comment) => (
            <CommentCard
              key={comment.id}
              {...comment}
              onClick={handleReplyClick}
            />
          ))}
        </section>
      </section>
    );
}

export default Comments;
