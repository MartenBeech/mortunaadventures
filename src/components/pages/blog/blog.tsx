import React, { useEffect, useState } from "react";
import { GetBlogResponse } from "../../../entities/blog";
import { GetBlog, CreateBlog } from "../../../rest/blog";
import { GetImages, UploadImages } from "../../../rest/storage";
import { GetCurrentDate } from "../../../services/dateConverter";
import { Title, TitleInput } from "../../title";
import { UserIsAdmin } from "../login";
import { NewsBox } from "../../newsBox";
import { PointClicked } from "../googleMap";
import { Paragraph, TextArea } from "../../paragraph";
import { FileInput, Input } from "./blogComponent";

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
    people: "",
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
    <div className="ml-2 mr-2">
      {UserIsAdmin ? (
        <TitleInput state={state} setState={setState} />
      ) : (
        <Title title={state.title} />
      )}

      <TextArea
        elementName="Description"
        value={state.description}
        onChange={(event) => {
          setState({ ...state, description: event.target.value });
        }}
      />

      {notifyMsg && (
        <div className="flex justify-center items-center w-full bg-highlights mb-8">
          <Paragraph value={notifyMsg} />
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {UserIsAdmin && (
            <div className="flex flex-col justify-center mb-8 bg-highlights border border-base">
              <div className="mt-2 mb-2">
                <div className="flex items-center w-full">
                  <div className="w-1/4 ml-4">
                    <Paragraph value="Lati:" bold />
                  </div>
                  <Input
                    type="number"
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
                  <div className="w-1/4 ml-4">
                    <Paragraph value="Long:" bold />
                  </div>
                  <Input
                    type="number"
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
                  <div className="w-1/4 ml-4">
                    <Paragraph value="Label:" bold />
                  </div>
                  <select
                    className="w-full h-10 px-2 bg-highlights border-base border ml-4 rounded font-montserrat mr-4"
                    value={state.label}
                    onChange={(event) => {
                      setState({
                        ...state,
                        label: event.target.value,
                      });
                    }}
                  >
                    <option value={""} disabled>
                      Please select an option...
                    </option>
                    <option>Travels</option>
                    <option>Events</option>
                  </select>
                </div>
                <div className="flex items-center w-full mt-2">
                  <div className="w-1/4 ml-4">
                    <Paragraph value="People:" bold />
                  </div>
                  <select
                    className="w-full h-10 px-2 bg-highlights border-base border ml-4 rounded font-montserrat mr-4"
                    value={state.people}
                    onChange={(event) => {
                      setState({
                        ...state,
                        people: event.target.value,
                      });
                    }}
                  >
                    <option value={""}>Both</option>
                    <option value={"Una"}>Una Martusanska</option>
                    <option value={"Morten"}>Morten Bech</option>
                  </select>
                </div>
                <div className="flex items-center w-full mt-2">
                  <div className="w-1/4 ml-4">
                    <Paragraph value="Date:" bold />
                  </div>
                  <Input
                    type="text"
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
                    <TextArea
                      elementName="Text"
                      value={post}
                      textSize="sm"
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
                    <FileInput
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
          <div className="flex justify-end">
            <button
              className="border border-base bg-highlights hover:bg-details-light w-1/3 h-12 mb-4 rounded-xl font-montserrat mt-8"
              onClick={() => {
                setState({
                  ...state,
                  posts: [...state.posts, ""],
                });
                setUploadedFiles([...uploadedFiles, []]);
              }}
            >
              Add Chapter
            </button>
          </div>
          <Title title="Gallery" />
          <div className="mt-8">
            {imageURLs[0] && (
              <div className="flex w-full justify-center">
                <div>
                  {imageURLs[0].map((imageUrl, index) => {
                    return (
                      <div key={index} className="mb-4 flex justify-center">
                        {imageUrl.includes("video") ? (
                          <video src={imageUrl} controls></video>
                        ) : (
                          <img src={imageUrl} />
                        )}
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
                        {uploadedFile.type.includes("video") ? (
                          <video
                            src={URL.createObjectURL(uploadedFile)}
                            controls
                          ></video>
                        ) : (
                          <img src={URL.createObjectURL(uploadedFile)} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {UserIsAdmin && (
              <FileInput
                includeVideos
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
                <FileInput
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
              <div className="flex justify-end mt-20 mb-8">
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
                        people: state.people,
                      }).then((id) => {
                        uploader(id);
                      });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
