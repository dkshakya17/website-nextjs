import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import "../public/custom.css";

import Container from "react-bootstrap/Container";

const IMAGES = [
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' }
];

const Main  = ()=> (
<React.Fragment>
<Container fluid className="payment">
<Container fluid className="payment_hero_img align_center">
    <div className="payment_form">
        <div md={12} lg={12} sm={12}>
             <h4 className="youre-almost-there">you're almost there</h4>
             <p className="Please-confirm-your-details-to-make-the-payment"> Please confirm your details to make the payment </p>
        </div>
        <div className="payment_content">
        <Card>
            <Card.Body>
            <Row className="top">
                <Col md={4} xs={12} className="p-0">
                   <div className="payment_slider">
                    <div className="small_slider">
                        <Carousel>
                            {IMAGES.map(image => (
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={image.src}
                                alt="Image"
                            />
                            </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <h2 className="disc">Save upto 20%</h2>
                    </div>
                </Col>
                <Col md={8} xs={12}>

                <div className="prop_tile_cont mx-3">
                    <p className="rating simi_tile"><b className="pull-right"><img src="/icons/star.svg"/><span className="red">{'4.3'}</span> ({100})</b></p>
                    <Link href='/'><h4 className="prop_head">{'Fulham Palace Studio'}</h4></Link>
                        <p className="loc"><img src="/icons/pin.svg"/> {'West London : Zone 2'}</p>
                        <ul className="facilities_list">
                            <li><img src={"/icons/facilities/Wifi.svg"} /> </li>
                            <li><img src={"/icons/facilities/TV.svg"} /> </li>
                            <li><img src={"/icons/facilities/Bed.svg"} /> </li>
                            <li><img src={"/icons/facilities/Laundry.svg"} /> </li>
                        </ul>
                        <Row>
                            <Col md={6} xs={12} className="p-0">
                              <ul className="dist_list prop_tile_list">
                                <li><img src="/icons/walk.svg"/> <span>43 mins</span> </li>
                                <li><img src="/icons/train.svg"/> <span>43 mins</span>  </li>
                                <li><img src="/icons/car.svg"/> <span>43 mins</span>  </li>
                              </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                             <h1 className="prop_price red ml-2">£{100} - £{1000} <span className="week_text">/week</span></h1>
                            </Col>
                        </Row>
                </div>

                </Col>
            </Row>
            <Form className="payment_form_content">
            <h1 className="payment_form_heading">Room Details </h1>
            <Form.Row>
                 <Form.Group as={Col} controlId="formGridState">
                <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="ensuite">En-Suite</option>
                    <option value="non-suite">Non En-Suite</option>
                    <option value="studio">Studio</option>
                </Form.Control>
            </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="date" placeholder="Date" />
            </Form.Group>
            </Form.Row>
            <hr />

            <h1 className="payment_form_heading">Contact Details </h1>

            <Form.Row>
                <Form.Group  as={Col} controlId="validationCustom01">
                    <Form.Control
                        id="fullname"
                        size="md"
                        required
                        type="text"
                        placeholder="Full Name"
                        defaultValue=""
                        name="fullname"
                      />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom04">
                      <Form.Control size="md" type="email" placeholder="Email" required name="email" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                  <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                    <Form.Row>
                    <Col md={4}>
                    <Form.Control size="md" as="select">
                    <option>+91</option>
                    <option>+01</option>
                    </Form.Control>
                    </Col>
                    <Col md={8}>
                        <Form.Control size="md" type="number" placeholder="Phone" required name="phone" />
                    </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom03">
                      <Form.Control size="md" type="text" placeholder="Your University or College" required name="university" />
                    </Form.Group>
                 </Form.Row>
          </Form>
            </Card.Body>
        </Card>


        </div>

        <Button variant="primary" size="lg" block className="payment_btn">
            proceed to payment
        </Button>

 </div>
</Container>
</Container>
<style> {`
.payment {
    padding:0px;
    margin:0 auto;
    display:flex;
}

.prop_tile_list li span {
  padding-right:30%;
}

.payment_slider {
    margin-top:4px;
    margin-left:4px;
}

.payment_content{
transform: translateY(40%);
}

.payment_content .top {
    border-bottom:1px solid rgba(155, 167, 190, 0.1);
}

.payment_content .prop_price {
    font-size: 33px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.49;
    letter-spacing: normal;
    text-align: left;
    color: #f05c4e;
}

.payment_content .card{
    border-radius: 12px;
}

.payment_content .card .card-body{
    padding-top:0px;
}

.prop_tile_cont .row {
    justify-content:left;
}

.payment_content h2.disc{
    border-radius:0px;
}

.payment_content .prop_price .week_text{
    font-size: 18px;
    font-weight: normal;
}

.youre-almost-there {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-size: 68px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
    margin-top:5%;
}

.Please-confirm-your-details-to-make-the-payment {
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
  }

  .small_slider {
    margin: 0px -5px;
  }

.payment_sub_text {
    color:white;
}

.form-control {
    border-radius: 6px !important;
    background-color: rgba(155, 167, 190, 0.1) !important;
    height: 48px;
    opacity: 0.5;
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #101a42;
    border: none !important;
}

.payment_hero_img {
    background-image: url("/payment_hero_img.png");
    background-repeat: no-repeat;
    width: 100%;
    min-height: 65vh;
    background-color: white;
    background-size: cover;
    background-position: center;
    z-index:1;
    margin-bottom: 300px;
}

.payment_content {
    border-radius: 12px;
    margin-bottom:20px;
    margin-top:5%;
}

.payment_form {
    padding-left:20%;
    padding-right:20%;
}

.payment_btn {
    background-color:#F05C4E;
}

.payment_form_heading {
    color: #054d7f;
    font-family: 'Clarika Grotesque';
    font-size: 35px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
}
.payment_form_content {
    padding:20px;
}


@media only screen and (min-width: 320px) and (max-width: 575px){
    .payment_form {
        padding-left:0%;
        padding-right:0%;
    }

    .youre-almost-there {
        font-size: 51px;
    }
`}
    </style>
</React.Fragment>
)

export default Main;
