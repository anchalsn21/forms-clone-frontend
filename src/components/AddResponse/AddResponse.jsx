import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getSingleFormApi } from "../../api/form.api";
import { addNewResponseApi } from "../../api/responses.api";

function AddResponse() {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addedResponse, setAddedResponse] = useState(false);
  const [addedBy, setAddedBy] = useState("");
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  useEffect(async () => {
    setIsLoading(true);
    await getFormData();
    setIsLoading(false);
  }, []);

  const updateAddeddBy = (value) => {
    setAddedBy(value);
  };

  const getFormData = async () => {
    try {
      const { data } = await getSingleFormApi(id);
      setForm(data?.form);
    } catch (error) {
      console.log(error);
      setHasError(error);
    }
  };

  const updateTextQuestion = (questionIndex, textAnswer) => {
    let fm = { ...form };
    fm.questions[questionIndex].textAnswer = textAnswer;
    setForm(fm);
    console.log({ form });
  };

  const updateMcqQuestion = (questionIndex, value) => {
    let fm = { ...form };
    fm.questions[questionIndex].textAnswer = value;
    setForm(fm);
  };

  const updateCheckboxQuestion = (questionIndex, optionIndex, value) => {
    let fm = { ...form };
    fm.questions[questionIndex].options[optionIndex].selected = value;
    setForm(fm);
  };

  const submitFormResponse = async (e) => {
    try {
      e.preventDefault();
      let params = {
        form: id,
        questions: form.questions,
        addedBy: addedBy,
      };
      setIsLoading(true);
      const { data } = await addNewResponseApi(params);
      setAddedResponse(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setHasError(error);
    }
  };

  if (addedResponse) {
    return (
      <div className="page__center">
        <h1>
          Response Submitted SuccessFully
          <Button variant="danger" onClick={(e) => history.push("/login")}>
            Go To Home
          </Button>
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <div className="page__center">Loading . . .</div>;
  }

  if (hasError) {
    return <div className="page__center">Something went wrong</div>;
  }

  if (!isLoading && !form) {
    return <div className="page__center">No Form Found</div>;
  }

  // if(!form)
  return (
    <div className={"add__response__main "}>
      <div className="dashboard__menubar">
        <Button variant="danger" onClick={() => history.push("/login")}>
          Go Back
        </Button>
        <Button variant="warning">AddResponse</Button>

        <div></div>
      </div>
      <Container>
        {form ? (
          <Form onSubmit={submitFormResponse}>
            <Card className="add__response__form__details container p-3 m-3">
              <Card.Header>Form Details</Card.Header>
              <Card.Text>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Form Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Label column sm={2}>
                      {form.name}
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Form Description
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Label column sm={2}>
                      {form.description}
                    </Form.Label>
                  </Col>
                </Form.Group>
              </Card.Text>
            </Card>

            <Card className="response__questions container p-3 m-3">
              {form &&
                form?.questions?.map((ques, i) => (
                  <Card className="container p-4 m-4" key={i}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column sm={2}>
                        Question
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Label column sm={2}>
                          {ques.question}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column sm={2}>
                        Question Type
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Label column sm={2}>
                          {ques.questionType}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    {ques.questionType == "text" && (
                      <>
                        <Form.Label as="legend" column sm={2}>
                          Type Answer
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            updateTextQuestion(i, e.target.value)
                          }
                          value={ques.textAnswer}
                          name="textAnswer"
                          id=""
                        />
                      </>
                    )}

                    {ques.questionType == "checkbox" && (
                      <fieldset>
                        <Form.Group as={Row}>
                          <Form.Label as="legend" column sm={2}>
                            Check Answers
                          </Form.Label>
                          <Col sm={10}>
                            {ques.options.map((opt, j) => (
                              <div key={j + opt.text}>
                                <Form.Check
                                  type="checkbox"
                                  onChange={(e) =>
                                    updateCheckboxQuestion(
                                      i,
                                      j,
                                      e.target.checked
                                    )
                                  }
                                  name={opt.text}
                                  label={opt.text}
                                  value={opt.text}
                                />{" "}
                              </div>
                            ))}
                          </Col>
                        </Form.Group>
                      </fieldset>
                    )}

                    {ques.questionType == "mcq" && (
                      <fieldset>
                        <Form.Group as={Row}>
                          <Form.Label as="legend" column sm={2}>
                            Select Answer
                          </Form.Label>
                          <Col sm={4}>
                            {ques.options.map((opt, j) => (
                              <div key={j + opt.text}>
                                <Form.Check
                                  required
                                  type="radio"
                                  onChange={(e) =>
                                    updateMcqQuestion(i, e.target.value)
                                  }
                                  name={"mcq"}
                                  label={opt.text}
                                  value={opt.text}
                                />{" "}
                              </div>
                            ))}
                          </Col>
                        </Form.Group>
                      </fieldset>
                    )}
                  </Card>
                ))}
              <Form.Label>Added By</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => updateAddeddBy(e.target.value)}
                value={addedBy}
                name="addedBy"
                required
                id=""
              />
              <Button className="m-3" variant="success" type="submit">
                Submit Response
              </Button>
            </Card>
          </Form>
        ) : (
          "...."
        )}
      </Container>
    </div>
  );
}

export default AddResponse;
