import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible() {
    const [show, setShow] = useState(false);
  
    return (
      <>
      <br/>
        {show &&
        <Alert show={show} variant="success">
          <Alert.Heading>Form is submitted</Alert.Heading>
          <p>
            We will get back to you soon.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
        }
  
        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }  

const AlertDiv = () => (
    <div>
        <AlertDismissible />
    </div>
  );
  
export default AlertDiv;