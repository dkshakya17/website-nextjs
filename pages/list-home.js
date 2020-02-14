import React,{useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from 'formik';
import withLayout from '../components/MyLayout';
import Page from '../components/PageLayout'
import Container from 'react-bootstrap/Container';
import {NextSeo} from 'next-seo';
import {ListHomeSchema} from '../components/FormValidationSchema';
import CountryCode from '../components/CountryCode'
import {homeHosting} from '../components/urls'
const MetaInfo = () => {
  const meta = {
    title:'Host a Home | UniAcco',
    description:'Do you own a student housing property? List your property on our platform to attract students from all over the world. Share your contact details with us and our team will reach out to you at lightening fast speed.',
    keywords:'list a property, host a home, list student accommodation property',
    url: 'https://uniacco.com/host-a-home',
    type:'generic'
  };
  return <NextSeo
      title = {meta.title}
      description = {meta.description}
      cononical = {meta.url}
      keywords = {meta.keywords}
      openGraph= {{title: meta.title, description: meta.description, url: meta.url, type:meta.type}}
    />
}

const FormListHome = () => {
  const [submitStatus, setSubmit] = useState();
  return(
  <div>
    <Formik
      initialValues={{ fullname: '',contact:'',email:'',city:'',countryCode:'44',nearestUniversity:'',months:'',priceRange:'' }}
      validationSchema={ListHomeSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        fetch(homeHosting, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
          if (response.status == 200) {
              clearInterval(timeOutFunc);
              resetForm({});
              // document.getElementById('listhomeButton').removeAttribute('disabled','disabled');
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
        })
      const timeOutFunc =  setTimeout(()=>{
          setSubmitting(true);
        },400);
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
          isInvalid,
        } = props;
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} >
                <Form.Control
                  id="fullname"
                  size="lg"
                  required
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  isInvalid={touched.fullname && errors.fullname}
                />
                  <Form.Control.Feedback type="invalid" className="text-left">
                    Please enter your Full Name.
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
            <Form.Group as={Col} xs={4} className="mb-0">
              <Form.Control size="lg" as='select' name="countryCode" onChange={handleChange} selected={values.countryCode}>
                  <CountryCode/>
              </Form.Control>
            </Form.Group>
              <Form.Group as={Col} xs={8} className="mb-0">
                <InputGroup>
                  <Form.Control
                    size="lg"
                    type="number"
                    placeholder="Contact"
                    aria-describedby="inputGroupPrepend"
                    required
                    name="contact"
                    value={values.contact}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Control hidden isInvalid={touched.contact && errors.contact} />
              <Form.Control.Feedback type="invalid" className="text-left">
                Please enter your Contact Number
              </Form.Control.Feedback>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} >
                <Form.Control size="lg" type="text" placeholder="Email" required name="email" value={values.email} onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Please provide the email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control size="lg" type="text" placeholder="City" required name="city" value={values.city} onChange={handleChange}
                  isInvalid={touched.city && errors.city}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Please provide the name of a City.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control size="lg" type="text" placeholder="Nearest University" required name="nearestUniversity" value={values.nearestUniversity} onChange={handleChange}
                  isInvalid={touched.nearestUniversity && errors.nearestUniversity}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Please provide the name of nearest University.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control size="lg" type="number" placeholder="Available lease duration in weeks" required name="months" value={values.months} onChange={handleChange}
                  isInvalid={touched.months && errors.months}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Please provide the number of Months.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom05">
                <Form.Control size="lg" type="text" placeholder="Price Range Per Week" required name="priceRange" value={values.priceRange} onChange={handleChange}
                  isInvalid={touched.priceRange && errors.priceRange}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Please provide a price range.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button id="listhomeButton" type="submit" size="md" block disabled={isSubmitting} className="shadow">submit</Button>
              <br />
            <div id="formMessage"></div>

          </form>
        );
      }}
    </Formik>
  </div>
);}

const content = () => <Container fluid>
    <div>
        <MetaInfo />
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="formBox">
                    <Card.Body>
                        <p>Tell us about the property.</p>
                        <FormListHome />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    <style jsx>{`
    hr {
        background-color: #F05B4E;
        width: 4em;
        height: .2em;
    }
    h5 {
        color: #054D7F;
        text-align: center;
        font-family: 'Clarika Grotesque';
        font-size: 22px;
        margin-bottom: 2em;
    }
    h3 {
        font-family: 'Clarika Grotesque';
        font-size: 32px;
        font-weight: 600;
        margin-top: 2em;
        color: #054D7F;
        text-align: center;
    }
    p {
        line-height: 4em;
        color: rgba(16, 26, 66, 0.5);
        font-size: 18px;
        font-family: 'Clarika Grotesque';
        text-align: center;
    }
    div {
        padding: 1em;
        min-height: 89vh;
        text-align: center;
        background-color: white;
    }
    `}</style>
</Container>;

const title = {blue: 'host a', orange: 'home'}


const pageWithLayout = withLayout(Page(title, content));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
