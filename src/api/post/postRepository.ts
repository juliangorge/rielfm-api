import type { Post } from "@/api/post/postModel";

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
    date_created: new Date(),
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
    date_created: new Date(),
    views: 0,
    user_id: 1,
  },
];

export class PostRepository {
  async findAllAsync(): Promise<Post[]> {
    return posts;
  }

  async findByIdAsync(id: number): Promise<Post | null> {
    return posts.find((post) => post.id === id) || null;
  }

  async findFeaturedAsync(): Promise<Post[] | null> {
    return posts.slice(-20);
  }
}
