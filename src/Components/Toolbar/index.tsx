import React, { ChangeEventHandler, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/app.context";

// Import stylesheet
import "./style.css";

/**
 * Toolbar displays the search fields for the left column and right column.
 * As well as the sorting buttons.
 */
const Toolbar: React.FC = () => {
  const { updateUserFilter, updatePostFilter, recentFirst, updateRecentFirst } =
    useContext(AppContext);

  const history = useHistory();

  /**
   * On update user search filter
   */
  const handleUpdateUserFilter: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => updateUserFilter(event.target.value);

  /**
   * On update post search filter
   */
  const handleUpdatePostSearchFilter: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => updatePostFilter(event.target.value);

  /**
   * Sort user posts by ascending order
   */
  const handleShowAscending = () => updateRecentFirst(true);

  /**
   * Sort user posts by descending order
   */
  const handleShowDescending = () => updateRecentFirst(false);

  /**
   * Logout user.
   * CLear local storage and redirect
   */
  const handleLogout = () => {
    localStorage.clear();
    history.replace("/");
  };

  return (
    <div className="toolbar">
      <div className="toolbar--left">
        <input
          type="text"
          id="search-users"
          className="input-toolbar"
          placeholder="Search Senders"
          onChange={handleUpdateUserFilter}
        />
      </div>
      <div className="toolbar--right">
        <div className="toolbar--right__sort">
          <button
            type="button"
            className={`sort-button ${recentFirst && "selected"}`}
            onClick={handleShowAscending}
          >
            <img src="../chevron-arrow-down.svg" alt="ascending" />
          </button>
          <button
            type="button"
            className={`sort-button ${!recentFirst && "selected"}`}
            onClick={handleShowDescending}
          >
            <img src="../chevron-arrow-up.svg" alt="descending" />
          </button>
        </div>
        <input
          type="text"
          id="search-posts"
          className="input-toolbar"
          placeholder="Search Posts"
          onChange={handleUpdatePostSearchFilter}
        />
      </div>
      <button className="primary-button margin-left" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Toolbar;
