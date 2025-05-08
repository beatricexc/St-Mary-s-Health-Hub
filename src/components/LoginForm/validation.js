import * as yup from 'yup';

export const schema = yup.object().shape({
  university_email: yup.string().matches(/^\d+@live\.stmarys\.ac\.uk$/, "Email must be of format 21321@live.st.marys.ac.uk",).required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});