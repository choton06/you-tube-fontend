import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
function VideoLists({ selectedCategory = "All" }) {
  const [videos, setVideos] = useState([]);
  const [channelMap, setChannelMap] = useState({});
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const searchText = useSelector((state) => state.search.text || "");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: videoData } = await axios.get("http://localhost:3000/api/Video");

        if (Array.isArray(videoData)) {
          const uniqueChannelIds = [...new Set(videoData.map((v) => v.channelId?._id || v.channelId))];
          const uniqueUserIds = [...new Set(videoData.map((v) => v.Owner?._id || v.Owner))];

          const [channelRes, userRes] = await Promise.all([
            Promise.all(uniqueChannelIds.map((id) => axios.get(`http://localhost:3000/api/channels/${id}`))),
            Promise.all(uniqueUserIds.map((id) => axios.get(`http://localhost:3000/user/${id}`))),
          ]);

          const newChannelMap = {};
          const newUserMap = {};

          channelRes.forEach((res, idx) => {
            if (res.data) newChannelMap[uniqueChannelIds[idx]] = res.data;
          });

          userRes.forEach((res, idx) => {
            if (res.data) newUserMap[uniqueUserIds[idx]] = res.data;
          });

          setVideos(videoData);
          setChannelMap(newChannelMap);
          setUserMap(newUserMap);
        } else {
          throw new Error("Invalid video data from API.");
        }
      } catch (err) {
        console.error("Error loading videos:", err);
        setError(err?.response?.data?.message || err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return <p className="text-center mt-10 min-h-screen">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500 min-h-screen">Failed to load videos: {error}</p>;

  if (filteredVideos.length === 0)
    return <p className="text-center mt-10 min-h-screen">No videos found.</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredVideos.map((video) => {
        const channel = channelMap[video.channelId?._id || video.channelId];
        const user = userMap[video.Owner?._id || video.Owner];

        return (
          <Link key={video._id} to={`/video/${video._id}`}>
            <div className="rounded-lg shadow hover:shadow-lg transition bg-white">
              <div className="relative">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              
              </div>
              <div className="flex items-start gap-2 p-3">
                <img
                  src={user?.AvatarUrl || "/default-avatar.png"}
                  alt="channel"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-gray-500">{channel?.ChannelName || "Unknown Channel"}</p>
                 <p className="text-xs text-gray-400">
                  {video.views || 0} views • {format(video.createdAt)}
                </p>
 
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default VideoLists;














