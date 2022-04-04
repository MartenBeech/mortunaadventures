import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const customStyles = {
  content: {
    top: "5%",
    left: "5%",
    right: "5%",
    bottom: "5%",
  },
};

interface imageModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  srcs: Array<string>;
}

export function ImageModal(props: imageModalProps) {
  const [state, setState] = useState({ page: 0 });
  return (
    <>
      <Modal isOpen={props.modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="flex justify-center max-h-full ">
          <AiOutlineCloseCircle
            className="absolute right-8 top-8 w-10 h-10 cursor-pointer fill-base"
            onClick={() => {
              props.setModalOpen(false);
            }}
          />
          <div className="flex justify-center">
            <img
              src={props.srcs[state.page]}
              onClick={() => {
                if (state.page < props.srcs.length - 1) {
                  setState({ page: state.page + 1 });
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
