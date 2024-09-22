import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetPostSchema, PostSchema } from "@/api/post/postModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { postController } from "./postController";

export const postRegistry = new OpenAPIRegistry();
export const postRouter: Router = express.Router();

postRegistry.register("Post", PostSchema);

postRegistry.registerPath({
  method: "get",
  path: "/posts",
  tags: ["Post"],
  responses: createApiResponse(z.array(PostSchema), "Success"),
});

postRouter.get("/", postController.getPosts);

postRegistry.registerPath({
  method: "get",
  path: "/posts/{id}",
  tags: ["Post"],
  request: { params: GetPostSchema.shape.params },
  responses: createApiResponse(PostSchema, "Success"),
});

postRouter.get("/:id", validateRequest(GetPostSchema), postController.getPost);

postRegistry.registerPath({
  method: "get",
  path: "/posts/featured",
  tags: ["Post"],
  responses: createApiResponse(z.array(PostSchema), "Success"),
});

postRouter.get("/featured", postController.getPostsFeatured);
