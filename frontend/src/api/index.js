const BASE_URL = "/api";

export const request = async (endpoint, options = {}) => {
  try {
    // fetching data from backend with BASE_URL being /api and endpoint being the specific endpoint like /auth/register
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options, // Spread the options object to include method, body, headers, etc.
      headers: {
        // Set default Content-Type to application/json, but allow overrides from options.headers
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies in requests
    });

    if (response.status === 401) {
      window.location.href = "/"; // redirect if token expired
    }

    const text = await response.text();

    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
