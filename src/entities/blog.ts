export interface GetBlogResponse {
  date: string;
  description: string;
  id: number;
  label: string;
  location: { lat: number; long: number };
  posts: Array<string>;
  title: string;
  people: string;
}

export type CreateBlogProps = GetBlogResponse;
