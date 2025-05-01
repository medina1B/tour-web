import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import TourPackage from "../models/tourpackage";
import { TourPackageType } from "../shared/types";

const router = express.Router();

// /api/my-bookedpackage
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const tourpackages = await TourPackage.find({
        bookedpackages: { $elemMatch: { userId: req.userId } },
    });

    const results = tourpackages.map((tourpackage) => {
      const userbookedpackages = tourpackage.bookedpackages.filter(
        (bookedpackage) => bookedpackage.userId === req.userId
      );

      const tourpackageWithUserbookedpackages: TourPackageType = {
        ...tourpackage.toObject(),
        bookedpackages: userbookedpackages,
      };

      return tourpackageWithUserbookedpackages;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookedpackages" });
  }
});

export default router;