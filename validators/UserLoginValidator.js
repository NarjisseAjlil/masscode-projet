import { z } from "zod";

const UserLoginValidator = z.object({
  email: z.string(),
  password: z.string(),
});

export default UserLoginValidator;