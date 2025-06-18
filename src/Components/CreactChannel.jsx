import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext.js";

function CreateChannel() {
  const [ChannelName, setChannelName] = useState("");
  const [ChannelBanner, setChannelBanner] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  const { loggedInUser } = useContext(UserContext);
  const userId = loggedInUser?._id;

  const navigate = useNavigate();
  const params = useParams();

  async function HandleAddChannel(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://you-tube-backend-by-p.onrender.com/api/AddChannel/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ChannelName: ChannelName,
            ChannelBannerUrl: ChannelBanner,
            Description: channelDescription,
          }),
        }
      );

      const result = await response.json();
      if (result) {
        navigate(`/Channel/${userId}`);
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  }

  return (
    <div className="pt-24 px-4 sm:px-10 lg:pl-64 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4">
          Create Your Channel
        </h1>

        <div>
          <label
            htmlFor="channelName"
            className="block text-gray-700 font-medium mb-2"
          >
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            placeholder="Enter Channel Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="ChannelBanner"
            className="block text-gray-700 font-medium mb-2"
          >
            Channel Banner URL
          </label>
          <input
            type="text"
            id="ChannelBanner"
            placeholder="Enter Banner URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setChannelBanner(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="channelDescription"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="channelDescription"
            placeholder="Enter Channel Description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setChannelDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={HandleAddChannel}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Add Channel
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;
