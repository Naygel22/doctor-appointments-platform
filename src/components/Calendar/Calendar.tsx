import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { useQuery } from "@tanstack/react-query";
import { getAllHours } from "../../api/getAllHours";

export const Calendar = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hours"],
    queryFn: getAllHours,
  });

  function handleChange() {

  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar views={['day']} onChange={handleChange} />
    </LocalizationProvider>

  )
}
