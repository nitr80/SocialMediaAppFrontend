import "./StatusMessage.css";

type Props = {
  message: string | null;
  type: "error" | "success" | "info";
};

const StatusMessage = ({ message, type }: Props) => {
  if (!message) return null;

  return (
    <div
      className={`status-message status-message--${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
