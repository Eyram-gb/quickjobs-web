import toast from "react-hot-toast";
import { API_BASE_URL } from "./constants";
import { TGig, TGigDetails } from "./types";
import axios from "axios";

export const getIndustries = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/industries`);
    const data = (await res.json()) as {
      id: number;
      name: string;
    }[];
    if (!data) {
      return toast.error("No industries were found");
    }
    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log("error fetching industries");
  }
};
export const getGigs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/gigs`, { cache: "no-store" });
    const data = (await res.json()) as TGig[];

    if (res.status === 200) {
      return data;
    } else {
      throw new Error("error fetching gigs. try again");
    }
  } catch (error) {
    console.log("error fetching giigs");
  }
};
export const getIndustryGigsCount = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/gigs/industry/count`, {
      cache: "no-store",
    });
    const data = (await res.json()) as {
      industry_id: number,
      industry_name: string,
      gig_count: NamedCurve,
    }[];

    if (res.status === 200) {
      return data;
    } else {
      throw new Error("error fetching industry gigs count.");
    }
  } catch (error) {
    console.log("error fetching industry gigs count");
  }
};

export const fetchGigs = async (params?: string) => {
   try {
     const response = await axios.get(
       `${API_BASE_URL}/gigs${params ? params : ""}`
     );
     return response.data as TGig[];
   } catch (error) {
     console.error("Error fetching gigs:", error);
     throw error; // Rethrow the error to be handled in the component
   }
};

export const getGigById = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gigs/${id}`);
    const data = (await res.json()) as TGigDetails;
    if (res.status === 200) {
      return data;
    } else {
      throw new Error("error fetching gig. try again");
    }
  } catch (error) {
    console.log("error fetching gig with id: " + id);
  }
};

export const employerGigs = async (employer_id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gigs/${employer_id}/employer`, {
      cache: "no-store",
    });
    const data = (await res.json()) as TGig[];
    if (res.status === 200) {
      return data;
    } else {
      throw new Error("error fetching gigs. try again");
    }
  } catch (error) {
    console.error(error);
  }
};
