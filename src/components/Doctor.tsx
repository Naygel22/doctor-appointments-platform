import { useQuery } from "@tanstack/react-query";
import { getDoctorsData } from "../api/getAllDoctorsData";
import { useFormik } from "formik";
import * as yup from 'yup';
import { SelectInput } from "./SelectInput";
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

export const Doctor = ({ setChosenDoctor }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctorsData,
  });

  const doctors: Option[] = data
    ? data.map((doctor) => ({
      value: doctor.id,
      label: `${doctor.name} ${doctor.surname}`
    }))
    : [];

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (values) => {
      const selectedDoctor = doctors.find(doc => doc.value === values.name);
      console.log(selectedDoctor)
      setChosenDoctor(selectedDoctor);
    },
    validationSchema: yup.object({
      name: yup.string().required('Please choose a doctor'),
    })
  });

  if (error) {
    return <p>Cannot get doctors</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <SelectInput formik={formik} accessor="name" label="Choose a doctor" options={doctors} />
      <button type="submit">Submit</button>
    </form>
  );
};
