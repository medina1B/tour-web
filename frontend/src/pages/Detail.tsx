import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { tourpackageId } = useParams();

  const { data: tourpackage } = useQuery(
    "fetchTourPackagelById",
    () => apiClient.fetchTourPackageById(tourpackageId || ""),
    {
      enabled: !!tourpackageId,
    }
  );

  if (!tourpackage) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: tourpackage.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{tourpackage.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tourpackage.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={tourpackage.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {tourpackage.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{tourpackage.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={tourpackage.pricePerNight}
            tourpackageId={tourpackage._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
