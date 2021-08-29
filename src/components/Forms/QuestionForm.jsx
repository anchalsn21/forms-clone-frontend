import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import {
  addQuestionAction,
  resetQuestionAction,
} from "../../redux/actions/question_action";
import { useSelector, useDispatch } from "react-redux";

let initialMcqState = [{ val: 1, text: "option 1" }];
let initialCheckboxState = [{ val: 1, text: "check 1", selected: false }];

function QuestionForm({ handleClose }) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [mcqData, setMcqData] = useState(initialMcqState);
  const [checkboxData, setCheckboxData] = useState(initialCheckboxState);
  const [questionType, setQuestionType] = useState("text");

  const addQuestion = (e) => {
    e.preventDefault();
    let payload = {
      question,
      questionType,
    };
    if (questionType == "mcq") payload.options = mcqData;
    if (questionType == "checkbox") payload.options = checkboxData;

    dispatch(addQuestionAction(payload));
    handleClose();
  };

  const updateQuestionType = (e) => {
    const { value } = e.target;
    setQuestionType(value);
    if (value == "mcq") {
      //
      setCheckboxData(initialCheckboxState);
      return;
    }

    if (value == "text") {
      setMcqData(initialMcqState);
      setCheckboxData(initialCheckboxState);
      return;
    }

    if (value == "checkbox") {
      setMcqData(initialMcqState);
    }
  };

  const updateIndex = (idx) => (e) => {
    let mq = [...mcqData];
    mq[idx].text = e.target.value;
    setMcqData(mq);
  };

  const addNewOption = () => {
    if (mcqData.length >= 4) return;
    let data = {
      val: mcqData.length + 1,
      text: "option " + (mcqData.length + 1),
    };
    let mq = [...mcqData, data];
    setMcqData(mq);
  };

  const updateCheckboxIndex = (idx) => (e) => {
    let mq = [...checkboxData];
    mq[idx].text = e.target.value;
    setMcqData(mq);
  };

  const addNewCheckboxOption = () => {
    if (checkboxData.length >= 4) return;
    let data = {
      val: checkboxData.length + 1,
      text: "check " + (checkboxData.length + 1),
      selected: false,
    };
    let cq = [...checkboxData, data];
    setCheckboxData(cq);
  };

  return (
    <Form onSubmit={addQuestion}>
      <div className="question__form">
        <div className="input__field">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Question</Form.Label>
            <Form.Control
              size="lg"
              required
              placeholder="question"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              name="question"
            />
          </Form.Group>
        </div>
        <div className="input__field">
          <Form.Control
            onChange={updateQuestionType}
            required
            name="questionType"
            as="select"
            size="lg"
          >
            <option default value={questionType} value="text">
              Text
            </option>
            <option value="mcq">Multiple Choices</option>
            <option value="checkbox">Checkbox</option>
          </Form.Control>
        </div>
        <div className="input__field">
          {questionType === "mcq" && (
            <>
              <div>
                {mcqData.map((v, index) => (
                  <Form.Control
                    key={v.val}
                    type="text"
                    placeholder="enter choice"
                    value={v.text}
                    onChange={updateIndex(index)}
                  />
                ))}
                <Form.Control
                  type="button"
                  onClick={addNewOption}
                  value="+add new Choice"
                />
              </div>
            </>
          )}

          {questionType === "checkbox" && (
            <>
              <div>
                {checkboxData.map((v, index) => (
                  <Form.Control
                    key={v.val}
                    type="text"
                    placeholder="Enter Checkbox name"
                    value={v.text}
                    onChange={updateCheckboxIndex(index)}
                  />
                ))}

                <Form.Control
                  type="button"
                  variant="primary"
                  onClick={addNewCheckboxOption}
                  value="  +add new checkbox option"
                />
              </div>
            </>
          )}

          {/* Here User should be able to add the question options dynamically */}
        </div>
        <div className="button__group__modal">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="success">
            Add
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default QuestionForm;
