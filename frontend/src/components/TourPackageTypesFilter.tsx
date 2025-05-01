import { tourpackageTypes } from "../config/tourpackage-options-config";

type Props = {
  selectedTourPackageTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TourPackageTypesFilter = ({
  selectedTourPackageTypes,
  onChange,
}: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">package Type</h4>
      {tourpackageTypes.map((tourpackageType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={tourpackageType}
            checked={selectedTourPackageTypes.includes(tourpackageType)}
            onChange={onChange}
          />
          <span>{tourpackageType}</span>
        </label>
      ))}
    </div>
  );
};

export default TourPackageTypesFilter;
