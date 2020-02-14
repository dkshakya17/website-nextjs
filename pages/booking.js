import React ,{useState} from 'react'
import { Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import withLayout from '../components/MyLayout'
import DatePicker from "react-datepicker";
import CountryCode  from '../components/CountryCode';
import "react-datepicker/dist/react-datepicker.css";
import {BookingFormSchema} from '../components/FormValidationSchema';
import {bookingFormPath} from '../components/urls';
import fetch from 'isomorphic-unfetch';
import { formatDate } from "../components/utils";
import Image from "react-bootstrap/Image"
import Card, { CardBody } from 'react-bootstrap/Card';

const InitialVal = {
  dob:'',
  fullname_salutation:'',
  fullname:'',
  nationality:'',
  country:'',
  email:'',
  gender:'',
  alternative_email:'',
  countryCode:'',
  phone:'',
  homeCC:'',
  homePhone:'',
  uni_info:'',
  course_info:'',
  enroll_status:'',
  home_addr_one:'',
  home_addr_two:'',
  home_city:'',
  home_state:'',
  home_zip:'',
  emergency_contact_name:'',
  emergency_salutation:'',
  emergency_contact_numb:'',
  emergency_email_addr:'',
  emergency_dob:'',
  emergency_relship:'',
  emergency_addr_one:'',
  emergency_addr_two:'',
  emergency_home_city:'',
  emergency_home_state:'',
  emergency_home_zip:'',
  guarantor_as_emergency:'',
  guarantor_contact_name:'',
  guarantor_salutation:'',
  guarantor_contact_numb:'',
  guarantor_email:'',
  guarantor_dob:'',
  guarantor_relship:'',
  guarantor_addr_one:'',
  guarantor_addr_two:'',
  guarantor_home_city:'',
  guarantor_home_state:'',
  guarantor_home_zip:'',
  otherPeopleDetails:'',
  moveIndate:'',
  medical_status:'',
  special_requirements:'',
  roomType:'',
  rentAmount:'',
  stay_duration:'',
  agent:'',
  leadId:''
}

const DatePickerField = ({values, name, onChange, typeMax}) => {

  return (
    <DatePicker
      className="form-control"
      selected={(values && new Date(values)) || null}
      value = {values}
      placeholderText="DD-MM-YYYY"
      maxDate={typeMax?new Date():null}
      minDate = {typeMax?null:new Date()}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      onChange={val => {
        val = formatDate(val)
        onChange(name, val);
      }}
    />
  );
}

class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isSubmitted:false
    }
  }


  render(){
    return <>
        {
        this.state.isSubmitted?<FormSubmit />
          :
          <Container className="justify-content-center">
          <h1 className="text-center booking_headers">Booking <span className="red">Form</span></h1>
           <Row className="justify-content-center">
            <Col md={7} className="booking_form_container">
              <Col md={12}>
                <Formik
                initialValues = {this.props}
                validationSchema={BookingFormSchema}
                onSubmit = {(values, {setSubmitting}) => {
                      fetch(bookingFormPath,{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).then((res) => {
                      if(res.ok)
                        {
                            return res.json();
                        }else{
                          this.setState({isSubmitted:false});
                          throw new Error('Bad request');
                        }
                    })
                    .then((result) => {
                        this.setState({isSubmitted:true});
                        window.scrollTo(0, 0);
                    }).catch((err) => {
                        console.log(err);
                    })
                }}
                >
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          dirty,
                          isSubmitting,
                          setFieldValue,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          handleReset,
                          isInvalid,
                          isValid
                        } = props;
                        return (
                          <Form noValidate onSubmit={handleSubmit}>
                            <Row className="justify-content-start m-0"><h4 className="text-left booking_headers">Personal Information</h4></Row>
                            <hr className="mb-4 mt-0" />
                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} controlid="fullname_salutation_id " md={12}>
                                  <Form.Row className="justify-content-between">
                                    <Col md={4}>
                                      <Form.Label>Title</Form.Label>
                                    <Form.Control size="md" as="select" name="fullname_salutation"
                                    value={values.fullname_salutation}
                                    onChange={handleChange}
                                    isInvalid = {touched.fullname_salutation && errors.fullname_salutation}>
                                      <option value="">Mr./ Ms./ Mrs./ Miss</option>
                                      <option value="mr">Mr.</option>
                                      <option value="ms">Ms.</option>
                                      <option value="mrs">Mrs.</option>
                                      <option value="miss">Miss</option>
                                    </Form.Control>
                                    </Col>
                                    <Col md={5} className="my-3 m-md-0">
                                      <Form.Label>Full Name <span className="red">*</span></Form.Label>
                                      <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      placeholder="Full Name"
                                      name="fullname"
                                      value={values.fullname}
                                      onChange={handleChange}
                                      isInvalid = {touched.fullname && errors.fullname}
                                    />
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row className="justify-content-center my-4">
                                <Col>
                                  <Form.Row className="justify-content-between">
                                    <Form.Group as={Col} md={6}>
                                          <Form.Label>Date of birth (In Date-Month-Year format) <span className="red">*</span></Form.Label>
                                          <DatePickerField
                                            onChange={setFieldValue}
                                            name='dob'
                                            values={values.dob}
                                            typeMax='True'
                                          />
                                          <Form.Control hidden isInvalid={touched.dob && errors.dob} />
                                          <Form.Control.Feedback type="invalid">
                                              Field required
                                          </Form.Control.Feedback>
                                      </Form.Group>
                                      <Form.Group as={Col} md={5} className="justify-content-center mt-3 m-md-0">
                                        <Form.Label as="legend">
                                            Gender <span className="red">*</span>
                                        </Form.Label>
                                          <Form.Check
                                          type="radio"
                                          label="Male"
                                          value="male"
                                          name="gender"
                                          onChange = {handleChange}
                                          id="gender1"
                                          isInvalid={errors.gender}
                                          />
                                          <Form.Check
                                            type="radio"
                                            label="Female"
                                            value="female"

                                            onChange = {handleChange}
                                            name="gender"
                                            id="gender2"
                                            isInvalid={errors.gender}
                                          />
                                          <Form.Check
                                            type="radio"
                                            label="Other"
                                            value="other"
                                            onChange = {handleChange}
                                            name="gender"
                                            id="gender3"
                                            isInvalid={errors.gender}
                                          />
                                      </Form.Group>
                                    </Form.Row>
                                </Col>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                                <Col md={12}>
                                  <Form.Row className="justify-content-between">
                                    <Form.Group as={Col} md={5}>
                                      <Form.Label>Nationality <span className="red">*</span></Form.Label>
                                      <Form.Control
                                        size="md"
                                        type="text"
                                        name="nationality"
                                        value={values.nationality}
                                        onChange={handleChange}
                                        isInvalid = {touched.nationality && errors.nationality}>
                                      </Form.Control>
                                      <Form.Control.Feedback type="invalid">
                                          Please provide your nationality.
                                       </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md={5} className="mt-3 m-md-0" >
                                      <Form.Label>Country <span className="red">*</span></Form.Label>
                                      <Form.Control
                                        size="md"
                                        type="text"
                                        name="country"
                                        value={values.country}
                                        onChange={handleChange}
                                        isInvalid = {touched.country && errors.country}
                                        />
                                      <Form.Control.Feedback type="invalid">
                                          Please provide your country.
                                       </Form.Control.Feedback>
                                      </Form.Group>
                                  </Form.Row>
                                </Col>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} md={12}>
                                  <Form.Row className="justify-content-between">
                                    <Col md={5}>
                                    <Form.Label>Email <span className="red">*</span></Form.Label>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      name="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      isInvalid = {touched.email && errors.email}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your email.
                                     </Form.Control.Feedback>
                                    </Col>
                                    <Col md={5} className="mt-3 m-md-0">
                                      <Form.Label>Alternative email address (optional)</Form.Label>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        placeholder=""
                                        name="alternative_email"
                                        value={values.alternative_email}
                                        onChange={handleChange}
                                        isInvalid = {touched.alternative_email && errors.alternative_email}>
                                      </Form.Control>
                                      <Form.Control.Feedback type="invalid">
                                          Invalid email address
                                       </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                              <Form.Group as={Col} md={12}>
                                <Form.Label>Mobile number <span className="red">*</span></Form.Label>
                                <Form.Row className="justify-content-start">
                                  <Col md={2}>
                                    <Form.Control size="md" controlid="ControlPhoneCode" as="select" name="countryCode" onChange={handleChange}>
                                      <CountryCode/>
                                    </Form.Control>
                                  </Col>
                                  <Col md={5}>
                                    <Form.Control controlid="ControlPhoneNumber" size="md" type="number" placeholder="Phone" required name="phone" value={values.phone} onChange={handleChange}
                                      isInvalid={touched.phone && errors.phone}
                                    />
                                  </Col>
                                </Form.Row>
                                <Form.Control hidden isInvalid={touched.phone && errors.phone}/>
                                  <Form.Control.Feedback type="invalid">
                                      Please provide a valid phone number.
                                   </Form.Control.Feedback>
                              </Form.Group>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                              <Form.Group as={Col} md={12}>
                                <Form.Label>Home number (Can be same as your mobile no.) <span className="red">*</span></Form.Label>
                                <Form.Row className="justify-content-start">
                                  <Col md={2}>
                                    <Form.Control size="md" name="homeCC" as="select"  onChange={handleChange}>
                                      <CountryCode/>
                                    </Form.Control>
                                  </Col>
                                  <Col md={5}>
                                    <Form.Control size="md" type="number" placeholder="Phone" required name="homePhone" value={values.homePhone} onChange={handleChange}
                                      isInvalid={touched.homePhone && errors.homePhone}
                                    />
                                  </Col>
                                </Form.Row>
                                <Form.Control hidden isInvalid={touched.homePhone && errors.homePhone}/>
                                  <Form.Control.Feedback type="invalid">
                                      Please provide a valid phone number.
                                  </Form.Control.Feedback>
                              </Form.Group>
                              </Form.Row>

                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} md={12}>
                                  <Form.Label>Which university are you going to attend? <span className="red">*</span></Form.Label>
                                  <Form.Row className="justify-content-start">
                                    <Col md={7}>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      placeholder=""
                                      name="uni_info"
                                      value={values.uni_info}
                                      onChange={handleChange}
                                      isInvalid = {touched.uni_info && errors.uni_info}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Name of university required
                                     </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} md={12}>
                                  <Form.Label>Which course are you going to take? <span className="red">*</span></Form.Label>
                                  <Form.Row className="justify-content-start">
                                    <Col md={7}>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      placeholder=""
                                      name="course_info"
                                      value={values.course_info}
                                      onChange={handleChange}
                                      isInvalid = {touched.course_info && errors.course_info}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Course info is reqruired
                                     </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} md={12}>
                                  <Form.Row className="justify-content-start">
                                    <Col md={7}>
                                      <Form.Label>Enrollment Status (for the next academic year) <span className="red">*</span></Form.Label>
                                      <Form.Control as="select" isInvalid={touched.enroll_status && errors.enroll_status} name="enroll_status" onChange={handleChange}>
                                        <option value="">Select your enrollment status</option>
                                        <option value="First Year Undergraduate">First Year Undergraduate</option>
                                        <option value="Non-student">Non-student</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                        <option value="Second Year Undergraduate">Second Year Undergraduate</option>
                                        <option value="Third Year or above Undergraduate">Third Year or above Undergraduate</option>
                                      </Form.Control>
                                      <Form.Control.Feedback type="invalid">
                                          Enrollment Status required
                                       </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>

                              <Form.Row className="justify-content-center">
                                <Form.Group as={Col} md={12}>
                                  <Form.Label>Home Address <span className="red">*</span></Form.Label>
                                  <Form.Row className="mb-3">
                                    <Col md={8}>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      name="home_addr_one"
                                      value={values.home_addr_one}
                                      onChange={handleChange}
                                      isInvalid = {touched.home_addr_one && errors.home_addr_one}>
                                    </Form.Control>
                                      <Form.Text className="text-muted">
                                        Street Address Line 1
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          Home address required
                                       </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                  <Form.Row className="mb-3">
                                    <Col md={8}>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="text"
                                      name="home_addr_two"
                                      value={values.home_addr_two}
                                      onChange={handleChange}
                                      isInvalid = {touched.home_addr_two && errors.home_addr_two}>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                      Street Address Line 2
                                    </Form.Text>
                                    </Col>
                                  </Form.Row>
                                  <Form.Row className="mb-3">
                                      <Col md="4">
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="home_city"
                                        value={values.home_city}
                                        onChange={handleChange}
                                        isInvalid = {touched.home_city && errors.home_city}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                          City
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          Home city required
                                       </Form.Control.Feedback>
                                      </Col>
                                      <Col md="4">
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="home_state"
                                        value={values.home_state}
                                        onChange={handleChange}
                                        isInvalid = {touched.home_state && errors.home_state}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                          State/ Province
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          Home State/ Province required
                                       </Form.Control.Feedback>
                                      </Col>
                                  </Form.Row>
                                  <Form.Row className="mb-3">
                                    <Col md={3}>
                                    <Form.Control
                                      size="md"
                                      required
                                      type="number"
                                      name="home_zip"
                                      value={values.home_zip}
                                      onChange={handleChange}
                                      isInvalid = {touched.home_zip && errors.home_zip}>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Postal / Zip Code
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Postal Zip code required
                                     </Form.Control.Feedback>
                                    </Col>
                                  </Form.Row>
                                </Form.Group>
                              </Form.Row>

                              <div className="justify-content-center">
                                <Row className="justify-content-start m-0"><h4 className="text-center booking_headers">Emergency contact information</h4></Row>
                                <hr className="mb-4 mt-0" />
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Row className="justify-content-between">
                                      <Col md={5}>
                                      <Form.Label>Emergency Contact Name <span className="red">*</span></Form.Label>
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="emergency_contact_name"
                                          value={values.emergency_contact_name}
                                          onChange={handleChange}
                                          isInvalid = {touched.emergency_contact_name && errors.emergency_contact_name}>
                                        </Form.Control>
                                          <Form.Text className="text-muted">
                                             Contact Name
                                          </Form.Text>
                                          <Form.Control.Feedback type="invalid">
                                                Emergency contact name required
                                           </Form.Control.Feedback>
                                      </Col>
                                      <Col md={5} className="mt-3 m-md-0">
                                      <Form.Label>Mobile Number <span className="red">*</span></Form.Label>
                                        <Form.Control
                                          size="md"
                                          required
                                          type="number"
                                          name="emergency_contact_numb"
                                          value={values.emergency_contact_numb}
                                          onChange={handleChange}
                                          isInvalid = {touched.emergency_contact_numb && errors.emergency_contact_numb}>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                              Emergency contact number required
                                         </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                      <Form.Row className="justify-content-between">
                                        <Col md={5} xs={12}>
                                          <Form.Label>Salutation <span className="red">*</span></Form.Label>
                                          <Form.Check
                                          type="radio"
                                          label="Mr."
                                          value="mr"
                                          name="emergency_salutation"
                                          isInvalid={errors.emergency_salutation}
                                          name="emergency_salutation"
                                          onChange={handleChange}
                                          id="emergency_radio1"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Ms."
                                          value="ms"
                                          isInvalid={errors.emergency_salutation}
                                          name="emergency_salutation"
                                          onChange={handleChange}
                                          id="emergency_radio2"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Mrs."
                                          name="emergency_salutation"
                                          isInvalid={errors.emergency_salutation}
                                          value="mrs"
                                          onChange={handleChange}
                                          id="emergency_radio3"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Miss"
                                          name="emergency_salutation"
                                          isInvalid={errors.emergency_salutation}
                                          value="miss"
                                          onChange={handleChange}
                                          id="emergency_radio4"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Dr."
                                          isInvalid={errors.emergency_salutation}
                                          value="dr"
                                          name="emergency_salutation"
                                          onChange={handleChange}
                                          id="emergency_radio5"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Other"
                                          isInvalid={errors.emergency_salutation}
                                          value="other"
                                          name="emergency_salutation"
                                          onChange={handleChange}
                                          id="emergency_radio6"
                                          />
                                        </Col>
                                        <Col md={5} xs={12}>
                                          <Col md={12} xs={12} className="p-0 mt-3 m-md-0">
                                            <Form.Label>Email Address <span className="red">*</span></Form.Label>
                                            <Form.Control
                                              size="md"
                                              required
                                              type="text"
                                              name="emergency_email_addr"
                                              value={values.emergency_email_addr}
                                              onChange={handleChange}
                                              isInvalid = {touched.emergency_email_addr && errors.emergency_email_addr}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Emergency email required
                                             </Form.Control.Feedback>
                                          </Col>
                                          <Col md={12} xs={12} className="p-0 my-3">
                                            <Form.Label>Date of birth <span className="red">*</span></Form.Label>
                                            <Row className="mx-0">
                                            <DatePickerField
                                              values={values.emergency_dob}
                                              name="emergency_dob"
                                              onChange={setFieldValue}
                                              typeMax='true'
                                            />
                                            <Form.Control hidden isInvalid={touched.emergency_dob && errors.emergency_dob} />
                                            <Form.Control.Feedback type="invalid">
                                                This field is required
                                            </Form.Control.Feedback>
                                            </Row>
                                          </Col>
                                          <Col className="p-0">
                                            <Form.Label>Relationship <span className="red">*</span></Form.Label>
                                            <Form.Control
                                              size="md"
                                              required
                                              type="text"
                                              name="emergency_relship"
                                              value={values.emergency_relship}
                                              onChange={handleChange}
                                              isInvalid = {touched.emergency_relship && errors.emergency_relship}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                This field is required
                                             </Form.Control.Feedback>
                                          </Col>
                                        </Col>
                                      </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Label>Address <span className="red">*</span></Form.Label>
                                    <Form.Row className="mb-3">
                                      <Col md={8}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="emergency_addr_one"
                                        value={values.emergency_addr_one}
                                        onChange={handleChange}
                                        isInvalid = {touched.emergency_addr_one && errors.emergency_addr_one}>
                                      </Form.Control>
                                        <Form.Text className="text-muted">
                                          Street Address Line 1
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                           This field is required
                                        </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                      <Col md={8}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="emergency_addr_two"
                                        value={values.emergency_addr_two}
                                        onChange={handleChange}
                                        isInvalid = {touched.emergency_addr_two && errors.emergency_addr_two}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                        Street Address Line 2
                                      </Form.Text>
                                      </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                        <Col md="4">
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="emergency_home_city"
                                          value={values.emergency_home_city}
                                          onChange={handleChange}
                                          isInvalid = {touched.emergency_home_city && errors.emergency_home_city}>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            City
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                              This field is required
                                         </Form.Control.Feedback>
                                        </Col>
                                        <Col md="4">
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="emergency_home_state"
                                          value={values.emergency_home_state}
                                          onChange={handleChange}
                                          isInvalid = {touched.emergency_home_state && errors.emergency_home_state}>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            State/ Province
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                         </Form.Control.Feedback>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                      <Col md={3}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="number"
                                        name="emergency_home_zip"
                                        value={values.emergency_home_zip}
                                        onChange={handleChange}
                                        isInvalid = {touched.emergency_home_zip && errors.emergency_home_zip}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                          Postal / Zip Code
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          This field is required
                                      </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Row>
                                      <Col md={9} className="mt-3 m-md-0">
                                        <Form.Label>Is your Guarantor different from the emergency contact? <span className="red">*</span></Form.Label>
                                          <Form.Check
                                          type="radio"
                                          label="Yes"
                                          value="yes"
                                          name="guarantor_as_emergency"
                                          onChange={handleChange}
                                          id="guarantor1"
                                          isInvalid={errors.guarantor_as_emergency}
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="No"
                                          value="no"
                                          onChange={handleChange}
                                          name="guarantor_as_emergency"
                                          id="guarantor2"
                                          isInvalid={errors.guarantor_as_emergency}
                                          />
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                              </div>
                              <div className="justify-content-center">
                                <Row className="justify-content-start m-0"><h4 className="text-center booking_headers">If Yes, Then Guarantor Information</h4></Row>
                                <hr className="mb-4 mt-0" />
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Row className="justify-content-between">
                                      <Col md={5}>
                                      <Form.Label>Guarantor Contact Name</Form.Label>
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="guarantor_contact_name"
                                          value={values.guarantor_contact_name}
                                          onChange={handleChange}
                                          isInvalid = {touched.guarantor_contact_name && errors.guarantor_contact_name}>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                          <Form.Text className="text-muted">
                                             Contact Name
                                          </Form.Text>
                                      </Col>
                                      <Col md={5} className="mt-3 m-md-0">
                                      <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                          size="md"
                                          required
                                          type="number"
                                          name="guarantor_contact_numb"
                                          value={values.guarantor_contact_numb}
                                          onChange={handleChange}
                                          isInvalid = {touched.guarantor_contact_numb && errors.guarantor_contact_numb}>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                      <Form.Row className="justify-content-between">
                                        <Col md={5} xs={12}>
                                          <Form.Label>Salutation</Form.Label>
                                          <Form.Check
                                          type="radio"
                                          label="Mr."
                                          value="mr"
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation1"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Ms."
                                          value="ms"
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation2"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Mrs."
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation3"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Miss"
                                          value="miss"
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation4"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Dr."
                                          value="dr"
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation5"
                                          />
                                          <Form.Check
                                          type="radio"
                                          label="Other"
                                          value="other"
                                          onChange={handleChange}
                                          name="guarantor_salutation"
                                          id="guarantor_salutation6"
                                          />
                                        </Col>
                                        <Col md={5} xs={12} >
                                          <Col md={12} className="p-0 mt-3 m-md-0">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                              size="md"
                                              required
                                              type="text"
                                              name="guarantor_email"
                                              value={values.guarantor_email}
                                              onChange={handleChange}
                                              isInvalid = {touched.guarantor_email && errors.guarantor_email}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter valid value
                                             </Form.Control.Feedback>
                                          </Col>
                                          <Col className="p-0 my-3">
                                          <Row className="m-0">
                                            <Form.Label>Date of birth</Form.Label>
                                          </Row>

                                            <DatePickerField
                                              name="guarantor_dob"
                                              values={values.guarantor_dob}
                                              onChange={setFieldValue}
                                              typeMax='true'
                                            />
                                          </Col>
                                          <Col className="p-0">
                                            <Form.Label>Relationship</Form.Label>
                                            <Form.Control
                                              size="md"
                                              required
                                              type="text"
                                              name="guarantor_relship"
                                              value={values.guarantor_relship}
                                              onChange={handleChange}
                                              isInvalid = {touched.guarantor_relship && errors.guarantor_relship}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter valid value
                                             </Form.Control.Feedback>
                                          </Col>
                                        </Col>
                                      </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Row className="mb-3">
                                      <Col md={8}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="guarantor_addr_one"
                                        value={values.guarantor_addr_one}
                                        onChange={handleChange}
                                        isInvalid = {touched.guarantor_addr_one && errors.guarantor_addr_one}>
                                      </Form.Control>
                                        <Form.Text className="text-muted">
                                          Street Address Line 1
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                      <Col md={8}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="guarantor_addr_two"
                                        value={values.guarantor_addr_two}
                                        onChange={handleChange}
                                        isInvalid = {touched.guarantor_addr_two && errors.guarantor_addr_two}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                        Street Address Line 2
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          Please enter valid value
                                       </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                        <Col md="4">
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="guarantor_home_city"
                                          value={values.guarantor_home_city}
                                          onChange={handleChange}
                                          isInvalid = {touched.guarantor_home_city && errors.guarantor_home_city}>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            City
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                        </Col>
                                        <Col md="4">
                                        <Form.Control
                                          size="md"
                                          required
                                          type="text"
                                          name="guarantor_home_state"
                                          value={values.guarantor_home_state}
                                          onChange={handleChange}
                                          isInvalid = {touched.guarantor_home_state && errors.guarantor_home_state}>
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            State/ Province
                                        </Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="mb-3">
                                      <Col md={3}>
                                      <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="guarantor_home_zip"
                                        value={values.guarantor_home_zip}
                                        onChange={handleChange}
                                        isInvalid = {touched.guarantor_home_zip && errors.guarantor_home_zip}>
                                      </Form.Control>
                                      <Form.Text className="text-muted">
                                          Postal / Zip Code
                                      </Form.Text>
                                      <Form.Control.Feedback type="invalid">
                                          Please enter valid value
                                       </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                              </div>

                                <Form.Row className="justify-content-center">
                                    <Form.Group as={Col} md={12}>
                                      <Form.Row className="justify-content-between">
                                      <Form.Label>If you are booking with other people, write name and email ids of all people</Form.Label>
                                        <Col md={8}>
                                          <Form.Control as="textarea" name="otherPeopleDetails" rows="5" value={values.otherPeopleDetails} onChange={handleChange}/>
                                          <Form.Text muted>e.g. Peter Parker : iamspiderman@gmail.com</Form.Text>
                                        </Col>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter valid value
                                         </Form.Control.Feedback>
                                      </Form.Row>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Row className="justify-content-between">
                                      <Col md={5}>
                                        <Form.Label>Move-in date <span className="red">*</span></Form.Label>
                                        <DatePickerField
                                          name="moveIndate"
                                          values={values.moveIndate}
                                          onChange={setFieldValue}
                                        />
                                        <Form.Control hidden isInvalid={touched.moveIndate && errors.moveIndate} />
                                        <Form.Control.Feedback type="invalid">
                                            Field required
                                        </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Text muted>When do you wish to move in to this accommodation?</Form.Text>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Row className="justify-content-between">
                                      <Col md={6}>
                                          <Form.Label>How long do you want to stay ? <span className="red">*</span></Form.Label>
                                            <Form.Control as="select" value={values.stay_duration} isInvalid={touched.stay_duration && errors.stay_duration} name="stay_duration" onChange={handleChange}>
                                              <option value="">Select your stay duration</option>
                                              <option value="<=8">Less than or equal to 8 weeks</option>
                                              <option value="12-24">12 - 24 weeks</option>
                                              <option value="24-36">24 - 36 weeks</option>
                                              <option value="44">44 weeks</option>
                                              <option value="51">51 weeks</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Field required
                                            </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Form.Row className="justify-content-between">
                                      <Col md={5}>
                                        <Form.Label>Room Type <span className="red">*</span></Form.Label>
                                        <Form.Control
                                        size="md"
                                        required
                                        type="text"
                                        name="roomType"
                                        value = {values.roomType}
                                        onChange = {handleChange}
                                        isInvalid = {touched.roomType && errors.roomType}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Room type is required
                                        </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                    <Form.Text muted>Which room type would you like to book in the selected accommodation?</Form.Text>
                                  </Form.Group>
                                </Form.Row>
                                {/*<Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                  <Form.Label>Rent you will be paying for this property? <span className="red">*</span></Form.Label>
                                    <Form.Row className="justify-content-between">
                                      <Col md={5}>
                                        <Form.Control
                                          size="md"
                                          placeholder="amount in '£/week'"
                                          required
                                          type="number"
                                          name="rentAmount"
                                          value={values.rentAmount}
                                          onChange={handleChange}
                                          isInvalid={touched.rentAmount && errors.rentAmount}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          Field Required
                                        </Form.Control.Feedback>
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>*/}

                                <Form.Row className="justify-content-center">
                                  <Form.Group as={Col} md={12}>
                                    <Col md={10} className="p-0 m-0">
                                      <Form.Label>Do you have a medical condition or disability we should be aware of while allocating you a room? <span className="red">*</span></Form.Label>
                                    </Col>
                                    <Form.Row className="justify-content-between">
                                      <Col md={6}>
                                            <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="medical_status"
                                            id="medical_status_1"
                                            value="unfit"
                                            isInvalid={errors.medical_status}
                                            onChange={handleChange}
                                            />
                                            <Form.Check
                                            type="radio"
                                            label="No"
                                            name="medical_status"
                                            id="medical_status_2"
                                            value="fit"
                                            isInvalid={errors.medical_status}
                                            onChange={handleChange}
                                            />
                                      </Col>
                                    </Form.Row>
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                    <Form.Group as={Col} md={12}>
                                      <Form.Row className="justify-content-between">
                                      <Form.Label>Any special requirements (optional)</Form.Label>
                                        <Col md={8}>
                                          <Form.Control as="textarea" name="special_requirements" rows="5" value={values.special_requirements} onChange={handleChange}/>
                                          <Form.Text muted>if you have any</Form.Text>
                                        </Col>
                                      </Form.Row>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="justify-content-center">
                                    <Form.Group className="w-100">
                                      <Form.Text className="my-4" muted>By submitting this form you give us consent to forward this information to accommodation provider for booking.</Form.Text>
                                      <Form.Control hidden isInvalid={!isValid}></Form.Control>
                                      <Form.Control.Feedback type="invalid">Please fill all the required fields properly</Form.Control.Feedback>
                                      <Form.Row className="justify-content-between mt-3">
                                        <Col>
                                            <Button type="submit" className="booking_submit_btn">Submit</Button>
                                        </Col>
                                      </Form.Row>
                                    </Form.Group>
                                </Form.Row>
                          </Form>
                        );
                      }}
                </Formik>
              </Col>
            </Col>
          </Row>
            <style type="text/css">{`
                .booking_form_container{
                    box-shadow:5px 5px 99px 0 rgba(155, 167, 190, 0.2);
                    margin:2rem 0;
                }
                .booking_headers{
                  margin:1rem 0 0rem 0;
                  color:#054d7f;
                }
                .booking_form_container label{
                  color:#101A42;
                }
                .booking_form_container label > span{
                  font-size: 1.2rem;
                  margin-left: 4px;
                }
                .booking_submit_btn{
                  background:#f05c4e;
                  border:none;
                }
                .booking_submit_btn:hover{
                  outline:none;
                  background:#f05c4e;
                }
                .booking_submit_btn:focus{
                  outline:none;
                }
                .form-control{
                  letter-spacing:1px;
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
                .text-muted.form-text{
                  margin:0 !important;
                }
                .invalid-feedback{
                  margin:0 !important;
                }
              `}
            </style>
          </Container>
        }
    </>
  }
}


const FormSubmit = (props) => {
    return (<Container className="mt-4">
    <Col xs={12} md={7} className="m-auto">
      <Card className="giftBox my-5 p-md-4">
        <Card.Body>
            <p className="img success_gif m-auto"><Image src="/success.gif" fluid/></p>
            <h5 className="text-center">Thank you for providing your details. We will contact you with your booking confirmation details at the earliest.</h5>
         </Card.Body>
      </Card>
      <Card className="giftBox giftcardBg my-5 p-md-4">
          <Card.Body>
              <h2> gift <span className="orangeText">voucher</span></h2>
              <h5>Refer a Friend to book a room with us and get a <span className="red">£50</span> Amazon gift voucher.</h5><br/>
              <h5><a className="red" href="/refer">Refer Now</a></h5>
              <Image className="amazonLogo mt-5" src="/amazon-logo@2x.png" fluid />
          </Card.Body>
      </Card>
    </Col>
    <style type="text/css">{`
        h2{
          font-size: 3.5em;
          font-weight: 600;
          color: #101a42;
        }
        h5{
          text-align: left;
          font-family: 'Clarika Grotesque';
          font-size: 1.3rem;
          color: black;
        }
        .success_gif{
          width:10rem;
        }
      `}</style>
      </Container>
    );
  };

const pagewithLayout = withLayout(Page);
pagewithLayout.getInitialProps = async ({req, query}) => {
  const json = query;
  let initialValues = InitialVal;
  initialValues.leadId = query.leadId?query.leadId:'';
  initialValues.agent = query.agent?query.agent:'';
  initialValues.fullname = query.fullname?query.fullname:'';
  initialValues.email = query.email?query.email:'';
  initialValues.uni_info = query.university?query.university:'';
  initialValues.phone = query.phone?query.phone:'';
  initialValues.homeCC = query.countryCode?query.countryCode:'';
  initialValues.moveIndate = query.moveIn?query.moveIn:'';
  initialValues.roomType = query.roomType?query.roomType:'';
  initialValues.stay_duration = query.leaseDuration?query.leaseDuration:'';
  return {props: initialValues};
}

export default pagewithLayout;
