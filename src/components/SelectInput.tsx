import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import { FormikProps } from 'formik';

type Option = {
  value: string;
  label: string;
}

export const SelectInput = <FormValues,>({ formik, accessor, label, options }: {
  formik: FormikProps<FormValues>,
  accessor: keyof FormValues & string,
  label: string,
  options: Option[]
}) => {
  const isError = formik.touched[accessor] && Boolean(formik.errors[accessor]);

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel id={`${accessor}-label`}>{label}</InputLabel>
      <Select
        labelId={`${accessor}-label`}
        id={accessor}
        value={formik.values[accessor]}
        label={label}
        onChange={(e) => {
          formik.setFieldValue(accessor, e.target.value);
          formik.setFieldTouched(accessor, true);
        }}
        onBlur={() => formik.setFieldTouched(accessor, true)}
        sx={{
          width: '300px'
        }}
      >
        {options.map((option, id) => (
          <MenuItem key={id} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{formik.errors[accessor]}</FormHelperText>}
    </FormControl>
  );
}
