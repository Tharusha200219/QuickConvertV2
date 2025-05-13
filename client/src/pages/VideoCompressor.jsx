import { useState } from "react";
import axios from "axios";

function VideoCompressor() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleCompress = async () => {
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/videos/compress",
        formData
      );
      setDownloadUrl(response.data.fileUrl);
    } catch (err) {
      alert("Failed to compress video");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Video Compressor</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleCompress}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Compress
      </button>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="block mt-4 text-blue-600 hover:underline"
        >
          Download Compressed Video
        </a>
      )}
    </div>
  );
}

export default VideoCompressor;
