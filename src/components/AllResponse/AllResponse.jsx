import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllResponses } from "../../redux/actions/response_action";

function AllResponse(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allResponses, isLoading, isError } = useSelector(
    (state) => state.responses
  );

  useEffect(async () => {
    await getAllResponsesData();
  }, []);

  const getAllResponsesData = async () => {
    await dispatch(getAllResponses(id));
  };

  const viewSingleFormResponse = (i) => {
    props.history.push(`/form/single-response/${i}`);
  };

  if (isError) {
    return (
      <div className="page__center">
        <h1>Something went wrong fething the reponse data</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page__center">
        <h1>Loading . . .</h1>
      </div>
    );
  }
  return (
    <div className="dashboard__container">
      <div className="dashboard__menubar">
        <Button
          variant="danger"
          onClick={() => props.history.push("/dashboard")}
        >
          Go Back
        </Button>
        <h1>All Responses</h1>
        <div></div>
      </div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Form Name</th>
              <th>Form Url</th>
              <th>Created At</th>
              {/* <th>Added By </th> */}
              <th>View Single Response</th>
            </tr>
          </thead>
          <tbody>
            {allResponses.length == 0 ? (
              <tr>
                <td colSpan="5">No Responses Found</td>
              </tr>
            ) : (
              <>
                {allResponses.map((resp, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{resp?.form?.name}</td>
                    <td>{resp?.form?.url}</td>
                    <td>{resp?.form?.createdAt}</td>
                    <td onClick={() => viewSingleFormResponse(resp._id)}>
                      <Button variant="dark">View Single Response</Button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AllResponse;
