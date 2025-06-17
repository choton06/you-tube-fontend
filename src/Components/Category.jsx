import React, { useState, useRef } from "react";
import "../CssStyle/scroll.css"
function Category() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Technology",
    "Movies",
    "Comedy",
    "Live",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Technology",
    "Movies",
    "Comedy",
    "Live",
  ];

  const containerRef = useRef(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Add mouse sliding logic
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    container.isMouseDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container.isMouseDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 2; // Adjust the multiplier for speed
    container.scrollLeft = container.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    container.isMouseDown = false;
  };

  return (
    <div
      className="w-screen overflow-x-auto whitespace-nowrap bg-gray-100 py-2 border-b border-gray-300"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex space-x-4 px-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-full border ${
              activeFilter === filter
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            } transition`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;
