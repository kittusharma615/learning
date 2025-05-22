import * as Yup from "yup";



export  const loginSchema = Yup.object({
    email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email").email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "Invalid Password").min(6, "Minimum 6 characters").required("Password is required"),
  });
  