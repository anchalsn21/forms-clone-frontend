import React, { Fragment } from "react";

export default function PageNotFound() {
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#4a4a4a",
            marginTop: "4em",
            lineHeight: "1.5",
          }}
        >
          Sorry, this page doesn't exist.<br></br>Please check the URL or go
          back a page.
        </h1>

        <h2
          style={{
            fontFamily: "Verdana, sans-serif",
            color: "#7d7d7d",
            fontWeight: "300",
          }}
        >
          404 Error. Page Not Found.
        </h2>
      </div>
    </Fragment>
  );
}
