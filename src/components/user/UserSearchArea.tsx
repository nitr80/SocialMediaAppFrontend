import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import type { User } from "../../types/user";
import "./UserSearchArea.css";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import PageLoader from "../ui/PageLoader";

const UserSearchArea = () => {
  const { searchUsername } = useUsers();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    const fetchUsers = async () => {
      setIsSearching(true);
      try {
        const users = await searchUsername(debouncedQuery, controller.signal);
        if (!isCurrent) {
          return;
        }
        setSearchResults(users ? users : []);
      } catch (error) {
        if (!isCurrent || controller.signal.aborted) {
          return;
        }

        console.error("Failed to search users:", error);
        setSearchResults([]);
      } finally {
        if (isCurrent) {
          setIsSearching(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [debouncedQuery, searchUsername]);

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

      {!isSearching &&
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
      {isSearching && <PageLoader />}
    </div>
  );
};

export default UserSearchArea;
