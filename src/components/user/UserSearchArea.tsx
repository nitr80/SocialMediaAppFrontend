import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import type { User } from "../../types/user";
import "./UserSearchArea.css";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";

const UserSearchArea = () => {
  const { loading, searchUsername } = useUsers();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await searchUsername(query);
      setSearchResults(users ? users : []);
    };

    fetchUsers();
  }, [query, searchUsername]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Search users..."
        aria-label="Search users"
      />

      {!loading &&
        searchResults.map((user) => (
          <Link
            key={user.id}
            to={`/profile/${user.id}`}
            className="user-search-result"
            aria-label={`View ${user.username}'s profile`}
          >
            <Avatar user={user} alt="" />
            <span>{user.username}</span>
          </Link>
        ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default UserSearchArea;
