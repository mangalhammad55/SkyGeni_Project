export const fetchData = async (endpoint: string) => {
  const response = await fetch(`http://localhost:5000/api/${endpoint}`);
  return await response.json();
};
