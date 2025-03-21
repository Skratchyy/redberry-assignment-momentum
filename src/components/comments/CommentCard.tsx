import { Comment } from "../../types/api.types";
import ReplyButton from "../buttons/ReplyButton";
import "./CommentInput.css";
type CommentCardProps = Comment & { onClick: (id: number) => void };
function CommentCard(props: CommentCardProps) {
  const {
    text,
    author_avatar,
    author_nickname,
    parent_id,
    id,
    onClick,
    sub_comments,
  } = props;
  return (
    <>
      <div className="comments_card_wrapper">
        <div className="comments_card_image">
          <img src={author_avatar} />
        </div>
        <div className="comments_card_details">
          <p>{author_nickname}</p>
          <span>{text}</span>
          <div>
            {!parent_id && (
              <ReplyButton title="უპასუხე" onClick={() => onClick(id)} />
            )}
          </div>
          {sub_comments &&
            sub_comments.map((subcmt) => (
              <div className="comments_card_wrapper">
                <div className="comments_card_image">
                  <img src={subcmt.author_avatar} />
                </div>
                <div className="comments_card_details">
                  <p>{subcmt.author_nickname}</p>
                  <span>{subcmt.text}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CommentCard;
