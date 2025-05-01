import React, { useState } from "react";

const ImageUploadForm = () => {
  const [idCard, setIdCard] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (type === "idCard") {
      setIdCard(file || null);
    } else if (type === "businessLicense") {
      setBusinessLicense(file || null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!idCard || !businessLicense) {
      alert("Please upload both images.");
      return;
    }

    const formData = new FormData();
    formData.append("idCard", idCard);
    formData.append("businessLicense", businessLicense);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Files uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Images</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="idCard"
            className="block text-sm font-medium text-gray-700"
          >
            Upload ID Card:
          </label>
          <input
            type="file"
            id="idCard"
            name="idCard"
            onChange={(e) => handleFileChange(e, "idCard")}
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="businessLicense"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Business License:
          </label>
          <input
            type="file"
            id="businessLicense"
            name="businessLicense"
            onChange={(e) => handleFileChange(e, "businessLicense")}
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;
