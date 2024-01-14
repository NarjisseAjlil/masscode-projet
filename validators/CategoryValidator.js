import { z } from "zod";

const CategoryValidator = z.object({
  name: z.string(),
  user_id: z.number(),
});

export default CategoryValidator;