import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import QuestionModal from "../Forms/QuestionModal";
import RenderAddedQuestion from "../Forms/RenderAddedQuestion";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestionAction,
  resetQuestionAction,
} from "../../redux/actions/question_action";
import { addNewFormApi } from "../../api/form.api";

function AddForm({ history }) {
  const dispatch = useDispatch();
  const addedQuestions = useSelector((state) => state.questions.questions);
  const [show, setShow] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSaved, setFormSaved] = useState(false);
  const [formUrl, setFormUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      // Hit Api Here
      let params = {
        name: formName,
        description: formDescription,
        questions: addedQuestions,
      };

      const { data } = await addNewFormApi(params);
      setFormSaved(true);
      setFormUrl(data?.form?.url);
      dispatch(resetQuestionAction());
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    //  Reset the state on Cleanup
    setFormName("");
    setFormDescription("");
    setFormSaved(false);
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  const clearForm = () => {
    setFormName("");
    setFormDescription("");
    dispatch(resetQuestionAction());
  };

  if (formSaved) {
    return (
      <>
        <div className="form__saved page__center">
          Form Saved Your form Url is {formUrl}
        </div>
        <Button variant="danger" onClick={() => history.push("/dashboard")}>
          Go Back
        </Button>
      </>
    );
  }
  return (
    <div className="add__form dashboard__container ">
      <div className="dashboard__menubar">
        <Button variant="danger" onClick={() => history.goBack()}>
          Go Back
        </Button>
        <h1>Add Form</h1>
        <Button variant="dark" onClick={handleShow}>
          Add New Question
        </Button>
      </div>

      <QuestionModal show={show} handleClose={handleClose} />
      <Card className="add__form__container container">
        <Form onSubmit={submitForm}>
          <div className="form__details">
            <div className="form__details__fields">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Form Name</Form.Label>
                <Form.Control
                  name="formName"
                  placeholder="enter Form name"
                  value={formName}
                  required
                  onChange={(e) => setFormName(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="form__details__fields">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Form Description</Form.Label>
                <Form.Control
                  type="text"
                  name="formDescription"
                  placeholder="form description"
                  id=""
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="added__questions">
            {addedQuestions.length == 0 && (
              <div className="center__content">No Questions Added</div>
            )}
            {addedQuestions.map((q, i) => (
              <RenderAddedQuestion key={i} questionData={q} />
            ))}
          </div>

          <div className="add__form__buttons">
            <Button variant="danger" type="reset" onClick={clearForm}>
              Clear
            </Button>

            <Button
              variant="success"
              type="submit"
              disabled={addedQuestions.length == 0}
            >
              Save Form
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AddForm;
