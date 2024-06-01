import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllHours } from "../../api/getAllHours";
import { useState } from "react";
import { format } from "date-fns";
import styles from "./Calendar.module.css"
import { sendReservation } from "../../api/sendReservation";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ["hours"],
    queryFn: getAllHours,
  });
  const queryClient = useQueryClient();

  console.log(selectedSlot)

  const availableSlots = selectedDate
    ? data.filter(slot => !slot.isBooked)
    : [];

  const mutation = useMutation({
    mutationFn: async (values) => { return await sendReservation(values) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hours"] });
    },
    onError: (error) => {
      console.error('Error booking slot:', error);
    },
  });

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setSelectedSlot(null);
  };
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    mutation.mutate(slot)
  };



  if (error) {
    return <p>Cannot get doctors</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.calendarWithHours}>
      <div>Select a Date & Time</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar views={['day']} value={selectedDate} onChange={handleDateChange} />

        <div>
          {selectedDate && <div>{format(selectedDate, 'EEEE, MMMM d')}</div>}
          {availableSlots.map(hour => (
            <button key={hour.id} className={styles.reservationTime} onClick={() => handleSlotClick(hour)}>{hour.time}</button>
          ))}
        </div>
      </LocalizationProvider>
    </div>

  )
}
