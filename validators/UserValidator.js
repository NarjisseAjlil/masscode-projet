import { z } from "zod";

const UserValidator = z.object({
  email: z.string(),
  password: z.string(),
  picture: z.string(),
});

export default UserValidator;