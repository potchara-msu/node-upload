const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const app = express();
const port = 3000;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const randomBytes = crypto.randomBytes(16);
    const uniqueFilename =
      randomBytes.toString("hex") + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.file;
  const response = {
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
  };

  res.json(response);
});

app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
