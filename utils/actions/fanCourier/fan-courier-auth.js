export const getFanCourierToken = async () => {
  try {
    const response = await fetch(
      `https://api.fancourier.ro/login?username=${process.env.FAN_USERNAME}&password=${process.env.FAN_PASSWORD}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 82800 }, // Cache and revalidate every 24 hours
      }
    );

    // Check if the response is not okay (e.g., 400 or 500 status codes)
    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate that the token exists in the response
    if (!data?.data?.token) {
      throw new Error("Token not received from Fan Courier");
    }

    return data.data.token;
  } catch (error) {
    console.error("Failed to fetch Fan Courier token:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
};
