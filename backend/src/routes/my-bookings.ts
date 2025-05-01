import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import TourPackage from "../models/tourpackage";
import { TourPackageType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const tourpackages = await TourPackage.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = tourpackages.map((tourpackage) => {
      const userBookings = tourpackage.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const tourpackageWithUserBookings: TourPackageType = {
        ...tourpackage.toObject(),
        bookings: userBookings,
      };

      return tourpackageWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;