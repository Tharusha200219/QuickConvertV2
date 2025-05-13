import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import VideoDownloader from "./pages/VideoDownloader";
import ImageConverter from "./pages/ImageConverter";
import VideoCompressor from "./pages/VideoCompressor";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<VideoDownloader />} />
          <Route path="/image-converter" element={<ImageConverter />} />
          <Route path="/video-compressor" element={<VideoCompressor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
