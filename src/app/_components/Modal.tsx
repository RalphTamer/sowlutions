"use client";
import { Fragment, useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, height }) => {
  if (!isOpen) {
    return null;
  }
  const zIndex = 1000000;
  return (
    <Fragment>
      <div
        onClick={onClose}
        style={{
          display: isOpen === true ? "block" : "none",
          position: "fixed",
          zIndex: zIndex - 1,
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
          height: "100%",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.4)",
          margin: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          zIndex: zIndex,
          left: "50%",
          bottom: 0,
          top: "50%",
          right: 0,
          transform: "translate(-50%,-50%)",
          height: "80%",
          width: "80vw",
          maxWidth: "100%",
          overflowY: "auto",
          boxShadow: "1px 1px 15px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            padding: "16px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            top: 0,
            zIndex: 10,
          }}
        >
          <div className="cursor-pointer" onClick={onClose}>
            X
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
