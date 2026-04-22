import "./PostCard.css";

interface Props {
  key: number;
  content: string;
  authorName: string;
  createdAt: string;
  likeCount: number;
  // profilePicture
}
const PostCard = ({ content, authorName, createdAt, likeCount }: Props) => {
  const toTimeOrDate = (dateTime: string) => {
    const date = new Date(dateTime);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString();
  };

  return (
    <div className="post-card">
      <div className="profile-picture"></div>
      <div>
        <p className="creation-date-title">{toTimeOrDate(createdAt)}</p>
        <p className="author-title">{authorName}</p>
        <p className="post-content-text">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
