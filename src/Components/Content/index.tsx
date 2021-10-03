import React from "react";
import { Route } from "react-router-dom";
import UserPosts from "../UserPosts";
import UserList from "../UserList";

// Import style
import "./style.css";

/**
 * Content component houses the left hand users component
 * And also the right hand user posts component
 */
const Content: React.FC = () => {
  return (
    <div className="posts">
      <div className="posts--left">
        <UserList />
      </div>
      <div className="posts--right">
        <Route path="/dashboard/user" component={UserPosts} />
      </div>
    </div>
  );
};

Content.displayName = "Content";

export default Content;
