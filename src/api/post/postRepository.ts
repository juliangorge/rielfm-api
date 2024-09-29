import type { Post } from "@/api/post/postModel";
import { BaseRepository } from "@/common/repositories/baseRepository";

export const posts: Post[] = [
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

export class PostRepository extends BaseRepository<Post> {
  async findFeaturedAsync(): Promise<Post[] | null> {
    return posts.slice(-20);
  }
}
