import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageTourPackageForm from "../forms/ManageTourPackageForm/ManageTourPackageForm";
import { useAppContext } from "../contexts/AppContext";

const EditTourPackage = () => {
  const { tourpackageId } = useParams();
  const { showToast } = useAppContext();

  const { data: tourpackage } = useQuery(
    "fetchMyTourPackageById",
    () => apiClient.fetchMyTourPackageById(tourpackageId || ""),
    {
      enabled: !!tourpackageId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyTourPackageById, {
    onSuccess: () => {
      showToast({ message: "TourPackage Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving TourPackage", type: "ERROR" });
    },
  });

  const handleSave = (tourpackageFormData: FormData) => {
    mutate(tourpackageFormData);
  };

  return (
    <ManageTourPackageForm
      tourpackage={tourpackage}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditTourPackage;
