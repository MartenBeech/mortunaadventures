export interface GetBlogResponse {
  id: number;
  title: string;
  posts: Array<string>;
  date: string;
  location: { lat: number; long: number };
}

export interface CreateBlogProps extends GetBlogResponse {}
