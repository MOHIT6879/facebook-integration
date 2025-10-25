import React, { useState } from "react";
import axios from "axios";

const FacebookConnect = () => {
  const [pageUrl, setPageUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleConnect = async () => {
    if (!pageUrl.trim()) {
      setStatus("Please enter a Facebook Page URL");
      return;
    }

    try {
      setStatus("Connecting to Facebook");
      const response = await axios.post("http://localhost:5000/api/facebook/connect", {
        pageUrl,
      });
      if (response.data.authUrl) {
        setStatus("Redirecting to Facebook login");
        window.location.href = response.data.authUrl;
      } else {
        setStatus("Backend did not return authUrl");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Error connecting to backend.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[420px] text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Facebook Page Integration</h1>
        <input
          type="text"
          placeholder="Enter Facebook Page URL"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleConnect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-all"
        >
          Connect
        </button>
        {status && (
          <p className="mt-4 text-sm text-gray-700 bg-gray-100 py-2 rounded-md">{status}</p>
        )}
      </div>
    </div>
  );
};

export default FacebookConnect;
