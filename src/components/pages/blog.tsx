import React, { useEffect, useState } from "react";
import { GetBlogResponse } from "../../entities/blog";
import { GetBlog, CreateBlog } from "../../rest/blog";
import { GetImages, UploadImages } from "../../rest/storage";
import { GetCurrentDate } from "../../services/dateConverter";
import { Title, TitleInput } from "../title";
import { ImageModal } from "../imageModal";
import TextareaAutosize from "react-textarea-autosize";

export function Blog() {
  const url = window.location.href;
  const blogUrl = "/blog/";
  const blogLoc = url.search(blogUrl);
  const id = parseInt(url.substring(blogLoc + blogUrl.length));

  const [state, setState] = useState({
    date: "",
    id: 0,
    location: { lat: 0, long: 0 },
    posts: ["Text here"],
    title: "Title",
  } as GetBlogResponse);
  const [uploadedFiles, setUploadedFiles] = useState([[], []] as Array<
    Array<File>
  >);
  const [imageURLs, setImageURLs] = useState([] as Array<Array<string>>);
  const [modalOpen, setModalOpen] = useState(false);
  const [srcsClicked, setSrcsClicked] = useState([""]);

  useEffect(() => {
    const getData = async () => {
      const blog = await GetBlog(id);
      setState(blog);
      // const images = await Promise.all(
      //   blog.posts.map((post, index) => {
      //     return GetImages({ id: id, chapter: index });
      //   })
      // );
      const images = await GetImages({ id: id });
      setImageURLs(images);
    };

    if (id) {
      getData();
    }
  }, []);

  return (
    <div className="ml-8 mr-8">
      {modalOpen && (
        <ImageModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          srcs={srcsClicked}
        />
      )}
      {state.id ? (
        <Title title={state.title} />
      ) : (
        <TitleInput state={state} setState={setState} />
      )}

      {!state.id && (
        <div className="flex flex-col justify-center mb-8 bg-details-light h-24">
          <div className="flex items-center w-full mb-2">
            <div className="font-montserrat font-bold w-1/4 ml-4">Lati: </div>
            <input
              className="w-full h-10 px-2 bg-details-light border-base border ml-4 rounded font-montserrat mr-4"
              type={"number"}
              value={state.location.lat}
              onChange={(event) => {
                setState({
                  ...state,
                  location: {
                    ...state.location,
                    lat: parseFloat(event.target.value),
                  },
                });
              }}
            />
          </div>
          <div className="flex items-center w-full">
            <div className="font-montserrat font-bold w-1/4 ml-4">Long: </div>
            <input
              className="w-full h-10 px-2 bg-details-light border-base border ml-4 rounded font-montserrat mr-4"
              type={"number"}
              value={state.location.long}
              onChange={(event) => {
                setState({
                  ...state,
                  location: {
                    ...state.location,
                    long: parseFloat(event.target.value),
                  },
                });
              }}
            />
          </div>
        </div>
      )}

      {state.posts.map((post, index) => {
        return (
          <div key={index} className="mt-8">
            <div className="mt-2">
              <div className="w-full">
                <TextareaAutosize
                  className="font-montserrat w-full bg-background resize-none px-2 py-2 rounded-lg"
                  disabled={state.id ? true : false}
                  value={post}
                  onChange={(event) => {
                    let posts = [...state.posts];
                    posts[index] = event.target.value;
                    setState({ ...state, posts });
                  }}
                />
              </div>
            </div>
            {uploadedFiles[index + 1] && (
              <div className="flex w-full justify-center">
                <div>
                  {uploadedFiles[index + 1].length > 0 && (
                    <img
                      className="max-h-60"
                      src={URL.createObjectURL(uploadedFiles[index + 1][0])}
                    />
                  )}
                </div>
              </div>
            )}
            {imageURLs[index + 1] && (
              <div className="flex w-full justify-center">
                <div>
                  {imageURLs[index + 1].length > 0 && (
                    <img className="max-h-60" src={imageURLs[index + 1][0]} />
                  )}
                </div>
              </div>
            )}
            {!state.id && (
              <div>
                <input
                  type={"file"}
                  onChange={(event) => {
                    let uploadedFilesCopy: Array<Array<File>> = [];
                    uploadedFiles.map((uploadedFile) => {
                      uploadedFilesCopy = [...uploadedFilesCopy, uploadedFile];
                    });
                    const selectedFiles = Array.from(event.target.files);
                    uploadedFilesCopy[index + 1] = selectedFiles;

                    setUploadedFiles(uploadedFilesCopy);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      <Title title="Gallery" />
      <div className="mt-8">
        {imageURLs[0] && (
          <div className="flex w-full justify-center">
            <div>
              {imageURLs[0].map((imageUrl, index) => {
                return (
                  <div key={index} className="mb-4 flex justify-center">
                    <img className="max-h-60" src={imageUrl} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {uploadedFiles[0] && (
          <div className="flex w-full justify-center">
            <div>
              {uploadedFiles[0].map((uploadedFile, index) => {
                return (
                  <div key={index} className="mb-4 flex justify-center">
                    <img
                      className="max-h-60"
                      src={URL.createObjectURL(uploadedFile)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!state.id && (
          <input
            type={"file"}
            multiple
            onChange={(event) => {
              let uploadedFilesCopy: Array<Array<File>> = [];
              uploadedFiles.map((uploadedFile) => {
                uploadedFilesCopy = [...uploadedFilesCopy, uploadedFile];
              });
              const selectedFiles = Array.from(event.target.files);
              uploadedFilesCopy[0] = selectedFiles;

              setUploadedFiles(uploadedFilesCopy);
            }}
          />
        )}
      </div>
      {!state.id && (
        <div className="flex justify-end mt-8">
          <button
            className="border border-base bg-highlights hover:bg-details-light w-1/3 mr-8 h-12 mb-4 rounded-xl font-montserrat"
            onClick={() => {
              setState({
                ...state,
                posts: [...state.posts, "Text here"],
              });
              setUploadedFiles([...uploadedFiles, []]);
            }}
          >
            Add Chapter
          </button>
          <button
            className="border border-base bg-highlights hover:bg-details-light w-1/2 h-12 mb-4 rounded-xl font-montserrat"
            onClick={() => {
              imageURLs;

              CreateBlog({
                id: state.id,
                location: state.location,
                posts: state.posts,
                title: state.title,
                date: GetCurrentDate(),
              }).then((id) => {
                uploadedFiles.map((uploadedFile, index) => {
                  UploadImages({
                    id: id,
                    files: uploadedFile,
                    chapter: index,
                  });
                });
              });
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
