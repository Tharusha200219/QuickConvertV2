import { useState } from "react";
import axios from "axios";

function ImageConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleConvert = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images/convert",
        formData
      );
      setDownloadUrl(response.data.fileUrl);
    } catch (err) {
      alert("Failed to convert image");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image Converter</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border rounded mb-4"
      />
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>
      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Convert
      </button>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="block mt-4 text-blue-600 hover:underline"
        >
          Download Converted Image
        </a>
      )}
    </div>
  );
}

export default ImageConverter;
