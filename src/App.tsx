
import { useState } from 'react';
import './App.css'
import { Doctor } from './components/Doctor'
import ErrorBoundary from './components/ErrorBoundary'
import { DoctorDetails } from './components/DoctorDetails/DoctorDetails';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  const [chosenDoctor, setChosenDoctor] = useState(null);

  return (
    <ErrorBoundary>
      <Doctor setChosenDoctor={setChosenDoctor} />
      {chosenDoctor && <DoctorDetails doctorId={chosenDoctor} />}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar views={['day']} />
      </LocalizationProvider>

    </ErrorBoundary>
  )
}

export default App
