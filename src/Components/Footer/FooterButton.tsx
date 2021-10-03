import React, { useContext } from "react";
import { AppContext } from "../../context/app.context";

// Import style
import "./style.css";

type FooterButtonProps = {
  text: String;
};

/**
 * Displays buttons on the footer for pagination
 */
const FooterButton: React.FC<FooterButtonProps> = ({ text }) => {
  const { pageNumber, updatePageNumber } = useContext(AppContext);

  /**
   * Change Page
   */
  const handleChangePage = () => updatePageNumber(Number(text));

  return (
    <button
      className={`footer-button ${
        Number(pageNumber) === Number(text) && "selected"
      }`}
      onClick={handleChangePage}
    >
      {text}
    </button>
  );
};

FooterButton.displayName = "FooterButton";

export default FooterButton;
