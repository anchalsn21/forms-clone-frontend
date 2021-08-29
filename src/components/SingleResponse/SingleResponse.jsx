import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Card, Button, Container } from "react-bootstrap";
import RenderSingleQuestion from "./RenderSingleQuestion";
import { getSingleResponseByIdApi } from "../../api/responses.api";

function SingleResponse(props) {
  const { id } = useParams();
  const [singleResponse, setSingleResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getSingleResponseData = async () => {
    try {
      const { data } = await getSingleResponseByIdApi(id);
      setSingleResponse(data.response);
    } catch (error) {
      console.log(error);
      setHasError(error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await getSingleResponseData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="page__center">Loading.... Please .... wait ....</div>
    );
  }

  if (hasError) {
    return <div className="page__center">Something went wrong</div>;
  }

  if (!singleResponse) {
    return <div className="page__center">No single Response found</div>;
  }
  return (
    <div className="single__response__container">
      <div className="dashboard__menubar">
        <Button variant="danger" onClick={() => props.history.goBack()}>
          Go Back
        </Button>
        <h1>Form Response</h1>
        <div></div>
      </div>
      <Container>
        <Form.Group>
          <Form.Label>Form Name</Form.Label>
          <Form.Control placeholder={singleResponse?.form?.name} disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>Form Url</Form.Label>
          <Form.Control placeholder={singleResponse?.form?.url} disabled />
        </Form.Group>

        <Form.Group>
          <Form.Label>Added By </Form.Label>
          <Form.Control placeholder={singleResponse?.addedBy} disabled />
        </Form.Group>

        <Form.Group>
          <Form.Label>Form Description</Form.Label>
          <Form.Control
            placeholder={singleResponse?.form?.description}
            disabled
          />
        </Form.Group>
        {singleResponse?.questions.length == 0 && "No Question Found"}
        {singleResponse?.questions?.map((question, i) => (
          <RenderSingleQuestion key={i} question={question} />
        ))}
      </Container>
    </div>
  );
}

export default SingleResponse;
