import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import VideoLists from "./VideoLists";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../utils/searchSlice";

function Home() {
  const {isLeftSidebarOpen} = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  const dispatch = useDispatch();

  // Reset search text on Home mount to show all videos
  useEffect(() => {
    dispatch(setSearchText(""));
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/video/categories");
        setCategories(["All", ...res.data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={`pt-20 ${isLeftSidebarOpen? "ml-60 " : "ml-1 sm:ml-20 "}  `}>
      {/* Category Filter */}
      <div className="flex gap-3 mb-6 overflow-x-auto  ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full border transition whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos */}
      <VideoLists selectedCategory={selectedCategory} />
    </div>
  );
}

export default Home;





