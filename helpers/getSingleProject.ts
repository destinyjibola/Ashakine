import { FetchUserDataResponse } from "@/lib/types";

const getSingleProject = async (donationId: string): Promise<FetchUserDataResponse["data"]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/singleproject/${donationId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }

  const json: FetchUserDataResponse = await res.json();
  return json.data; // Extract the data property
};

export default getSingleProject;
