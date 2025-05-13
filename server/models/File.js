const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: String,
  filePath: String,
  fileType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
