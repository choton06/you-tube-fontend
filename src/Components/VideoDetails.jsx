import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { format } from "timeago.js";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const VideoDetails = () => {
  const { videoId } = useParams();
  const { isLeftSidebarOpen } = useOutletContext(); // ✅ Get sidebar state
  const { loggedInUser } = useContext(UserContext);

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [unlikeCount, setUnlikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`https://you-tube-backend-by-p.onrender.com/api/video?videoId=${videoId}`);
        const videoData = res.data[0];
        setVideo(videoData);
        setLikeCount(videoData.likes?.length || 0);
        setUnlikeCount(videoData.unlikes?.length || 0);

        const relatedRes = await axios.get(`https://you-tube-backend-by-p.onrender.com/api/video/related/${videoId}`);
        setRelatedVideos(relatedRes.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://you-tube-backend-by-p.onrender.com/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async () => {

      if (!loggedInUser) {
     toast.error("Please log in to add a comment the video.");
    
    return;
  }

    if (!commentText.trim()) return;
    try {
      const res = await axios.post("https://you-tube-backend-by-p.onrender.com/postcomment", {
        VideoId: videoId,
        text: commentText,
        userId: loggedInUser?._id,
      });
      setComments([res.data, ...comments]);
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLikeToggle = async () => {

     if (!loggedInUser) {
    toast.error("Please log in to dislike the video.");
    
    return;
  }
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`https://you-tube-backend-by-p.onrender.com/api/${videoId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      if (userReaction === "like") {
        setLikeCount((prev) => prev - 1);
        setUserReaction(null);
      } else {
        setLikeCount((prev) => prev + 1);
        if (userReaction === "unlike") setUnlikeCount((prev) => prev - 1);
        setUserReaction("like");
      }
    }
  };

  const handleUnlikeToggle = async () => {

 if (!loggedInUser) {
    toast.error("Please log in to dislike the video.");
  
    return;
  }

    const token = localStorage.getItem("accessToken");
    const res = await fetch(`https://you-tube-backend-by-p.onrender.com/api/${videoId}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      if (userReaction === "unlike") {
        setUnlikeCount((prev) => prev - 1);
        setUserReaction(null);
      } else {
        setUnlikeCount((prev) => prev + 1);
        if (userReaction === "like") setLikeCount((prev) => prev - 1);
        setUserReaction("unlike");
      }
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await axios.put(`https://you-tube-backend-by-p.onrender.com/editcomment/${commentId}`, { text: editText });
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: editText } : c))
      );
      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://you-tube-backend-by-p.onrender.com/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!video) return <div className="text-center py-20">Loading...</div>;

  const marginClass = isLeftSidebarOpen ? "ml-60" : "ml-20";

  return (
    <div className={`pt-[72px] px-4 transition-all duration-300 ${marginClass} flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto`}>
      {/* Main Video Section */}
      <div className="w-full lg:w-2/3">
        <div className="w-full aspect-video mb-4">
          <iframe
            src={video.videoUrl}
            className="w-full h-full rounded-xl"
            title={video.title}
            allowFullScreen
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold mb-2">{video.title}</h1>
        <div className="text-gray-700 text-sm mb-4">{video.description}</div>

        {/* Channel Info and Like Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-t border-b">
          <div className="flex items-center gap-3">
            <img
              src={video?.Owner?.AvatarUrl || "/default-avatar.png"}
              alt="channel avatar"
              className="w-10 h-10 rounded-full border"
            />
         <Link to={`/Channel/${video?.Owner?._id}`}> <div>
              <p className="font-semibold">{video?.Owner?.FullName}</p>
              <p className="text-sm text-gray-500">{video?.channelId?.ChannelName}</p>
            </div></Link>   
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLikeToggle}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-3 py-1.5 rounded-full"
            >
              👍 Like {likeCount}
            </button>
            <button
              onClick={handleUnlikeToggle}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-3 py-1.5 rounded-full"
            >
              👎 Dislike {unlikeCount}
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="my-4">
          <div className="flex items-start gap-3">
            <img
              src={loggedInUser?.AvatarUrl || "/default-avatar.png"}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                rows={2}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Add a public comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <img
                src={comment.userId?.AvatarUrl || "/default-avatar.png"}
                className="w-10 h-10 rounded-full"
                alt="user"
              />
              <div className="flex-1 border-b pb-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>{comment.userId?.FullName || "User"}</span>
                  <span className="text-gray-500">{format(comment.createdAt)}</span>
                </div>
                {editingCommentId === comment._id ? (
                  <>
                    <textarea
                      className="w-full border rounded mt-1 p-1 text-sm"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="flex gap-2 mt-1 text-sm">
                      <button onClick={() => handleEditComment(comment._id)} className="text-blue-600">Save</button>
                      <button onClick={() => setEditingCommentId(null)} className="text-gray-600">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm mt-1">{comment.text}</p>
                    {comment.userId?._id === loggedInUser?._id && (
                      <div className="flex gap-2 mt-1 text-sm text-gray-600">
                        <button onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditText(comment.text);
                        }}>Edit</button>
                        <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Videos */}
      <div className="w-full lg:w-1/3 space-y-4">
        <h2 className="text-lg font-semibold pt-14">Related Videos</h2>
        {relatedVideos.map((v) => (
          <Link key={v._id} to={`/video/${v._id}`} className="flex gap-3 hover:bg-gray-50 p-2 rounded">
            <div className="w-32 h-20 overflow-hidden rounded bg-gray-300">
              <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{v.title}</p>
              <p className="text-xs text-gray-500">{v.channelId?.ChannelName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoDetails;


















