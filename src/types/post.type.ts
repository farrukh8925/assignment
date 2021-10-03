/**
 * Type for a post
 */
export type Post = {
  created_time: string;
  from_id?: string;
  from_name: string;
  id: string;
  message: string;
  type: string;
};

/**
 * Response structure
 */
export type PostsResponse = {
  page: number;
  posts: Post[];
};
