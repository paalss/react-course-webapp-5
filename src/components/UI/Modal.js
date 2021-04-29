import { Fragment } from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onClick, children }) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById("overlays")
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
