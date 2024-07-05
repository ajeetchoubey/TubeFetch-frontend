import React, { useState } from "react";
import axios from "axios"; // for making HTTP requests

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [format, setFormat] = useState("mp4");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (videoURL === "*") {
      setError("Please enter a valid URL");
      return;
    }
    try {
      setDownloading(true);
      const response = await axios.get(
        `http://localhost:3000/download?url=${encodeURIComponent(
          videoURL
        )}&format=${format}`,
        {
          responseType: "blob", // tell Axios to expect binary data (for file download)
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `video.${format}`);
      document.body.appendChild(link);
      link.click();
      setDownloading(false);
    } catch (error) {
      // console.error('Error downloading video:', error);
      setError("Please Enter a valid URL");
      setDownloading(false);
    }
  };

  return (
    <div className=" w-96 lg:w-1/2 border px-8 py-8 my-4 flex flex-col items-center justify-center mt-40 mx-auto">
      <div className=" flex flex-col justify-center items-center text-center">
        <h1 className=" text-3xl lg:text-4xl font-bold text-red-600">
          TubeFetch{" "}
        </h1>
        <p className=" text-xl lg:text-4xl text-white mt-1">
          Youtube Video/Audio Downloader
        </p>
      </div>
      <div className="lg:w-1/2 mx-auto">
        <input
          className=" lg:w-full px-4 py-2 text-xl mt-5 text-black"
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          placeholder="Paste your video link here"
        />
      </div>

      <p className=" text-red-500 text-sm mt-2">{error}</p>

      <div className=" mt-3">
        <label className=" text-xl">Format: </label>
        <select
          className=" text-black px-3 py-1"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option className=" text-black" value="mp4">
            MP4
          </option>
          <option className=" text-black" value="mp3">
            MP3
          </option>
        </select>
      </div>
      <div>
        <button
          className=" px-4 py-2 bg-red-500 rounded mt-4 hover:bg-red-700 cursor-pointer"
          onClick={handleDownload}
          disabled={!videoURL || downloading}
        >
          {downloading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
}

export default App;
