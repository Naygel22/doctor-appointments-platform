
import { useState } from 'react';
import './App.css'
import { Doctor } from './components/Doctor'
import ErrorBoundary from './components/ErrorBoundary'
import { DoctorDetails } from './components/DoctorDetails/DoctorDetails';
import { Calendar } from './components/Calendar/Calendar';


function App() {
  const [chosenDoctor, setChosenDoctor] = useState(null);
  const [value, setValue] = useState();

  console.log(value)

  return (
    <ErrorBoundary>
      <Doctor setChosenDoctor={setChosenDoctor} />
      {chosenDoctor && <DoctorDetails doctorId={chosenDoctor} />}
      <Calendar />
    </ErrorBoundary>
  )
}

export default App
