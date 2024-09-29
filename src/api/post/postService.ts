import type { Post } from "@/api/post/postModel";
import { PostRepository } from "@/api/post/postRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { BaseService } from "@/common/services/newBaseService";
import { StatusCodes } from "http-status-codes";

export class PostService extends BaseService<Post, PostRepository> {
  constructor(repository: PostRepository = new PostRepository("posts")) {
    super(repository);
  }

  async findFeatured(): Promise<ServiceResponse<Post[] | null>> {
    try {
      const posts = await this.repository.findFeaturedAsync();
      if (!posts || posts.length === 0) {
        return ServiceResponse.failure("No featured posts found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Post[]>("Featured posts found", posts);
    } catch (error) {
      return this.handleError(error, "featured posts", "finding");
    }
  }
}

export const postService = new PostService();
