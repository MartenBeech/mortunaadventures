import React, { useEffect, useState } from "react";
import { GetBlogResponse } from "../../entities/blog";
import { GetBlog, CreateBlog } from "../../rest/blog";
import { GetImages, UploadImages } from "../../rest/storage";
import { GetCurrentDate } from "../../services/dateConverter";
import { Title, TitleInput } from "../title";
import TextareaAutosize from "react-textarea-autosize";
import { UserIsAdmin } from "./login";
import { NewsBox } from "../newsBox";
import { PointClicked } from "./googleMap";

export function Blog() {
  const url = window.location.href;
  const blogUrl = "/blog/";
  const blogLoc = url.search(blogUrl);
  const id = parseInt(url.substring(blogLoc + blogUrl.length));

  const [state, setState] = useState<GetBlogResponse>({
    date: GetCurrentDate(),
    label: "",
    id: 0,
    location: { lat: PointClicked.latitude, long: PointClicked.longitude },
    posts: [""],
    title: "",
    description: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([[], [], []] as Array<
    Array<File>
  >);
  const [imageURLs, setImageURLs] = useState([] as Array<Array<string>>);
  const [loading, setLoading] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const blog = await GetBlog(id);
      setState(blog);
      const images = await GetImages({
        id: id,
        maxImages: blog.posts.length + 2,
      });
      setImageURLs(images);
      setLoading(false);
    };

    if (id) {
      getData();
    }
  }, []);

  return (
    <div className="ml-8 mr-8">
      {UserIsAdmin ? (
        <TitleInput state={state} setState={setState} />
      ) : (
        <Title title={state.title} />
      )}

      <TextareaAutosize
        className="font-montserrat w-full bg-background resize-none px-2 py-2 rounded-lg"
        disabled={UserIsAdmin ? false : true}
        value={state.description}
        placeholder="Please enter Description..."
        onChange={(event) => {
          setState({ ...state, description: event.target.value });
        }}
      />

      {notifyMsg && (
        <div className="flex justify-center items-center w-full bg-highlights mb-8">
          {notifyMsg}
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {UserIsAdmin && (
            <div className="flex flex-col justify-center mb-8 bg-details-light">
              <div className="mt-2 mb-2">
                <div className="flex items-center w-full">
                  <div className="font-montserrat font-bold w-1/4 ml-4">
                    Lati:{" "}
                  </div>
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
                <div className="flex items-center w-full mt-2">
                  <div className="font-montserrat font-bold w-1/4 ml-4">
                    Long:{" "}
                  </div>
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
                <div className="flex items-center w-full mt-2">
                  <div className="font-montserrat font-bold w-1/4 ml-4">
                    Label:{" "}
                  </div>
                  <select
                    className="w-full h-10 px-2 bg-details-light border-base border ml-4 rounded font-montserrat mr-4"
                    value={state.label}
                    onChange={(event) => {
                      setState({
                        ...state,
                        label: event.target.value,
                      });
                    }}
                  >
                    <option value={""}>Please select an option...</option>
                    <option>Travels</option>
                    <option>Events</option>
                  </select>
                </div>
                <div className="flex items-center w-full mt-2">
                  <div className="font-montserrat font-bold w-1/4 ml-4">
                    Date:{" "}
                  </div>
                  <input
                    className="w-full h-10 px-2 bg-details-light border-base border ml-4 rounded font-montserrat mr-4"
                    type={"text"}
                    value={state.date}
                    onChange={(event) => {
                      setState({
                        ...state,
                        date: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {state.posts.map((post, index) => {
            return (
              <div key={index} className="mt-8">
                <div className="mt-2">
                  <div className="w-full">
                    <TextareaAutosize
                      className="font-montserrat w-full bg-background resize-none px-2 py-2 rounded-lg text-sm"
                      disabled={UserIsAdmin ? false : true}
                      value={post}
                      placeholder="Please enter Text..."
                      onChange={(event) => {
                        const posts = [...state.posts];
                        posts[index] = event.target.value;
                        setState({ ...state, posts });
                      }}
                    />
                  </div>
                </div>
                {uploadedFiles[index + 2] && (
                  <div className="flex w-full justify-center">
                    <div>
                      {uploadedFiles[index + 2].length > 0 && (
                        <img
                          src={URL.createObjectURL(uploadedFiles[index + 2][0])}
                        />
                      )}
                    </div>
                  </div>
                )}
                {imageURLs[index + 2] && (
                  <div className="flex w-full justify-center">
                    <div>
                      {imageURLs[index + 2].length > 0 && (
                        <img src={imageURLs[index + 2][0]} />
                      )}
                    </div>
                  </div>
                )}
                {UserIsAdmin && (
                  <div className="mt-2">
                    <input
                      type={"file"}
                      onChange={(event) => {
                        let uploadedFilesCopy: Array<Array<File>> = [];
                        uploadedFiles.map((uploadedFile) => {
                          uploadedFilesCopy = [
                            ...uploadedFilesCopy,
                            uploadedFile,
                          ];
                        });
                        const selectedFiles = Array.from(event.target.files);
                        uploadedFilesCopy[index + 2] = selectedFiles;

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
                        <img src={imageUrl} />
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
                        <img src={URL.createObjectURL(uploadedFile)} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {UserIsAdmin && (
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
          {UserIsAdmin && (
            <div>
              <div className="flex justify-end mt-8">
                <button
                  className="border border-base bg-highlights hover:bg-details-light w-1/3 mr-8 h-12 mb-4 rounded-xl font-montserrat"
                  onClick={() => {
                    setState({
                      ...state,
                      posts: [...state.posts, "*TEXT HERE*"],
                    });
                    setUploadedFiles([...uploadedFiles, []]);
                  }}
                >
                  Add Chapter
                </button>
                <button
                  className="border border-base bg-highlights hover:bg-details-light w-1/2 h-12 mb-4 rounded-xl font-montserrat"
                  onClick={() => {
                    if (state.location.lat >= 90 || state.location.long >= 90) {
                      setNotifyMsg("Latitude/Longitude must be less than 90");
                    } else if (!state.label) {
                      setNotifyMsg("Please select a label");
                    } else {
                      setLoading(true);
                      setNotifyMsg("");

                      const uploader = async (id: number) => {
                        await Promise.all(
                          uploadedFiles.map((uploadedFile, index) => {
                            return UploadImages({
                              id: id,
                              files: uploadedFile,
                              chapter: index,
                            });
                          })
                        ).then(() => {
                          setNotifyMsg("Successfully uploaded blog!");
                        });
                      };

                      CreateBlog({
                        id: state.id,
                        label: state.label,
                        location: state.location,
                        posts: state.posts,
                        title: state.title,
                        date: state.date,
                        description: state.description,
                      }).then((id) => {
                        uploader(id);
                      });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
              <Title title="Preview" />
              {uploadedFiles[1] && uploadedFiles[1].length > 0 && (
                <div>
                  <NewsBox
                    date={state.date}
                    id={state.id}
                    imgSrc={URL.createObjectURL(uploadedFiles[1][0])}
                    title={state.title}
                    description={state.description}
                  />
                </div>
              )}
              {imageURLs[1] && imageURLs[1].length > 0 && (
                <div>
                  <NewsBox
                    date={state.date}
                    id={state.id}
                    imgSrc={imageURLs[1][0]}
                    title={state.title}
                    description={state.description}
                  />
                </div>
              )}
              <div className="mt-2">
                <input
                  type={"file"}
                  onChange={(event) => {
                    let uploadedFilesCopy: Array<Array<File>> = [];
                    uploadedFiles.map((uploadedFile) => {
                      uploadedFilesCopy = [...uploadedFilesCopy, uploadedFile];
                    });
                    const selectedFiles = Array.from(event.target.files);
                    uploadedFilesCopy[1] = selectedFiles;

                    setUploadedFiles(uploadedFilesCopy);
                  }}
                />
              </div>
              <div className="h-8"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
