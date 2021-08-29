import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { loginUser } from "../../redux/actions/user_action";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
const googleClientId =
  "706757470027-5rfh6srr1sup8peif7mmm44489edqbpc.apps.googleusercontent.com";
function Login({ history }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoading, user, token, isError } = useSelector(
    (state) => state.user
  );

  const responseGoogle = async (response) => {
    await dispatch(loginUser(response.tokenId));
    history.push("/dashboard");
  };
  const failureResponseGoogle = (r) => {
    console.log(r);
  };

  if (isLoading) {
    return <div className="page__center">Loading . . .</div>;
  }

  return (
    <div className="login__page">
      <div className="google__login__container container center__content">
        <Card
          className="text-center"
          style={{ width: "30rem", height: "30rem" }}
        >
          <Card.Header>Login </Card.Header>
          <Card.Body>
            <Card.Title>Please Login to access Forms dashboard</Card.Title>
            <Card.Text className="google__button">
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Login Via Google"
                onSuccess={responseGoogle}
                onFailure={failureResponseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
