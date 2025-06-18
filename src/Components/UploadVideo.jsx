import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UploadVideo() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const { channelId } = useParams(); //Correct param
  const navigate = useNavigate();

  async function handleUploadVideo(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://you-tube-backend-twts.onrender.com/api/AddVideo/${channelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // if using auth
        },
        body: JSON.stringify({
          title: videoTitle,
          thumbnailUrl: videoThumbnailUrl,
          videoUrl,
          category: videoCategory,
          description: videoDescription,
        }),
      });

      const result = await response.json();
     

      if (response.ok) {
        navigate("/");
      } else {
        alert(result.message || "Failed to upload video");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Network error. Please try again later.");
    }
  }

  return (
    <div className="mt-20 ml-20 flex flex-col items-center justify-center gap-5 bg-slate-400 p-3">
      <div>
        <label htmlFor="Title">Video Title:</label>
        <input
          type="text"
          id="Title"
          placeholder="Enter Your Video Title"
          className="ring-1 w-[50vw] p-2"
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ThumbnailUrl">Thumbnail URL:</label>
        <input
          type="text"
          id="ThumbnailUrl"
          placeholder="Enter thumbnail URL"
          className="ring-1 w-[50vw] p-2"
          onChange={(e) => setVideoThumbnailUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="VideoUrl">Video URL:</label>
        <input
          type="text"
          id="VideoUrl"
          placeholder="Enter Video URL"
          className="ring-1 w-[50vw] p-2"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Category">Category:</label>
        <input
          type="text"
          id="Category"
          placeholder="Enter Video Category"
          className="ring-1 w-[50vw] p-2"
          onChange={(e) => setVideoCategory(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="Description">Description:</label>
        <textarea
          id="Description"
          placeholder="Enter Video Description"
          className="ring-1 w-[50vw] p-2"
          onChange={(e) => setVideoDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUploadVideo}
      >
        Upload Video
      </button>
    </div>
  );
}

export default UploadVideo;

