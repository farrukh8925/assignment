import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer";
import Content from "../../Components/Content";
import Toolbar from "../../Components/Toolbar";
import { AppContext } from "../../context/app.context";

// Import style
import "./style.css";

/**
 * Dashboard view presents the user with a column on the left listing 'users'
 * And a scrollable list on the right column representing posts by the user.
 * Divided into separate components.
 */
const DashboardView: React.FC = () => {
  // Set up the context API
  const { getPosts, pageNumber, selectedAuthor, setSelectedAuthor } =
    useContext(AppContext);
  // Set up the location hook
  const location = useLocation();

  useEffect(() => {
    const username = new URLSearchParams(location.search).get("username");
    if (username !== selectedAuthor && username) {
      setSelectedAuthor(username);
    }
  }, [location, selectedAuthor, setSelectedAuthor]);

  useEffect(() => {
    getPosts(pageNumber);
  }, []);

  return (
    <div className="dashboard-view">
      <Toolbar />
      <Content />
      <Footer />
    </div>
  );
};

DashboardView.displayName = "DashboardView";

export default DashboardView;
