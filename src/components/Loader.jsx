import React from "react";
import "./Loader.css"; // Import the CSS for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      {/* You can add text or other elements here, e.g., <p>Loading...</p> */}
    </div>
  );
};

export default Loader;
