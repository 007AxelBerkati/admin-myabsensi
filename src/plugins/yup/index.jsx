import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Tidak Valid")
    .required("Tolong isi Email Anda")
    .trim(),
  password: Yup.string().required("Tolong Masukan Password Anda").trim(),
});

export const forgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Tidak Valid")
    .required("Tolong isi Email Anda")
    .trim(),
});
