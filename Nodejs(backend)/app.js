const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const File = require("./models/file.model");
const cors = require("cors");
const User = require("./models/user.model");
const SendFile = require("./models/sendfile");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const jwt = require("jsonwebtoken");
app.use(express.json());

app.use(cors());
// MongoDB connection

mongoose.connect(
  "mongodb+srv://dharmikpatel982003:dharmikpatel@fileshare.2adh9.mongodb.net/?retryWrites=true&w=majority&appName=FileShare",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const secret_key = "this_is_my_key_jay_swaminarayan";

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Multer configuration with file filter for images
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|gif/; // Allowed image formats
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      )
    );
  },
});

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret_key);
    // Attach decoded user to the request object
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid or expired token.");
  }
};

app.get("/hello", (req, res) => {
  res.send("hello world");
});
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use "gmail" or custom SMTP
      auth: {
        user: "dharmikpatel982003@gmail.com",
        pass: "xned hism nabp kkfn", // Use app-specific password
      },
    });

    const mailOptions = {
      from: "dharmikpatel982003@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});
app.post("/verifyemailisok", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      console.log("user is found");
      res.status(200).send("Email verified");
    } else {
      res.status(400).send("Email is not present");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal server error");
  }
});
app.get("/protected", authorization, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user, // This contains the decoded token payload
  });
});
app.post("/send", authorization, upload.single("file"), async (req, res) => {
  try {
    const { originalname, buffer, mimetype } = req.file;

    const { sendtoemail } = req.body;

    const filetype = mimetype.split("/")[0];

    const currentDateTime = new Date();
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const year = currentDateTime.getFullYear();
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    const formattedtime = `${hours}:${minutes}`;

    const sendfile = new SendFile({
      name: originalname,
      data: buffer,
      contentType: mimetype,
      sentby: req.user.username,
      sentbyemail: req.user.email,
      sendto: sendtoemail,
      filetype: filetype,
      date: formattedDate,
      time: formattedtime,
    });

    await sendfile.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dharmikpatel982003@gmail.com",
        pass: "cnrx bnvk ibtu dlii", // Sender's app password
      },
    });

    // Compose the email with the file attachment and instructions
    const mailOptions = {
      from: "dharmikpatel982003@gmail.com", // Sender's email
      to: sendtoemail, // Recipient's email
      subject: `You have received a file: ${originalname}`,
      text: `Hello,\n\nYou have received a file from ${req.user.username}. The file is named "${originalname}". Please log in to your FileShare account to download it.\n\nBest regards, FileShare Team`,
      // attachments: [
      //   {
      //     filename: originalname,
      //     content: buffer,
      //     encoding: "base64",
      //   },
      // ],
    };

    // Send the email
    transporter.sendMail(mailOptions);
    // Respond with success

    res.status(200).send("File Sent Successfully");
  } catch (error) {
    res.status(500).send("Error Sending the file");
  }
});
app.post("/fetchfiles", authorization, async (req, res) => {
  try {
    const files = await SendFile.find({
      sendto: req.user.email,
    });

    res.send(files);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Occured");
  }
});
app.post("/uploadold", upload.single("file"), async (req, res) => {
  try {
    const { originalname, buffer, mimetype } = req.file;

    const file = new File({
      name: originalname,
      data: buffer,
      contentType: mimetype,
    });

    await file.save();
    res.status(201).send("Image uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading the image.");
  }
});

// Route for uploading an image file
app.post("/upload", authorization, upload.single("file"), async (req, res) => {
  try {
    const { originalname, buffer, mimetype } = req.file;
    const filetype = mimetype.split("/")[0];

    const currentDateTime = new Date();
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const year = currentDateTime.getFullYear();
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    const formattedtime = `${hours}:${minutes}`;
    const file = new File({
      name: originalname,
      data: buffer,
      contentType: mimetype,
      uploadedByname: req.user.username,
      uploadedByemail: req.user.email,
      date: formattedDate,
      time: formattedtime,
      type: filetype,
    });

    await file.save();
    res.status(201).send("Image uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading the image.");
  }
});
app.post("/fetchuploadedfiles", authorization, async (req, res) => {
  try {
    const files = await File.find({
      uploadedByemail: req.user.email,
    });

    res.send(files);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Occured");
  }
});
app.post("/fetchsentfiles", authorization, async (req, res) => {
  try {
    const files = await SendFile.find({
      sentbyemail: req.user.email,
    });

    res.send(files);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Occured");
  }
});
app.post("/list", async (req, res) => {
  res.send("heelo");
});

app.post("/profile", authorization, async (req, res) => {
  try {
    const totalupload = await File.countDocuments({
      uploadedByemail: req.user.email,
    });
    const totalreceived = await SendFile.countDocuments({
      sendto: req.user.email,
    });
    const totalsent = await SendFile.countDocuments({
      sentbyemail: req.user.email,
    });

    const data = {
      totalupload: totalupload,
      totalreceived: totalreceived,
      totalsent: totalsent,
    };
    res.send(data);
  } catch (error) {
    console.log(`error occured ${error}`);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create and save the user directly
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).send("User already exist");
    }
    const existingname = await User.findOne({ name });
    if (existingname) {
      return res.status(400).send("Name already exist");
    }
    const user = new User({ name, email, password });

    await user.save();
    res.send("User created");
  } catch (error) {
    res.status(500).send("Error occurred while saving the user.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const userpassword = user.password;
  if (userpassword !== password) {
    return res.status(400).send("Invalid Password");
  }
  const payload = {
    username: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, secret_key, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Route to display a list of uploaded files
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.send(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving files from the database.");
  }
});
app.get("/download/:id", async (req, res) => {
  try {
    const file = await SendFile.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found.");
    }

    // Set the headers for file download
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.name}"`,
    });

    // Send the file data as a response
    res.send(file.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while downloading file.");
  }
});
app.get("/downloadupload/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found.");
    }

    // Set the headers for file download
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.name}"`,
    });

    // Send the file data as a response
    res.send(file.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while downloading file.");
  }
});
// Route to display an individual file based on its ID
app.get("/files/:id", async (req, res) => {
  try {
    const file = await SendFile.findById(req.params.id);

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Send the file data as a response
    res.contentType(file.contentType);
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving the file from the database. ");
  }
});

app.get("/filess/:id", authorization, async (req, res) => {
  try {
    console.log("atleast here");
    const file = await SendFile.findById(req.params.id);

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Send the file data as a response
    res.contentType(file.contentType);
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving the file from the database.");
  }
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
