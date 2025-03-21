import { useForm } from "react-hook-form";
import PrimaryButton from "../buttons/PrimaryButton";
import "./CommentInput.css";
import { useCreateCommentMutation } from "../../services/api/commentApi";
import { CreateCommentRequest } from "../../types/api.types";
import { RefObject, useEffect } from "react";

type CommentInputProps = {
  parentId?: number;
  assignmentId: number;
  inputRef: RefObject<HTMLTextAreaElement | null>;
};

function CommentInput({ assignmentId, parentId, inputRef }: CommentInputProps) {
  const { register, handleSubmit, setValue } = useForm<CreateCommentRequest>({
    defaultValues: { parent_id: parentId },
  });

  const [createComment] = useCreateCommentMutation();
  useEffect(() => {
    setValue("parent_id", parentId);
  }, [parentId, setValue]);

  const { ref, ...rest } = register("text");

  const submitHandler = (data: CreateCommentRequest) => {
    if (data.text) {
      createComment({
        comment: { ...data, parent_id: parentId },
        taskId: assignmentId,
      });
      setValue("text", "");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="comment_input_form">
      <textarea
        className="comment_input"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        placeholder="დატოვე კომენტარი"
      />
      <PrimaryButton type="submit" title="დააკომენტარე" icon={false} oval />
    </form>
  );
}

export default CommentInput;
