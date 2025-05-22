import * as Yup from 'yup';

export const validationSchema = Yup.object({
    profileImg: Yup.mixed()
      .required('Image is required')
      .test('fileType', 'Unsupported file format', value => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      }),
  });


  export const validationChangePasswordSchema = Yup.object({
    
    currentPassword: Yup.string()
        .required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Please confirm your password')

  });