import React from "react";
import { Form, Button, Card } from "react-bootstrap";
function RenderSingleQuestion({ question }) {
  return (
    <div className="single__response__question__container">
      <Card className="mrg__20 p-3">
        <div className="render__added__question">
          <div className="question">
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" value={question.question} />
          </div>
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
            <option default value={question.questionType} value="text">
              {question.questionType}
            </option>
          </Form.Control>
        </div>

        <div className="question">
          {question.questionType == "mcq" && (
            <>
              {question.options.map((opt, i) => (
                <div key={i + opt.text}>
                  <Form.Check
                    disabled
                    type="radio"
                    checked={opt.text == question.textAnswer}
                    // value={question.textAnswer}
                    name="mcq"
                    label={opt.text}
                  />{" "}
                  {/* <label htmlFor={opt.text}>{opt.text}</label> */}
                </div>
              ))}
            </>
          )}

          {question.questionType == "checkbox" && (
            <>
              {question.options.map((opt, i) => (
                <>
                  <Form.Check
                    disabled
                    checked={opt.selected}
                    type="checkbox"
                    value={opt.text}
                  />{" "}
                  <label htmlFor={opt.text}>{opt.text}</label>
                </>
              ))}
            </>
          )}

          {question.questionType == "text" && (
            <>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={"Short Answer . . ."}
                value={question.textAnswer}
              />{" "}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default RenderSingleQuestion;
