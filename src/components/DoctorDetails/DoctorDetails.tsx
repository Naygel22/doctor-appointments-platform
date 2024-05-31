import { useQuery } from "@tanstack/react-query";
import { getDoctorDetails } from "../../api/getDoctorDetails";
import { Avatar } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import styles from "./DoctorDetails.module.css"

export const DoctorDetails = ({ doctorId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctorDetails", doctorId.value],
    queryFn: () => getDoctorDetails(doctorId.value),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading doctor details</p>;
  }

  return (
    <div className={styles.doctorDetailsBlock}>
      <Avatar src={data.imgSrc} sx={{ width: 56, height: 56 }} />
      <p className={styles.doctorName}>{data.name} {data.surname}</p>
      <div className={styles.demoCall}>Demo Call</div>
      <div className={styles.timerBar}>
        <AccessTimeFilledIcon sx={{ color: "grey" }} />
        <div>30 min</div>
      </div>
      <div className={styles.description}>
        A member of our team will walk you through the platform and demonstrate how our solution can help!
      </div>
    </div>
  );
};
