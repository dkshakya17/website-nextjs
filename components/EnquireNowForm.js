import React from 'react';
import { Formik } from 'formik';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import fetch from 'isomorphic-unfetch';
import CountryCode  from './CountryCode';
import Button from "react-bootstrap/Button";
import * as urls from './urls'
import {EnquireNowFormSchema} from './FormValidationSchema';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const EnquireNowForm = ({infoFormSubmitted, source, city}) => {
    let isSubmitLocked = false;

    return  <div className="info_form">
      <Formik
       initialValues={{ fullname: '', countryCode:'44',phone:'',email:'',university:'', source:source, city: city}}
       validationSchema = {EnquireNowFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          if(!isSubmitLocked) {
            isSubmitLocked = true;

            if(cookies.get('utm_source')) {
              values.utm_source = cookies.get('utm_source');
            }

            if(cookies.get('utm_campaign')) {
              values.utm_campaign = cookies.get('utm_campaign');
            }

            if(cookies.get('utm_medium')) {
              values.utm_medium = cookies.get('utm_medium');
            }

            if(cookies.get('utm_term')) {
              values.utm_term =  cookies.get('utm_term')
            }

            if(cookies.get('utm_content')) {
              values.utm_content =  cookies.get('utm_content');
            }

            if(cookies.get('referrer')){
              values.referrer = cookies.get('referrer');
            }
          fetch(urls.getLeadFormPath(), {
              method: 'POST',
              headers: {
                  'Accept': 'application/json'
              },
              body: JSON.stringify(values)
          }).then(response => {
            if (response.status == 200) {
                return response.json();
                document.getElementById('studentButton').removeAttribute('disabled','disabled');
            }
          }).then(result => {
              isSubmitLocked = false;
              values.leadId =  result.lead_id;
             infoFormSubmitted(values);
          }).catch((error) => {
            isSubmitLocked = false;
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
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isInvalid
          } = props;
          let timestamp;
          return (
            <form noValidate onSubmit={handleSubmit} className="formBox">
              <Form.Row>
                <Form.Group as={Col} controlid="validationCustom01">
                  <Form.Control
                    size="md"
                    required
                    type="text"
                    placeholder="Full Name"
                    defaultValue=""
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    isInvalid = {touched.fullname && errors.fullname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your Full Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Col md={4}>
                      <Form.Control size="md" controlid="ControlPhoneCode" as="select"  onChange={(e)=> {values.countryCode = e.target.value;}}>
                        <CountryCode/>
                      </Form.Control>
                    </Col>
                    <Col md={8}>
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
              <Form.Row>
                <Form.Group as={Col} controlid="formEmail">
                  <Form.Control size="md" type="email" placeholder="Email" name="email" value={values.email} onChange={handleChange}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email Address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
               <Form.Group as={Col} controlid="formUniversity">
                  <Form.Control size="md" type="text" placeholder="Your University or College" required name="university"  value={values.university} onChange={handleChange}
                    isInvalid={touched.university && errors.university}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the name of the University.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button id="studentButton" type="submit" size="lg" block disabled={isSubmitting} className="shadow">submit</Button>
              <Form.Control hidden value= {values.source} />
              <div id="formMessage"></div>
              <p>By submitting form you agree to <a href="/terms" target="_blank" className="blue">terms</a> and <a href="/privacy-policy" target="_blank">privacy policy</a> </p>

            </form>
          );
        }}
      </Formik>
    </div>
}
export default EnquireNowForm;
