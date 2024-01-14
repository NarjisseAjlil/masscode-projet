import { z } from "zod";

const SnippetValidator = z.object({
  title: z.string().min(),
  content: z.string(),
  language: z.string(),
  created_at: z.string().datetime(),
  category_id:z.number(),
  user_id:z.number(),
});

 

export default SnippetValidator;