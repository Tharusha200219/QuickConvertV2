import { useState } from "react";

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("png");
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [error, setError] = useState(null);

  const formats = ["png", "jpeg", "webp", "bmp", "gif"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        setImage(null);
        setPreview(null);
        setConvertedUrl(null);
        return;
      }

      setError(null);
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setError(null);
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${format === "jpeg" ? "jpeg" : format}`;
      const quality = format === "jpeg" ? 0.9 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      setConvertedUrl(dataUrl);
    };

    img.onerror = () => {
      setError("Error processing the image.");
    };
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const link = document.createElement("a");
      link.href = convertedUrl;
      link.download = `converted-image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="image-converter mb-5" aria-labelledby="converter-title">
      <h2 id="converter-title" className="text-center mb-4">
        Convert Your Image
      </h2>
      <div className="card shadow-sm p-4">
        <div className="mb-4">
          <label htmlFor="image-upload" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            aria-describedby="upload-help"
          />
          <div id="upload-help" className="form-text">
            Supports JPEG, PNG, WEBP, BMP, GIF formats.
          </div>
        </div>

        {preview && (
          <div className="mb-4 text-center">
            <h3 className="h5">Preview</h3>
            <img
              src={preview}
              alt="Uploaded image preview"
              className="img-fluid rounded"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="format-select" className="form-label">
            Select Output Format
          </label>
          <select
            id="format-select"
            className="form-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            aria-label="Select output image format"
          >
            {formats.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className="btn btn-primary"
            onClick={handleConvert}
            disabled={!image}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Convert
          </button>
          {convertedUrl && (
            <button className="btn btn-success" onClick={handleDownload}>
              <i className="bi bi-download me-2"></i>
              Download
            </button>
          )}
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageConverter;
