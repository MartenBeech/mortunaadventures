import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

interface uploadImagesProps {
  folderId: number;
  chapter: number;
  files: Array<File>;
}

export async function UploadImages(props: uploadImagesProps) {
  const storage = getStorage();
  const uploadResult = await Promise.all(
    props.files.map((file) => {
      const imagesRef = ref(
        storage,
        `images/${props.folderId}/${props.chapter}/${file.name}`
      );
      return uploadBytes(imagesRef, file);
    })
  );
  return uploadResult;
}

interface getImagesProps {
  id: number;
  maxImages: number;
}

export async function GetImages(props: getImagesProps) {
  const storage = getStorage();

  const imageIds: Array<number> = [];
  for (let index = 0; index < props.maxImages; index++) {
    imageIds.push(index);
  }

  const getFolderData = async (index: number) => {
    const listRef = ref(storage, `images/${props.id}/${index}`);
    const res = await listAll(listRef);

    const URLs = await Promise.all(
      res.items.map((itemRef) => {
        return getDownloadURL(itemRef);
      })
    );
    return URLs;
  };

  const URLs = await Promise.all(
    imageIds.map((id, index) => {
      return getFolderData(index);
    })
  );

  return URLs;
}
