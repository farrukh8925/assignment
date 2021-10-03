import React from "react";
import FooterButton from "./FooterButton";

// Import the style
import "./style.css";

/**
 * Footer component to display pagination controls
 */
const Footer: React.FC = () => {
  // Create an array of 10 numbers
  const pages: Number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="footer">
      {pages.map((page: Number) => (
        <FooterButton text={String(page)} key={`page-${page}`} />
      ))}
    </div>
  );
};

Footer.displayName = "Footer";
export default Footer;
