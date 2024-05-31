
export const getDoctorDetails = async (id: string) => {
  const response = await fetch(`http://localhost:3000/doctors/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
