
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditChannel() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [channelData, setChannelData] = useState({
    ChannelName: "",
    Description: "",
    ChannelBannerUrl: ""
  });

  // Load existing channel data
  useEffect(() => {
    async function fetchChannel() {
      try {
        const res = await axios.get(`https://you-tube-backend-by-p.onrender.com/api/channel?_id=${channelId}`);
        setChannelData(res.data[0]); // assuming it's an array
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    }
    fetchChannel();
  }, [channelId]);

  const handleChange = (e) => {
    setChannelData({ ...channelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://you-tube-backend-by-p.onrender.com/api/channel/${channelId}`, channelData);
      navigate(`/Channel/${channelData.Owner._id}`);

    } catch (error) {
      console.error("Error updating channel:", error);
    }
  };

  return (
    <div className="pt-20 lg:pl-60 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Channel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="ChannelName"
          placeholder="Channel Name"
          value={channelData.ChannelName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={channelData.Description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
        <input
          type="text"
          name="ChannelBannerUrl"
          placeholder="Banner Image URL"
          value={channelData.ChannelBannerUrl}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditChannel;
