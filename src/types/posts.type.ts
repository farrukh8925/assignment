import { Post } from "./post.type";

export type AppContextState = {
  pageNumber: number;
  posts: Record<string, Post[]>;
  updatePageNumber: (page: number) => void;
  getPosts: (page: number) => void;
  loading: boolean;
  selectedAuthor: string | undefined;
  setSelectedAuthor: (author: string) => void;
  userFilter: string | undefined;
  updateUserFilter: (param: string) => void;
  postFilter: string | undefined;
  updatePostFilter: (param: string) => void;
  recentFirst: boolean;
  updateRecentFirst: (param: boolean) => void;
};
