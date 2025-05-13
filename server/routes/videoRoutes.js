const express = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Download YouTube video
router.post("/download", async (req, res) => {
  const { url, format, quality } = req.body;

  try {
    const info = await ytdl.getInfo(url);
    let stream;
    let filename;

    if (format === "audio") {
      stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
      filename = `${info.videoDetails.title}.mp3`;
    } else {
      stream = ytdl(url, { quality: quality || "highestvideo" });
      filename = `${info.videoDetails.title}.mp4`;
    }

    res.header("Content-Disposition", `attachment; filename="${filename}"`);
    stream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Failed to download video" });
  }
});

// Compress video
router.post("/compress", upload.single("video"), async (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/compressed-${req.file.filename}`;

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .videoCodec("libx264")
        .audioCodec("aac")
        .outputOptions(["-crf 28", "-preset fast"])
        .on("end", resolve)
        .on("error", reject)
        .save(outputPath);
    });

    const file = new File({
      originalName: req.file.originalname,
      filePath: outputPath,
      fileType: "video",
    });
    await file.save();

    res.json({ fileUrl: `http://localhost:5000/${outputPath}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to compress video" });
  }
});

module.exports = router;
