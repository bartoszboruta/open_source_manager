import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required(),
  github_name: yup.string().required(),
  password: yup.string().required(),
  confirmed_password: yup
    .string()
    .required()
    .test("passwords", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export type RegisterSchema = yup.TypeOf<typeof schema>;

export default schema;
