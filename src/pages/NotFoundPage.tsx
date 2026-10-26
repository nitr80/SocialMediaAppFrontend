import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="card">
        <p>Page not found</p>
        <Link to="/feed">Go to feed</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
