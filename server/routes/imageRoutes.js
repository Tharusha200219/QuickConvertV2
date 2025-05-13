const express = require("express");
const sharp = require("sharp");
const multer = require("multer");
const File = require("../models/File");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Convert image
router.post("/convert", upload.single("image"), async (req, res) => {
  const { format } = req.body;
  const inputPath = req.file.path;
  const outputPath = `uploads/converted-${Date.now()}.${format}`;

  try {
    await sharp(inputPath).toFormat(format).toFile(outputPath);

    const file = new File({
      originalName: req.file.originalname,
      filePath: outputPath,
      fileType: "image",
    });
    await file.save();

    res.json({ fileUrl: `http://localhost:5000/${outputPath}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to convert image" });
  }
});

module.exports = router;
