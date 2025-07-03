// models/file.model.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  uploadedByname: String,
  uploadedByemail: String,
  date: String,
  time: String,
  type: String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
