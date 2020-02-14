import React from 'react';
import InputRange from 'react-input-range';
import Form, { FormRow } from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import CountryCode  from './CountryCode';
import Button from "react-bootstrap/Button";
import { Formik } from 'formik';
import "react-input-range/lib/css/index.css";
import css from "../public/style.css";
import custom from "../public/custom.css";
import fetch from 'isomorphic-unfetch';
import * as urls from '../components/urls';
import Cookies from "universal-cookie";
import {EnquireNowFormSchema} from "./FormValidationSchema"

const cookies = new Cookies();

const ConnectEnquiryForm = ({infoFormSubmitted ,pageSrc}) => {
  let isSubmitLocked = false;
 return <div className="info_form">
 <Formik
       initialValues={{  budget:'',city:'', fullname: '',phone:'', university:'',email:'', countryCode:'44', leaseDuration:'', source:pageSrc}}
       validationSchema = {EnquireNowFormSchema}
        onSubmit={(values, { setSubmitting }) => {

            values.budget =  {
              'min':0,
              'max':parseInt(values.budget)
            }

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
              document.getElementById('studentButton').removeAttribute('disabled','disabled');
              let messageEl = document.getElementById('formMessage');
              messageEl.setAttribute('class','fade alert alert-success show');
              if (messageEl.textContent == undefined || messageEl.textContent == "") {
                  let textEl = document.createTextNode('Message sent successfully!');
                  messageEl.appendChild(textEl);
              } else {
                  document.getElementById('email').value = "";
                  messageEl.removeAttribute('class','show');
                  messageEl.textContent = "";
              }
          }

          isSubmitLocked = false;
          infoFormSubmitted(values);
        }).catch((error) => {
          let messageEl = document.getElementById('formMessage');
          messageEl.setAttribute('class','fade alert alert-danger show');

          let textEl = document.createTextNode('There is some error, Please try later!');
          messageEl.appendChild(textEl);

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
            setFieldValue,
            isInvalid
          } = props;
                return (
      <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
          <Form.Group as={Col} controlid="IdFullname">
            <Form.Control
              id="fullname"
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
                      Please enter your Full Name.
                    </Form.Control.Feedback>
          </Form.Group>
      </Form.Row>
      <Form.Group>
      <Form.Row>
           <Col md={4} xs={4} sm={4}>
           <Form.Control size="md" as="select"  onChange={(e)=> {values.countryCode = e.target.value; }}>
                <CountryCode/>
           </Form.Control>
             </Col>
             <Col md={8} xs={8} sm={8}>
                 <Form.Control size="md" type="number" placeholder="Phone" required name="phone" value={values.phone} onChange={handleChange}
                  isInvalid={touched.phone && errors.phone}
                 />
             </Col>
             </Form.Row>
              <Form.Control hidden isInvalid={touched.phone && errors.phone}/>
              <Form.Control.Feedback type="invalid">
                 Please provide a valid phone.
               </Form.Control.Feedback>
             </Form.Group>
      <Form.Row>
          <Form.Group as={Col} controlid="IdEmail">
            <Form.Control size="md" type="email" placeholder="Email" required name="email"  value={values.email} onChange={handleChange}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
          </Form.Group>
      </Form.Row>

      <Form.Row>
      <Form.Group as={Col} controlid="IdUniversity">
          <Form.Control size="md" type="text" placeholder="Your University or College" required name="university"  value={values.university} onChange={handleChange}
              isInvalid={touched.university && errors.university}
          />
          <Form.Control.Feedback type="invalid">
                    Please provide the name of the University.
          </Form.Control.Feedback>
      </Form.Group>
      </Form.Row>

      <Form.Row>
          <Form.Group as={Col} controlid="IdSubmit">
          <Button id="studentButton" type="submit" disabled={isSubmitLocked} className="submitButton" size="lg" block className="shadow">submit</Button>
          </Form.Group>
      </Form.Row>

      <Form.Control hidden value= {values.source} />
      <div id="formMessage"></div>
      <div className="text-center">
          <h1 className="privacy_policy_tx">By submitting form you agree to <Link href="/terms"><a><span className="blue_color_text">terms</span></a></Link> and <Link href="/privacy-policy" ><a> <span className="blue_color_text">privacy policy</span></a></Link></h1>
      </div>
      </Form>
   );
  }}
  </Formik>
</div>
}

export default ConnectEnquiryForm;
