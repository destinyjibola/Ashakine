import { FetchUserDataResponse } from "@/lib/types";

const getSingleProject = async (donationId: string): Promise<FetchUserDataResponse["data"]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/singleproject/${donationId}`,{ cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }

  const json: FetchUserDataResponse = await res.json();
  console.log(json.data)
  return json.data; 
};

export default getSingleProject;
