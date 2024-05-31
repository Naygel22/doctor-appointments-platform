export const getDoctorsData = async () => {
  const response = await fetch(`http://localhost:3000/doctors`);
  if (!response.ok) {
    return []
  }
  const data = await response.json();
  return data;
};