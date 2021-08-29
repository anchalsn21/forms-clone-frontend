import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllForms } from "../../redux/actions/form_action";
import { logoutUser } from "../../redux/actions/user_action";
function Dashboard({ history }) {
  const { allForms, isLoading, isError } = useSelector((state) => state.forms);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllForms());
  }, []);

  const viewFormResponse = (id) => {
    history.push(`/form/all-response/${id}`);
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser());

      history.push("/login");
    } catch (error) {
      console.log(error);
      localStorage.clear();
      history.push("/login");
    }
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
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="dashboard__container">
      <div className="dashboard__menubar">
        <Button variant="danger" onClick={() => history.push("/login")}>
          Go Back
        </Button>
        <Button variant="warning" onClick={() => history.push("/form/add")}>
          Add New Form
        </Button>

        <Button variant="dark" onClick={logout}>
          Logout
        </Button>
      </div>
      <Container>
        <h1>Dashboard</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Form Name</th>
              <th>Form Url</th>
              <th>Created At</th>
              <th>Total Responses (count)</th>
              <th>View All Responses</th>
            </tr>
          </thead>
          <tbody>
            {allForms.length === 0 ? (
              <tr>
                <td colSpan="5">No Forms Found</td>
              </tr>
            ) : (
              <>
                {allForms.map((form, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{form.name}</td>
                    <td>{form.url}</td>
                    <td>{form.createdAt}</td>
                    <td>{form.responseCount}</td>
                    <td onClick={() => viewFormResponse(form._id)}>
                      <Button variant="dark">View All Responses</Button>
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

export default Dashboard;
