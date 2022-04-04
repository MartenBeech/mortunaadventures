import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GetBlogResponse } from "../../entities/blog";
import { GetBlog } from "../../rest/blog";
import { Title } from "../title";
import { GoogleMap } from "./googleMap";

const customStyles = {
  content: {
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "10%",
  },
};

interface modalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

export function BlogModal(props: modalProps) {
  const [state, setState] = useState(null as GetBlogResponse);

  useEffect(() => {
    const getData = async () => {
      const blog = await GetBlog(props.id);
      setState(blog);
    };
    if (props.id) {
      getData();
    }
  }, []);

  return (
    <>
      <Modal isOpen={props.modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="flex flex-col justify-center w-full">
          <div>
            <button
              className="border border-black"
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
          <Title title={state.title} />

          <GoogleMap />
        </div>
      </Modal>
    </>
  );
}
