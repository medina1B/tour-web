import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";

const Home = () => {
  const { data: tourpackages } = useQuery("fetchQuery", () =>
    apiClient.fetchTourPackages()
  );

  const topRowTourPackages = tourpackages?.slice(0, 2) || [];
  const bottomRowTourPackages = tourpackages?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowTourPackages.map((tourpackage) => (
            <LatestDestinationCard tourpackage={tourpackage} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowTourPackages.map((tourpackage) => (
            <LatestDestinationCard tourpackage={tourpackage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
