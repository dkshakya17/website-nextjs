import React, {useState} from 'react';
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
import {GetInTouchSchema} from "./FormValidationSchema"

const cookies = new Cookies();

const EnquiryForm = ({infoFormSubmitted ,pageSrc}) => {
  let isSubmitLocked = false;
  const [prevIndex, setIndex] = useState();
  const [prevVal, setInxVal] = useState();
  const setCC =(ele) =>{
    // let selectText = ele.target.options[ele.target.selectedIndex].text;
    // let dataVal = ele.target[ele.target.selectedIndex].getAttribute('data-countrycode')
    // ele.target.options[ele.target.selectedIndex].text = dataVal+`(+${ele.target.value})`;
    //   if(prevIndex){
    //     ele.target.options[prevIndex].text = prevVal;
    //   }
    //   setIndex(ele.target.selectedIndex);
    //   setInxVal(selectText);
  }
  const handleCC = (ele) =>{
        // if(prevIndex && ele.target.options){
        //   ele.target.options[prevIndex].text = prevVal;
        // }
    }

 return <div className="info_form">
 <Formik
       initialValues={{  budget:'',city:'', fullname: '',phone:'', university:'',email:'', countryCode:'44', leaseDuration:'', source:pageSrc}}
       validationSchema = {GetInTouchSchema}
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
          <Form.Group as={Col} md={6} controlid="IdFullname" className="enquiry_group_form">
              <Form.Label className="blue_color_label">Full Name</Form.Label>
              <Form.Control
                id="fullname"
                size="md"
                required
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                isInvalid={touched.fullname && errors.fullname}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your Full Name.
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} className="enquiry_group_form">
            <Form.Label className="blue_color_label">Phone Number</Form.Label>
            <Form.Row>
            <Col md={4} xs={4} sm={4} className="pr-0">
              <Form.Control size="md" as="select" className="cc_class" onClick={(e) => {handleCC(e);}} onChange={(e)=> {values.countryCode = e.target.value; setCC(e)}}>
                <CountryCode/>
              </Form.Control>
            </Col>
            <Col md={8} xs={8} sm={8} className="pl-0">
              <Form.Control size="md" type="number" placeholder="Phone" className="phone_class" required name="phone" value={values.phone} onChange={handleChange}
              isInvalid={touched.phone && errors.phone}
              />
            </Col>
            </Form.Row>
            <Form.Control hidden isInvalid={touched.phone && errors.phone}/>
            <Form.Control.Feedback type="invalid">
            Please provide a valid phone.
            </Form.Control.Feedback>
          </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlid="IdEmail" className="enquiry_group_form">
          <Form.Label className="blue_color_label">Email Address</Form.Label>
          <Form.Control size="md" type="email" placeholder="Email" required name="email"  value={values.email} onChange={handleChange}
            isInvalid={touched.email && errors.email}
          />
          <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlid="IdUniversity" className="enquiry_group_form">
          <Form.Label className="blue_color_label">University/City</Form.Label>
            <Form.Control size="md" type="text" placeholder="Your University or City" required name="university"  value={values.university} onChange={handleChange}
                isInvalid={touched.university && errors.university}
            />
            <Form.Control.Feedback type="invalid">
                      Please provide the name of the University.
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="budget" className="enquiry_group_form">
        <Form.Label className="blue_color_label">Budget</Form.Label>
          <Form.Control as="select" onChange={(e) => {values.budget = e.target.value ? parseInt(e.target.value) : '';}}
            isInvalid={touched.budget && errors.budget}
          >
            <option value="">Select budget</option>
            {
              Array(41).fill().map((_,ind) => {
                  let val = ind*10+50;
                  return <option value={val}>{`£${val}/week`}</option>
              })
            }
          </Form.Control>
          <Form.Control.Feedback type="invalid">
              Please provide budget
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlid="IdLease" className="enquiry_group_form">
            <Form.Label className="blue_color_label">Lease Duration</Form.Label>
            <Form.Control  as="select"  onChange={(e)=> {values.leaseDuration = e.target.value; }}
                isInvalid={touched.leaseDuration && errors.leaseDuration}
            >
               <option value="">Select duration</option>
               <option value="<=8">Less than or equal to 8 weeks</option>
               <option value="12-24">12 - 24 weeks</option>
               <option value="24-36">24 - 36 weeks</option>
               <option value="44">44 weeks</option>
               <option value="51">51 weeks</option>
               </Form.Control>
               <Form.Control.Feedback type="invalid">
                      Please provide lease duration
               </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
          <Form.Group as={Col} controlid="IdSubmit">
          <Button id="studentButton" type="submit" disabled={isSubmitLocked} className="submitButton shadow" size="lg" block>submit</Button>
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

export default EnquiryForm;
