import React, { useState } from "react";
import Cookies from "universal-cookie";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import CountryCode from "../../components/CountryCode";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import "../../public/custom.css";
import withLayout from "../../components/MyLayout";
import Container from "react-bootstrap/Container";
import { formatDate } from "../../components/utils";
import * as urls from "../../components/urls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from "formik";
import fetch from "isomorphic-unfetch";
import Image from 'react-bootstrap/Image'
import {PaymentFormSchema} from "../../components/FormValidationSchema"
const cookies = new Cookies();

const IMAGES = [
  { src: "/list-images/list-slide.png" },
  { src: "/list-images/list-slide.png" },
  { src: "/list-images/list-slide.png" },
  { src: "/list-images/list-slide.png" },
  { src: "/list-images/list-slide.png" }
];




const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      className="form-control"
      placeholderText="DD-MM-YYYY"
      selected={(value && new Date(value)) || null}
      minDate={new Date()}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

const InfoForm = props => {
  const { bindSubmitForm, propData } = props;
  let isSubmitLocked = false;
  const {countryCode, setCode} = useState({});
  const validateForm = args =>{ args();};
  const filterData = (values) =>{
    let formData = values;
    formData['agent'] = 'website';
    let bookingParam = {
      'leadId':values.leadId,
      'data':formData,
    }
    // delete bookingParam.data['leadId'];
    return bookingParam;
  }
  return (
    <div>
      <Formik
        initialValues={{
          source: propData.code,
          fullname: props.data.fullname,
          email: props.data.email,
          university: props.data.university,
          phone: props.data.phone,
          countryCode:props.data.countryCode,
          budget:'',
          moveIn:'',
          leaseDuration: '',
          roomType: propData.configs[0].code,
          leadId:props.data.leadId
        }}
        validationSchema={PaymentFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!isSubmitLocked) {
            isSubmitLocked = true;

            values.moveIn = formatDate(values.moveIn);
            values.budget = parseInt(values.budget);
            values.leadId = parseInt(values.leadId);

            fetch(urls.getPaymentPath, {
              method: "POST",
              headers: {
                Accept: "application/json"
              },
              body: JSON.stringify(values)
            })
              .then(response => {
                if (response.status == 200) {
                  let bookingParam = filterData(values);
                  props.infoFormSubmitted(bookingParam);
                }
              })
              .catch(error => {
                console.log("info form", error);
                let messageEl = document.getElementById("formMessage");
                messageEl.setAttribute("class", "fade alert alert-danger show");

                let textEl = document.createTextNode(
                  "There is some error, Please try later!"
                );
                messageEl.appendChild(textEl);
              });
          }

          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
          const {
            values,
            setFieldValue,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isInvalid,
          } = props;

          bindSubmitForm(props.submitForm);
          return (
            <Form noValidate className="payment_form_content" onSubmit={ handleSubmit}>
              <h1 className="payment_form_heading">Room Details </h1>
              <Form.Row>
                <Form.Group
                  className="col-12 col-sm-6"
                  controlId="validationCustom01"
                  onChange={handleChange}
                >
                  <Form.Label>Budget</Form.Label>
                  <Form.Control
                    size="md"
                    type="number"
                    placeholder="Budget in £/week"
                    required
                    name="budget"
                    min='0'
                    defaultValue=""
                    value={values.budget}
                    isInvalid={touched.budget && errors.budget}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide budget
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <div className="moveIn">
                    <Form.Label>Move In</Form.Label>
                    <DatePickerField
                      name="moveIn"
                      value={values.moveIn}
                      onChange={setFieldValue}
                    />
                  </div>
                  <Form.Control hidden isInvalid={touched.moveIn && errors.moveIn} />
                  <Form.Control.Feedback type="invalid">
                    Please provide Move In Date
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group controlId="formBasicLease" className="col-md-6">
                <Form.Label>Duration of stay</Form.Label>
                <Form.Control  as="select"  onChange={(e)=> {values.leaseDuration = e.target.value; }} isInvalid={touched.leaseDuration && errors.leaseDuration}>
                  <option value="">Select your stay duration</option>
                  <option value="<=8">Less than or equal to 8 weeks</option>
                  <option value="12-24">12 - 24 weeks</option>
                  <option value="24-36">24 - 36 weeks</option>
                  <option value="44">44 weeks</option>
                  <option value="51">51 weeks</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                Please provide duration of stay
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="col-md-6">
                <Form.Label>Room Type</Form.Label>
                <Form.Control  as="select"  onChange={(e)=> {values.roomType = e.target.value; }} isInvalid={touched.roomType && errors.roomType}>
                    {propData.configs.map(config => <option value={config.code}>{config.name}</option>)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                Please provide Room Type
                </Form.Control.Feedback>
              </Form.Group>

              </Form.Row>
              <hr />
                <h1 className="payment_form_heading">Contact Details </h1>
              <Form.Row>
                <Form.Group
                  className="col-12 col-sm-6"
                  controlId="validationCustom03"
                >
                  <Form.Control
                    size="md"
                    required
                    type="text"
                    placeholder="Full Name"
                    defaultValue=""
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    isInvalid={touched.fullname && errors.fullname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide valid Full Name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="col-12 col-sm-6"
                  controlId="validationCustom04"
                >
                  <Form.Control
                    size="md"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email Address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  className="col-12 col-sm-6"

                >
                  <Form.Row>
                    <Col md={4} xs={4}>
                      <Form.Control
                        size="md"
                        as="select"
                        value={values.formCountryCode}
                        onChange={(e) => {values.countryCode = e.target.value;}}
                        controlId="formCountryCode"
                      >
                        <CountryCode />
                      </Form.Control>
                    </Col>
                    <Col md={8} xs={8}>
                      <Form.Control
                        size="md"
                        type="number"
                        placeholder="Phone"
                        required
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        controlId="formPhoneNo"
                        isInvalid={touched.phone && errors.phone}
                      />
                    </Col>
                  </Form.Row>
                    <Form.Control hidden isInvalid={touched.phone && errors.phone}/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="col-12 col-sm-6"
                  controlId="validationCustom02"
                >
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Your University or College"
                    required
                    name="university"
                    value={values.university}
                    onChange={handleChange}
                    isInvalid={touched.university && errors.university}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the name of the University.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Control hidden value={values.source} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const Payment = props => {

  const [showSubmission, setSubmission] = useState(false);
  const [bookingData,setBookingData ] = useState({});
  let submitInfoForm = null;

  const handleSubmitInfoForm = e => {
    if (submitInfoForm) {
      submitInfoForm(e);
    }
  };

  const bindSubmitForm = submitForm => {
    submitInfoForm = submitForm;
  };

  const infoFormSubmitted = (data) => {
    setBookingData(data);
    setSubmission(true);
  };

  return (
    <React.Fragment>
      <Container fluid className="payment_hero_img payment">
      </Container>
      <Container fluid className="payment_form_container align_center">
        <div className="payment_form">
          <div md={12} lg={12} sm={12}>
            <h4 className="youre-almost-there">you're almost there</h4>
            <p className="Please-confirm-your-details-to-make-the-payment">
              {" "}
              Please confirm your details to make the payment{" "}
            </p>
          </div>
          <div className="payment_content">
            <Card>
              <Card.Body>
                <Row className="top">
                  <Col md={4} xs={12} className="p-0">
                    <div className="payment_slider">
                      <div className="small_slider payment_small_slider">
                        <Carousel>
                          {props.images.map(image => (
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={image.url}
                                alt="Image"
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </div>
                      <h2 className="disc">Free Bedding Pack</h2>
                    </div>
                  </Col>
                  <Col md={8} xs={12}>
                    <div className="prop_tile_cont mx-3">
                      <p className="rating simi_tile">
                        <b className="pull-right mt-3">
                          <img src="/icons/star.svg" />
                          <span className="red">{"4.3"}</span> ({100})
                        </b>
                      </p>
                      <Link href="/">
                        <h3 className="prop_head">{props.name}</h3>
                      </Link>
                      <p className="loc m-0">
                        <img src="/icons/pin.svg" /> {props.address}
                      </p>
                      <ul className="facilities_list payment_facilities_list">
                        {props.apartment_facilities
                          .slice(0, 4)
                          .map(facility => (
                            <li>
                              <img
                                src={
                                  "/icons/facilities/" +
                                  facility.kind +
                                  ".svg"
                                }
                                title={facility.name}
                              />{" "}
                            </li>
                          ))}
                      </ul>
                      <Row>
                        <Col md={6} xs={12} className="p-0">
                          <ul className="dist_list prop_tile_list">
                            <li>
                              <img src="/icons/walk.svg" /> {props.time.walk}{" "}
                            </li>
                            <li>
                              <img src="/icons/train.svg" />{" "}
                              {props.time.train}{" "}
                            </li>
                            <li>
                              <img src="/icons/car.svg" /> {props.time.car}{" "}
                            </li>
                          </ul>
                        </Col>
                      </Row>
                      <Row>
                        <div className="col-12 d-flex justify-content-md-end justify-content-sm-center my-4 mb-xl-0 mb-md-0">
                          <h1 className="prop_price red ml-2  ml-xs-0 ml-sm-0 d-flex justify-content-center align-items-end">
                            £{props.min_price} - £{props.max_price}{" "}
                            <span className="week_text">/week</span>
                          </h1>
                        </div>
                      </Row>
                    </div>
                  </Col>
                </Row>
                {showSubmission ? (
                  <FormSubmit data={bookingData}/>
                ) : (
                  <InfoForm
                    data={props.info}
                    propData={props}
                    bindSubmitForm={bindSubmitForm}
                    infoFormSubmitted={infoFormSubmitted}
                  />
                )}
              </Card.Body>
            </Card>
          </div>
          {!showSubmission ? (
            <Button
              variant="primary"
              size="lg"
              block
              className="payment_btn"
              onClick={handleSubmitInfoForm}
            >
              submit
            </Button>
          ) : null}
        </div>
      </Container>
      <style type="text/css">
        {`
.payment {
    padding:0px;
    margin:0 auto;
    display:flex;
}
.UniAcco_filter_img{
  width:100%;
  height:70%;
}
.payment_small_slider .carousel-item img{
  max-height:238px !important;
  min-height:238px !important;
}
.prop_tile_list li span {
  padding-right:30%;
}

.payment_slider {
    margin-top:4px;
    margin-left:4px;
}
.prop_head{
  font-size:1.3rem;
  line-height:1;
}
.payment_content .top {
    border-bottom:1px solid rgba(155, 167, 190, 0.2);
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
.prop_tile_cont .facilities_list > li{
    padding:0 20px 0 0;
}
.prop_tile_cont .facilities_list{
  padding:20px 0;
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
    letter-spacing: 1px;
    text-align: left;
    color: #101a42;
    border: none !important;
}

label.form-label {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #66728a;
    margin: 0;
}

.moveIn {
    display:flex;
    flex-direction: column;
}

.payment_hero_img {
  background-image:url(/payment_hero_img.jpg);
  background-repeat: no-repeat;
  width: 100%;
  height:483px;
  background-color: white;
  background-size: cover;
  background-position:center;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment_content {
    border-radius: 12px;
    margin-bottom:20px;
    margin-top:5%;
}

.payment_form {
    padding-left:20%;
    padding-right:20%;
    z-index:2;
    margin-bottom:2rem;
}

.payment_btn {
    background-color:#F05C4E;
    border:none;
}
.payment_btn:hover{
    background:#F05C4E;
}

.payment_form_heading {
    color:#054d7f;
    font-family: 'Clarika Grotesque';
    font-size: 35px;
    line-height:91px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
}
.payment_form_content {
    padding:20px;
}
.react-datepicker__current-month {
  color:white;
}

.react-datepicker__header {
  background-color: #f05c4e!important;
}

.react-datepicker__day-names {
  color:white;
}

.react-datepicker__day--selected {
  background-color: #f05c4e!important;
}
.react-datepicker__triangle::before
{
  border-top-color:#f05c4e!important;
}



@media (min-width: 320px) and (max-width: 720px){
    .payment_form {
        padding-left:0;
        padding-right:0;
    }
    .payment_hero_img{
      height:503px;
      background-position:center;
    }
    .youre-almost-there {
        font-size: 51px;
    }
    .payment_slider{
      margin-top:2px !important;
      margin-left:2px !important;
      margin-right:2px !important;
    }
    .carousel-inner{
      border-top-right-radius:12px !important;
      border-top-left-radius:12px !important;
    }

    .payment_form_content{
      padding:0;
    }
}

`}
      </style>
    </React.Fragment>
  );
};

const FormSubmit = (props) => {
    return (
      <div className="form_submit" >
        <p className="img"><Image src="/success.gif" fluid/></p>
        <h5>Your details has been successfully
        submitted. </h5>
        <p>To reserve your room right away, please provide
        additional details via the
        link below.</p>
          <Link href={{pathname:`/booking`,query:props.data.data}}>
          <Button variant="primary" size="md" className="btn primary-btn btn-block complete_btn">
            Reserve your room
           </Button>
         </Link>
      </div>
    );
};

const pagewithLayout = withLayout(Payment);
pagewithLayout.getInitialProps = async ({ req, query }) => {
  const url = urls.getPropDetailsPath(
    query.country,
    query.city,
    query.propCode
  );
  const res = await fetch(url);
  const json = await res.json();
  json.country = query.country;
  json.city = query.city;

  if (json.images.length == 0) {
    json.images = [
      { url: "/list-images/list-slide.png", caption: "Property Image" },
      { url: "/list-images/list-slide.png", caption: "Property Image" },
      { url: "/list-images/list-slide.png", caption: "Property Image" },
      { url: "/list-images/list-slide.png", caption: "Property Image" },
      { url: "/list-images/list-slide.png", caption: "Property Image" },
      { url: "/list-images/list-slide.png", caption: "Property Image" }
    ];
  }

  let info = {
    fullname: query.fullName,
    email: query.email,
    countryCode: query.countryCode,
    phone: query.phone,
    university: query.university,
    leadId:query.leadId,
  };

  json.info = info;
  json.moveIn = query.moveIn;
  return { props: json };
};

export default pagewithLayout;
