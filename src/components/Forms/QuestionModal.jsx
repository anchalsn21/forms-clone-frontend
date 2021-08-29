import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QuestionForm from "./QuestionForm";

function QuestionModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuestionForm {...props} />
      </Modal.Body>
    </Modal>
  );
}

export default QuestionModal;
