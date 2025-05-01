import { Link } from "react-router-dom";
import { TourPackageType } from "../../../backend/src/shared/types";

type Props = {
  tourpackage: TourPackageType;
};

const LatestDestinationCard = ({ tourpackage }: Props) => {
  return (
    <Link
      to={`/detail/${tourpackage._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={tourpackage.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {tourpackage.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
