import Cookies from "js-cookie";
import { UseFormReturn } from "react-hook-form";

interface FetchUserDataResponse {
  data: any;
}

export const fetchUserData = async (
  setData: (data: any) => void,
  form?: UseFormReturn, // Optional form parameter
  fieldsToInject: string[] = [], // Array of fields to inject
  endpoint: string = "getSingleUser" // Default endpoint, can be overridden
): Promise<void> => {
  const user = Cookies.get("user");

  if (!user) {
    console.error("User ID is not found in cookies.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );
    const fetchedData: FetchUserDataResponse = await response.json();
    setData(fetchedData.data);
    console.log(fetchedData.data);
    // Only update specified form fields if the form and fetched data exist
    if (form && fetchedData.data && typeof fetchedData.data === "object") {
      fieldsToInject.forEach((field) => {
        if (field in fetchedData.data) {
          form.setValue(field, fetchedData.data[field]);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
