const mongoose = require("mongoose");

const SendFileSchema = mongoose.Schema({
  name: String,
  data: Buffer,
  filename: String,
  sentby: String,
  sendto: String,
  filetype: String,
  date: String,
  time: String,
  sentbyemail: String,
});
const SendFile = mongoose.model("SendFile", SendFileSchema);

module.exports = SendFile;
