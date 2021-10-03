import React, { useState, createContext } from "react";
import { API_ROUTES } from "../constants/apiConfig";
import { Post, PostsResponse } from "../types/post.type";
import { AppContextState } from "../types/posts.type";
import { get } from "../utils/fetcher";

/**
 * Custom react context for global state management.
 */
const contextDefaultValues: AppContextState = {
  pageNumber: 1,
  posts: {},
  updatePageNumber: (pageNumber: number) => {},
  getPosts: (pageNumber: number) => {},
  loading: false,
  selectedAuthor: undefined,
  setSelectedAuthor: (author: string) => {},
  userFilter: undefined,
  updateUserFilter: (param: string) => {},
  postFilter: undefined,
  updatePostFilter: (param: string) => {},
  recentFirst: true,
  updateRecentFirst: (param: boolean) => {},
};

export const AppContext = createContext<AppContextState>(contextDefaultValues);

const PostsProvider: React.FC = ({ children }) => {
  /**
   * State management
   */
  const [posts, setPosts] = useState<Record<string, Post[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(
    undefined
  );

  const [userFilter, setUserFilter] = useState<string | undefined>();
  const [postFilter, setPostFilter] = useState<string | undefined>();

  const [recentFirst, setRecentFirst] = useState<boolean>(true);

  /**
   * Get Posts
   */
  const getPosts = (pageNumber: number) => {
    setLoading(true);
    get(API_ROUTES.posts, { page: pageNumber }).then((response) => {
      if (response && response?.data) {
        const { data } = response.data;
        const { posts } = data as PostsResponse;
        // Run a reducer to group the posts
        // We can use other libraries to perform this action, like lodash or something
        const userPosts: Record<string, Post[]> = posts.reduce(
          (prevPost, currentPost) => {
            if (prevPost[currentPost.from_name]) {
              prevPost[currentPost.from_name].push(currentPost);
            } else {
              prevPost[currentPost.from_name] = [currentPost];
            }
            return prevPost;
          },
          Object.create(null)
        );

        setPosts(userPosts);
        setLoading(false);
      }
    });
  };

  /**
   * Sets the page number
   */
  const updatePageNumber = (value: number) => {
    if (pageNumber !== value) {
      setPageNumber(value);
      getPosts(value);
    }
  };

  /**
   * Set the state object for post filter
   */
  const updatePostFilter = (value: string) => setPostFilter(value);

  /**
   * Set the state object for user filter
   */
  const updateUserFilter = (value: string) => setUserFilter(value);

  /**
   * Update the store to reflect whether to sort post by time/date
   */
  const updateRecentFirst = (value: boolean) => setRecentFirst(value);

  return (
    <AppContext.Provider
      value={{
        getPosts,
        loading,
        pageNumber,
        postFilter,
        posts,
        recentFirst,
        selectedAuthor,
        setSelectedAuthor,
        updatePageNumber,
        updatePostFilter,
        updateRecentFirst,
        updateUserFilter,
        userFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default PostsProvider;
