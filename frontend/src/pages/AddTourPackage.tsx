import { useMutation } from "react-query";
import ManageTourPackageForm from "../forms/ManageTourPackageForm/ManageTourPackageForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddTourPackage = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyTourPackage, {
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

  return <ManageTourPackageForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddTourPackage;
