import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import QuestionModal from "./QuestionModal";
import RenderAddedQuestion from "./RenderAddedQuestion";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestionAction,
  resetQuestionAction,
} from "../../redux/actions/question_action";
function CreateFormTab() {
  const dispatch = useDispatch();
  const addedQuestions = useSelector((state) => state.questions.questions);

  const [show, setShow] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSaved, setFormSaved] = useState(false);
  const [formUrl, setFormUrl] = useState("");

  useEffect(() => {
    return () => {
      //
      resetState();
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!formName.trim()) return;
    setShow(true);
  };

  const submitForm = (e) => {
    // Hit Api Here
    setFormSaved(true);
    setFormUrl("Dummy Url");
    dispatch(resetQuestionAction());
  };

  const resetState = () => {
    //  Reset the state on Cleanup
    setFormName("");
    setFormDescription("");
    setFormSaved(false);
    setFormUrl("");
  };

  if (formSaved) {
    return (
      <>
        <div className="form__saved">Form Saved Your form Url is {formUrl}</div>
        <button onClick={resetState}>Create New Form</button>
      </>
    );
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="form__details">
          <div className="form__details__fields">
            <label htmlFor="formName">Form Name</label>
            <input
              name="formName"
              placeholder="enter Form name"
              value={formName}
              required
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="form__details__fields">
            <label htmlFor="formDescription">Form Description</label>
            <input
              type="text"
              name="formDescription"
              placeholder="form description"
              id=""
              required
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="added__questions">
          {addedQuestions.length == 0 && <>No Questions Added</>}
          {addedQuestions.map((q, i) => (
            <RenderAddedQuestion key={i} questionData={q} />
          ))}
        </div>

        <>
          <Button variant="primary" onClick={handleShow}>
            Add New Question
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={addedQuestions.length == 0}
          >
            Save Form
          </Button>
        </>
      </form>
      <QuestionModal show={show} handleClose={handleClose} />
    </>
  );
}

export default CreateFormTab;
