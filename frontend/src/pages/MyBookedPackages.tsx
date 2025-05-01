import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookedPackages = () => {
  const { data: tourpackages } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!tourpackages || tourpackages.length === 0) {
    return <span>No booked packages found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Booked Packages</h1>
      {tourpackages.map((tourpackage) => (
        <div
          key={tourpackage._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          {/* Package Image */}
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={tourpackage.imageUrls[0]}
              alt={tourpackage.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Package Details */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            {/* Package Name and Location */}
            <div className="text-2xl font-bold">
              {tourpackage.name}
              <div className="text-xs font-normal">
                {tourpackage.city}, {tourpackage.country}
              </div>
            </div>

            {/* Bookings */}
            {tourpackage.bookings.map((booking) => (
              <div key={booking._id} className="border-t pt-4 mt-4">
                <div>
                  <span className="font-bold mr-2">Name:</span>
                  <span>
                    {booking.firstName} {booking.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Dates:</span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Total Cost:</span>
                  <span>${booking.totalCost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookedPackages;
