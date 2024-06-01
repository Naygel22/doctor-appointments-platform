export const sendReservation = async (values) => {
  const response = await fetch(`http://localhost:3000/bookings`, {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ ...values, isBooked: true }),
  });
  if (!response.ok) {
    return {};
  }
  const data = await response.json();
  return data;
}
