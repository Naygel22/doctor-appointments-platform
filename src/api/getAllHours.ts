export const getAllHours = async () => {
  const response = await fetch(`http://localhost:3000/hours`);
  if (!response.ok) {
    return []
  }
  const data = await response.json();
  return data;
};