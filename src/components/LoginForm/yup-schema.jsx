import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().required('University email is required').email('Must be a valid email')
            .matches(new RegExp(`*${uniDomain}`), `Email must end with ${uniDomain}`),
  password: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
});