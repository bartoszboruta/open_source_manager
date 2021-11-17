import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  password: yup.string().required(),
});

export type LoginSchema = yup.TypeOf<typeof schema>;

export default schema;
