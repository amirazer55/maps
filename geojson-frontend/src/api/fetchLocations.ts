const API_BASE_URL = "https://testhell-qqw.vercel.app";

export const fetchLocations = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${API_BASE_URL}/locations?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
