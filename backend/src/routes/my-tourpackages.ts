import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import TourPackage from "../models/tourpackage";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { TourPackageType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("TourPackage type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newTourPackage: TourPackageType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newTourPackage.imageUrls = imageUrls;
      newTourPackage.lastUpdated = new Date();
      newTourPackage.userId = req.userId;

      const tourpackage= new TourPackage(newTourPackage);
      await tourpackage.save();

      res.status(201).send(tourpackage);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const tourpackages = await TourPackage.find({ userId: req.userId });
    res.json(tourpackages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tourpackages" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const tourpackage = await TourPackage.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(tourpackage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching TourPackages" });
  }
});

router.put(
  "/:tourpackageId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedTourPackage: TourPackageType = req.body;
      updatedTourPackage.lastUpdated = new Date();

      const tourpackage = await TourPackage.findOneAndUpdate(
        {
          _id: req.params.tourpackageId,
          userId: req.userId,
        },
        updatedTourPackage,
        { new: true }
      );

      if (!tourpackage) {
        return res.status(404).json({ message: "TourPackage not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      tourpackage.imageUrls = [
        ...updatedImageUrls,
        ...(updatedTourPackage.imageUrls || []),
      ];

      await tourpackage.save();
      res.status(201).json(tourpackage);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;