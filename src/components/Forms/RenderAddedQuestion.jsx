import React from "react";
import { Card, Form } from "react-bootstrap";
function RenderAddedQuestion({ questionData }) {
  return (
    <Card className="mrg__20">
      <div className="render__added__question">
        <div className="question">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" value={questionData.question} />
        </div>
        <div className="question">
          <Form.Label>Question Type</Form.Label>
          <Form.Control
            disabled
            required
            name="questionType"
            as="select"
            size="lg"
          >
            <option default value={questionData.questionType} value="text">
              {questionData.questionType}
            </option>
          </Form.Control>
        </div>
        <div className="question">
          {questionData.questionType == "mcq" && (
            <>
              {questionData.options.map((opt, i) => (
                <div key={i + opt.text}>
                  <Form.Check
                    disabled
                    type="radio"
                    name="mcq"
                    label={opt.text}
                  />{" "}
                </div>
              ))}
            </>
          )}

          {questionData.questionType == "checkbox" && (
            <>
              {questionData.options.map((opt, i) => (
                <>
                  <Form.Check disabled type="checkbox" value={opt.text} />{" "}
                  <label htmlFor={opt.text}>{opt.text}</label>
                </>
              ))}
            </>
          )}

          {questionData.questionType == "text" && (
            <>
              <Form.Label>Options</Form.Label>
              <Form.Control
                type="text"
                placeholder={"Short Answer . . ."}
              />{" "}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

export default RenderAddedQuestion;
