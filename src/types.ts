export type AllBlogs = {
  blogs: Blog[];
};

export type Blog = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  authors: Author[];
  comments: Comment[];
  index: number;
};

export type Author = {
  createdAt: Date;
  name: string;
  avatar: string;
  updatedAt: Date;
  id: string;
  postId: string;
};

export type Comment = {
  createdAt: Date;
  title: string;
  description: string;
  updatedAt: Date;
  id: string;
  postId: string;
};

export type CardContainerProps = {
  index: number;
};

export type CommentsProps = {
  comments: Comment[];
  isDetailsPage?: boolean;
};

export type PaginationProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  currentPage: number;
};

export type PaginationNumberProps = {
  isActive: boolean;
};
