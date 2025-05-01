import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer"; // Correct import for multer
import { v2 as cloudinary } from "cloudinary";
import myTourPackageRoutes from "./routes/my-tourpackages";
import tourpackageRoutes from "./routes/tourpackages";
import bookingRoutes from "./routes/my-bookings";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image model import
import ImageModel from "./models/image.model";

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload"); // Specifies the 'upload' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generates a unique filename
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Image upload route
app.post("/upload", upload.single("idCard"), (req: Request, res: Response) => {
  console.log(req.file); // Logs file info to verify multer's processing
  console.log(req.body); // Logs other form data

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Ensure TypeScript knows the properties of the model
  const newImage = new ImageModel({
    name: req.body.name,
    image: {
      data: req.file.filename,
      contentType: req.file.mimetype, // Use the mimetype of the uploaded file
    },
  });

  newImage
    .save()
    .then(() => res.send("Successfully uploaded"))
    .catch((err: any) => { // Specify any type for the error object
      console.log(err);
      res.status(500).send("An error occurred while saving the image");
    });
});

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-tourpackages", myTourPackageRoutes);
app.use("/api/tourpackages", tourpackageRoutes);
app.use("/api/my-bookings", bookingRoutes);

// Catch-all route to serve the frontend for non-API requests
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Start the server
app.listen(7000, () => {
  console.log("Server running on localhost:7000");
});
