import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";
import "./UserSearchArea.css";
import { useNavigate } from "react-router";

const UserSearchArea = () => {
  const { userLoading, searchUsername } = useUsers();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

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

      {!userLoading && searchResults.map((user) => (
        <div className="user-search-result" onClick={() => (navigate(`/profile/${user.id}`))}>
          <img
            className="profile-picture"
            src={
              user.profileImageUrl
                ? `${API_URL}${user.profileImageUrl}`
                : "/user.png"
            }
            alt={`${user.username}'s profile`}
          />
          <span>{user.username}</span>
        </div>
      ))}
      {userLoading && <p>Loading...</p>}

    </div>
  );
};

export default UserSearchArea;
