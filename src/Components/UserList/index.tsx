import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/app.context";

// Import style
import "./style.css";

/**
 * Displays the list of users from which we have received messages on a page.
 * Clicking user name opens up messages from the user
 */
const UserList: React.FC = () => {
  const { posts, userFilter, selectedAuthor } = useContext(AppContext);
  // History hook
  const { push } = useHistory();

  return (
    <div className="users-list">
      {Object.keys(posts)
        .filter((user) => {
          if (userFilter) {
            return user
              .toLocaleLowerCase()
              .includes(userFilter.toLocaleLowerCase());
          }
          return user;
        })
        .sort((a, b) => a.localeCompare(b))
        .map((author, index) => (
          <div
            key={`author-${index}`}
            className={`users-list--card ${
              selectedAuthor === author && "selected"
            }`}
            onClick={() => {
              push(`/dashboard/user?username=${author}`);
            }}
          >
            <div className="author">{author}</div>
            <div className="post-count">{posts[author].length}</div>
          </div>
        ))}
    </div>
  );
};

UserList.displayName = "UserList";

export default UserList;
