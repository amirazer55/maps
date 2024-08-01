
export const fetchLocations = async () => {
  const response = await fetch(
    `http://localhost:3044/locations?page=${1}&limit=${10}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
