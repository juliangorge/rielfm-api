import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Post = z.infer<typeof PostSchema>;
export const PostSchema = z.object({
  id: z.number(),
  subtitle: z.string().nullable(),
  title: z.string().max(80),
  section_id: z.number(),
  summary: z.string(),
  body: z.string(),
  tags: z.string().nullable(),
  image: z.string().max(150).nullable(),
  epigraph: z.string().max(80).nullable(),
  created_at: z.date(),
  views: z.number().default(0),
  user_id: z.number(),
});

// Input Validation for 'GET posts/:id' endpoint
export const GetPostSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
