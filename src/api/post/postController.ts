import type { Request, RequestHandler, Response } from "express";

import { postService } from "@/api/post/postService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class PostController {
  public getPosts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await postService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getPost: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await postService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getPostsFeatured: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await postService.findFeatured();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const postController = new PostController();
