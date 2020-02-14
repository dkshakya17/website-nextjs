import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
const Error = ({statusCode}) => {
  return (
    <>
    <Row className="text-center error_wrapper py-5 m-0">
    <Col className="text-center col-11 m-auto p-0">
        <Image className="my-4 error_img" src="/oops_vector.svg"></Image>
        <h5 className="orange_text my-4">We cant seem to find the page you're looking for.</h5>
        <p><small className="orange_text">{statusCode}</small></p>
        <p className="my-5"><a href="/" className="return_home_btn">Return to Home</a></p>
        <p className="my-5"><span className="blue_text">OR</span></p>
        <p className="mb-4"><a href="/uk/london" className="blue_text err_prop" >Properties In London</a></p>
        <p className="mb-4"><a href="/uk/glasgow" className="blue_text err_prop">Properties In Glasgow</a></p>
        <p className="mb-4"><a href="/uk/sheffield" className="blue_text err_prop">Properties In Sheffield</a></p>

    </Col>
      <style type="text/css">
          {`.blue_text{
            color:#054d7f
          }

          .orange_text{
            color:#F05B4E;
          }

          .error_wrapper{
            background-image:url('/bg_buildings.svg');
            background-size:cover;
            background-repeat:no-repeat;
            background-position:bottom;
          }

          .return_home_btn{
              color:white;
              padding:1rem 2rem;
              border-radius:4px;
              background:#F05B4E;
          }
          .return_home_btn:hover{
            color:white;
          }
          a{
            cursor:pointer;
          }
          a:hover{
            text-decoration:none;
          }
          .err_prop:hover{
            text-decoration:underline;
          }
          .err_prop{
            text-decoration:underline;
            margin:1rem 0;
          }

          .error_img{
            max-width:18rem;
          }
          @media screen and (max-width:780px){
            .error_wrapper{
              background-size:contain;
            }
          }
          `}
      </style>
    </Row>
    </>
  );
}

export default Error;
