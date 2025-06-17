import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditVideo() {
  const { id: videoId } = useParams(); // ✅ clean destructuring
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/Editvideo/${videoId}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err.message);
      }
    };

    fetchVideo();
  }, [videoId]);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit updated video
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/UpdateVideo/${videoId}`, formData);
      navigate(`/YourChannel/${formData.Owner}`);
    } catch (err) {
      console.error("Error updating video:", err.message);
    }
  };

  if (loading) {
    return <div className="p-10 text-lg">Loading video...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
          <input
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditVideo;


