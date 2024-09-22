import { StatusCodes } from "http-status-codes";

import type { Post } from "@/api/post/postModel";
import { PostRepository } from "@/api/post/postRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class PostService {
  private postRepository: PostRepository;

  constructor(repository: PostRepository = new PostRepository()) {
    this.postRepository = repository;
  }

  // Retrieves all posts from the database
  async findAll(): Promise<ServiceResponse<Post[] | null>> {
    try {
      const posts = await this.postRepository.findAllAsync();
      if (!posts || posts.length === 0) {
        return ServiceResponse.failure("No Posts found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Post[]>("Posts found", posts);
    } catch (ex) {
      const errorMessage = `Error finding all posts: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving posts.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single post by their ID
  async findById(id: number): Promise<ServiceResponse<Post | null>> {
    try {
      const post = await this.postRepository.findByIdAsync(id);
      if (!post) {
        return ServiceResponse.failure("Post not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Post>("Post found", post);
    } catch (ex) {
      const errorMessage = `Error finding post with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding post.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findFeatured(): Promise<ServiceResponse<Post[] | null>> {
    try {
      const posts = await this.postRepository.findFeaturedAsync();
      if (!posts || posts.length === 0) {
        return ServiceResponse.failure("No featured posts found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Post[]>("Featured posts found", posts);
    } catch (ex) {
      const errorMessage = `Error finding featured posts: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding featured posts.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const postService = new PostService();
