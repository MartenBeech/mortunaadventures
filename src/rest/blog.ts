import { doc, getDoc, collection, setDoc, getDocs } from "firebase/firestore";
import { db } from "./auth";
import { GetBlogResponse, CreateBlogProps } from "../entities/blog";

export async function GetBlog(blogId: number): Promise<GetBlogResponse> {
  let returnValue: GetBlogResponse | undefined;
  const docRef = doc(db, "blogs", blogId.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const snapData = docSnap.data();
    returnValue = snapData as GetBlogResponse;
  }
  return returnValue;
}

export async function GetBlogs(): Promise<Array<GetBlogResponse>> {
  let returnValue: Array<GetBlogResponse> = [];
  const colRef = collection(db, "blogs");
  const colSnap = await getDocs(colRef);
  colSnap.forEach((doc) => {
    const data = doc.data() as GetBlogResponse;
    returnValue.push(data);
  });
  return returnValue;
}

export async function CreateBlog(props: CreateBlogProps) {
  const colRef = collection(db, "blogs");

  let id = props.id;
  if (!id) {
    const blogs = await GetBlogs();
    id = blogs.length + 1;
  }

  await setDoc(doc(colRef, `${id}`), {
    id: id,
    title: props.title,
    posts: props.posts,
    date: props.date,
    location: props.location,
  });
  return id;
}
