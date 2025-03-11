import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Format email salah").required("Wajib diisi"),
  password: Yup.string().required("Wajib diisi"),
});

export default LoginSchema;
