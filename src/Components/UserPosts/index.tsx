import React, { useContext } from "react";
import { AppContext } from "../../context/app.context";

// Import style
import "./style.css";

/**
 * Dislpays the posts made by a selected user.
 * If a user is not selected, display a message.
 */
const UserPosts: React.FC = () => {
  const { posts, selectedAuthor, postFilter, recentFirst } =
    useContext(AppContext);

  const renderPosts = () => {
    if (selectedAuthor && posts[selectedAuthor]) {
      return posts[selectedAuthor]
        .filter((post) => {
          if (postFilter) {
            return post.message.toLocaleLowerCase()
              .includes(postFilter.toLocaleLowerCase());
          }
          return post;
        })
        .sort((a, b) => {
          if (recentFirst) {
            return b.created_time?.localeCompare(a.created_time);
          }
          return a.created_time?.localeCompare(b.created_time);
        })
        .map((post) => (
          <div key={`post-${selectedAuthor}-${post.id}`} className="post-card">
            <div className="post-card--time">{post.created_time}</div>
            <div className="post-card-message">{post.message}</div>
          </div>
        ));
    }

    return <div>No Selection</div>;
  };

  return <div>{renderPosts()}</div>;
};

UserPosts.displayName = "UserPosts";
export default UserPosts;
