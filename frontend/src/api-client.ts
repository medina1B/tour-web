import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  TourPackageSearchResponse,
  TourPackageType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyTourPackage = async (tourpackageFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-tourpackages`, {
    method: "POST",
    credentials: "include",
    body: tourpackageFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add TourPackage");
  }

  return response.json();
};

export const fetchMyTourPackages = async (): Promise<TourPackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-tourpackages`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching TourPackages");
  }

  return response.json();
};

export const fetchMyTourPackageById = async (tourpackageId: string): Promise<TourPackageType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-tourpackages/${tourpackageId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching TourPackages");
  }

  return response.json();
};

export const updateMyTourPackageById = async (tourpackageFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-tourpackages/${tourpackageFormData.get("tourpackageId")}`,
    {
      method: "PUT",
      body: tourpackageFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update TourPackage");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchTourPackages = async (
  searchParams: SearchParams
): Promise<TourPackageSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/tourpackages/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching TourPackages");
  }

  return response.json();
};

export const fetchTourPackages = async (): Promise<TourPackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/tourpackages`);
  if (!response.ok) {
    throw new Error("Error fetching TourPackages");
  }
  return response.json();
};

export const fetchTourPackageById = async (tourpackageId: string): Promise<TourPackageType> => {
  const response = await fetch(`${API_BASE_URL}/api/tourpackages/${tourpackageId}`);
  if (!response.ok) {
    throw new Error("Error fetching TourPackages");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/tourpackages/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/tourpackages/${formData.tourpackageId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<TourPackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};
export const fetchMybookedpackages = async (): Promise<TourPackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookedpackages`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookedpackages");
  }

  return response.json();
};