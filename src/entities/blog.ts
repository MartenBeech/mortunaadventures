export interface GetBlogResponse {
  date: string;
  description: string;
  id: number;
  label: string;
  location: { lat: number; long: number };
  people: string;
  posts: Array<string>;
  title: string;
}

export type CreateBlogProps = GetBlogResponse;
