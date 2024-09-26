import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { Post } from "@/api/post/postModel";
import { PostRepository } from "@/api/post/postRepository";
import { PostService } from "@/api/post/postService";

vi.mock("@/api/post/postRepository");

describe("postService", () => {
  let postServiceInstance: PostService;
  let postRepositoryInstance: PostRepository;

  const mockPosts: Post[] = [
    {
      id: 1,
      subtitle: "Subtitle",
      title: "Title",
      section_id: 1,
      summary: "Summary",
      body: "Body",
      tags: "Tags",
      image: "image.png",
      epigraph: "Epigraph",
      created_at: new Date(),
      views: 0,
      user_id: 1,
    },
    {
      id: 2,
      subtitle: "Subtitle",
      title: "Title",
      section_id: 1,
      summary: "Summary",
      body: "Body",
      tags: "Tags",
      image: "image.png",
      epigraph: "Epigraph",
      created_at: new Date(),
      views: 0,
      user_id: 1,
    },
  ];

  beforeEach(() => {
    postRepositoryInstance = new PostRepository("posts");
    postServiceInstance = new PostService(postRepositoryInstance);
  });

  describe("findAll", () => {
    it("return all posts", async () => {
      // Arrange
      (postRepositoryInstance.findAll as Mock).mockReturnValue(mockPosts);

      // Act
      const result = await postServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Items found");
      expect(result.responseObject).toEqual(mockPosts);
    });

    it("handles errors for findAll", async () => {
      // Arrange
      (postRepositoryInstance.findAll as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await postServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while retrieving items.");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("findById", () => {
    it("returns a post for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const mockPost = mockPosts.find((post) => post.id === testId);
      (postRepositoryInstance.findById as Mock).mockReturnValue(mockPost);

      // Act
      const result = await postServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Item found");
      expect(result.responseObject).toEqual(mockPost);
    });

    it("handles errors for findById", async () => {
      // Arrange
      const testId = 1;
      (postRepositoryInstance.findById as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await postServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while finding item.");
      expect(result.responseObject).toBeNull();
    });

    it("returns a not found error for non-existent ID", async () => {
      // Arrange
      const testId = 1;
      (postRepositoryInstance.findById as Mock).mockReturnValue(null);

      // Act
      const result = await postServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("Item not found");
      expect(result.responseObject).toBeNull();
    });
  });
});
