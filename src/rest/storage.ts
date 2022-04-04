import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

interface uploadImagesProps {
  id: number;
  chapter: number;
  files: Array<File>;
}

export function UploadImages(props: uploadImagesProps) {
  const storage = getStorage();
  props.files.map((file) => {
    const imagesRef = ref(
      storage,
      `images/${props.id}/${props.chapter}/${file.name}`
    );
    uploadBytes(imagesRef, file);
  });
}

interface getImagesProps {
  id: number;
  chapter: number;
}

export async function GetImages(props: getImagesProps) {
  const storage = getStorage();
  const listRef = ref(storage, `images/${props.id}/${props.chapter}`);
  const res = await listAll(listRef);

  const URLs = await Promise.all(
    res.items.map((itemRef) => {
      return getDownloadURL(itemRef);
    })
  );

  return URLs;
}
