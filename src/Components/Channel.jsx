import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/UserContext";

function Channel() {
  const { id: Owner } = useParams();
  const [channels, setChannels] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);
  const user = loggedInUser || {};
  const channel = channels[0];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/channel?Owner=${Owner}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Channel fetch failed");
        setChannels(data);
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    };
    fetchChannel();
  }, [Owner]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        if (channels.length > 0) {
          const channelIds = channels.map((c) => c._id).join(",");
          const res = await fetch(`http://localhost:3000/api/channelvideo?channelId=${channelIds}`);
          const videos = await res.json();
          if (!res.ok) throw new Error(videos.message || "Video fetch failed");
          setChannelVideos(videos);
        }
      } catch (err) {
        console.error("Error fetching channel videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannelVideos();
  }, [channels]);

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/video/${videoId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete video");

      setChannelVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      console.error("Error deleting video:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 lg:pl-60 p-4 flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="pt-20 lg:pl-60 p-4 flex flex-col justify-center items-center gap-6 bg-gray-100 rounded-md shadow-md min-h-screen">
        <img
          src={user?.AvatarUrl || "/default-avatar.png"}
          alt="profile"
          className="rounded-full w-24 h-24 shadow-md"
        />
        <div className="text-center">
          <h1 className="text-xl font-bold">{user?.FullName || "User"}</h1>
          <p className="text-sm text-gray-600">{user?.Email}</p>
        </div>
        <Link
          to={`/createchannel/${user._id}`}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Create Channel
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pl-60 p-4 max-w-7xl mx-auto">
      {/* Banner */}
      {channel?.ChannelBannerUrl && (
        <img
          src={channel.ChannelBannerUrl}
          alt="Channel Banner"
          className="w-full h-48 sm:h-60 object-cover rounded-lg shadow-md"
        />
      )}

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">
        <img
          src={channel?.Owner?.AvatarUrl || "/default-avatar.png"}
          alt="profile"
          className="w-24 h-24 sm:w-36 sm:h-36 rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">
            {channel?.ChannelName || "Channel Name"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {channel?.Owner?.Email || "user@example.com"} • 117K Subscribers • 800 Videos
          </p>
          <p className="mt-3 text-gray-700 max-w-prose">{channel?.Description}</p>

         <div className="mt-4 flex flex-wrap gap-3">
  {/* Show Subscribe button if NOT owner */}
  {user._id !== channel?.Owner?._id && (
    <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
      Subscribe
    </button>
  )}

  {/* Show owner-only buttons */}
  {user._id === channel?.Owner?._id && (
    <>
      <Link
        to={`/UploadVideo/${channel?._id}`}
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Upload Video
      </Link>
      <Link
        to={`/editchannel/${channel?._id}`}
        className="bg-gray-200 text-black px-5 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Customize Channel
      </Link>
    </>
  )}
</div>

        </div>
      </div>

      {/* Videos */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        {channelVideos.length === 0 ? (
          <p className="text-gray-600">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {channelVideos.map((video) => (
              <div key={video._id} className="bg-white rounded-md shadow-sm p-3 relative">
                <img
                  src={video.thumbnailUrl}
                  alt="Video Thumbnail"
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 font-medium text-sm sm:text-base truncate">
                  {video.title || "Untitled Video"}
                </p>

                {/* Edit/Delete if user is owner */}
                {user._id === video.Owner._id && (
                  <div className="flex gap-3 mt-3">
                    <Link
                      to={`/editvideo/${video._id}`}
                      className="text-sm text-blue-500 underline hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="text-sm text-red-500 underline hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;




