import toast from "react-hot-toast";
import { API_BASE_URL } from "./constants";

export const getIndustries = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/industries`);
    const data = await res.json() as {
        id: number;
        name: string
    }[];
    if(!data){
        return toast.error('No industries were found')
    }
    return data;
  } catch (error) {
    console.log("error fetching industries");
  }
};
