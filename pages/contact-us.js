import React from 'react';
import withLayout from '../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import css from "../public/style.css";
import {NextSeo} from 'next-seo';
import {ContactUsSchema} from '../components/FormValidationSchema'
import {contactUsPath} from '../components/urls'

const MetaInfo = () => {
  const meta = {
    title:'Contact Us | UniAcco',
    description:'	Reach out to our team of experts to get support on any query related to your student accommodation. You can chat, call or email us and we will be happy to guide you. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.',
    keywords:'contact us, contact uniacco',
    url: 'https://uniacco.com/contact-us',
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

const FormContactUs = () =>
    <div>
      <Formik
        validationSchema={ContactUsSchema}
        initialValues={{ fullname: '',email:'',message:''}}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch(contactUsPath, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json'
              },
              body: JSON.stringify(values)
          }).then(response => {
            if (response.status == 200) {
                clearInterval(timeOutFunc);
                resetForm();
                document.getElementById('contactButton').removeAttribute('disabled','disabled');
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
          const timeOutFunc = setTimeout(() => {
            setSubmitting(true);
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
          return (
            <form noValidate onSubmit={handleSubmit} className="contactForm">
                <Form.Control size="lg" type="text" placeholder="Full Name" required id="fullname" name="fullname" value={values.fullname} onChange={handleChange}
                isInvalid={touched.fullname && errors.fullname}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Field required
                </Form.Control.Feedback>
                <br/>
                <Form.Control size="lg" type="text" placeholder="Email" required name="email" value={values.email} onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  Field required
                </Form.Control.Feedback>
                <br/>
                <Form.Group>
                    <Form.Control maxLength="500" as="textarea" size="lg" placeholder="Message" rows="3" id="message" required name="message" value={values.message} onChange={handleChange}
                      isInvalid={touched.message && errors.message}
                    />
                    <Form.Control.Feedback type="invalid" className="text-left">
                      Field required
                    </Form.Control.Feedback>
                </Form.Group>

                <Button id="contactButton" type="submit" size="md" block disabled={isSubmitting} className="shadow">submit</Button>
                <br />
                <div id="formMessage"></div>

            </form>
          );
        }}
      </Formik>
    </div>

const copyClipBoard = (ele_content) => {
  var inp =document.createElement('input');
      document.body.appendChild(inp)
      inp.value = ele_content;
      inp.select();
      document.execCommand('copy',false);
      inp.remove();
}

const Contact = () =>
{
  return (<Container fluid>
      <MetaInfo />
      <div className="watermark">
        <Row className="heroRow">
            <Col md={{ span: 6, offset: 0 }}>
                <h1> contact <span className="orangeText">us</span></h1>
            </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col md={{ span: 7, offset: 1 }}>
            <div className="contact-text">
              <h3><span>Say hello.</span></h3>
              <p className="contact_content">If you are a student looking for accommodation in U.K, please fill the form so we can reach you.</p>

              <p className="contact_content mb-0">Our customer executive will get in touch with in 1 hour.</p>
              <p className="contact_content">You can also reach use at <span><a href="mailto:contact@uniacco.com" className="red">contact@uniacco.com</a></span>.</p>
              <Card className="blueCard">
                <Row>
                  <Col md={{ span: 7 }}>
                    <Card.Body>
                      <p className="innerText">If you have any enquiry please contact us</p>
                    </Card.Body>
                  </Col>
                  <Col md={{ span: 5 }}>
                    <Card className="innerCard">
                      <Card.Body className="justify-content-between d-flex flex-row innerCard_item">
                        <Col className="p-0"><a href="mailto:contact@uniacco.com" className="makeColorBlue">contact@uniacco.com</a></Col>
                        <Col className="p-0 text-right"><img className="copy_icon_itm" onClick={() => copyClipBoard('contact@uniacco.com')}  src="/copy.svg"></img>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card>
              <Card className="orangeCard">
                <Row>
                  <Col md={{ span: 4 }}>
                    <Card.Body>
                      <p className="innerText">You can also reach us at</p>
                    </Card.Body>
                  </Col>
                  <Col md={{ span: 4 }} className="pl-md-0 d-flex flex-column justify-content-center">
                    <Card className="innerCard">
                      <Card.Body className="d-flex">
                        <Col className="p-0" xs={11}><a className="makeColorOrange" href="tel:+447428879521">+44 742 887 9521</a></Col>
                        <Col xs={1} className="p-0 text-right"><img onClick={() => copyClipBoard('+447428879521')} className="copy_icon_itm" src="/copy_1.svg"></img></Col>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={{ span: 4 }} xs={12} className="pl-md-0 m-auto">
                    <Card className="innerCard">
                      <Card.Body className="d-flex">
                        <Col className="p-0" xs={11}><a className="makeColorOrange" href="tel:+912223022100">+91 22 230 22100</a></Col>
                        <Col xs={1} className="p-0 text-right"><img onClick={() => copyClipBoard('+912223022100')} className="copy_icon_itm" src="/copy_1.svg"></img></Col>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
          <Col md={{ span: 3, offset: 0 }}>
              <Card className="shadow">
                  <Card.Body>
                      <p>Fill your information to get in touch with us.</p>
                      <FormContactUs />
                  </Card.Body>
              </Card>
          </Col>
        </Row>
        <br /><br />
    </div>
    <style jsx>{`
    div.contactBox {
      padding: 0em;

    }
    p {
      text-align: left;
    }
    span {
      color: #F05B4E;
    }
    h1 {
        padding-top: 1em;
        font-family: 'Clarika Grotesque';
        font-size: 80px;
        font-weight: 600;
    }
    .watermark {
        background-image: url("/UniAcco.png");
        min-height: 30vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
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
        margin-top: 0em;
        color: #054D7F;
        text-align: left;
    }
    p {
        line-height: 1.4em;
        color: rgba(16, 26, 66, 0.5);
        font-size: 18px;
        font-family: 'Clarika Grotesque';
        text-align: left;
    }
    div {
        margin-top: 0em;
        min-height: 33vh;
        text-align: center;
        background-color: white;
    }
    .innerCard_item{
        padding-top:1rem !important;
        padding-bottom:1rem !important;
    }
    a{
      text-decoration:none !important;
    }
    .makeColorBlue{
      color:#154d7f !important;
      font-size:1rem !important;
    }
    .makeColorOrange{
      color:#ee5a4e !important;
      font-size:1rem !important;
    }
    .copy_icon_itm:hover{
      cursor:pointer;
      transform:scale(1.1);
    }
    .contact_content{
        font-weight:100;
        font-size:1.3rem;
        line-height:1.6rem;
    }

    @media only screen and (max-width:700px) and (min-width:300px){
      .makeColorBlue{
          font-size:1.3rem !important;
      }
      .makeColorOrange{
        font-size:1.3rem !important;
      }
    }
    `}</style>
</Container>);
}


const Page = () =>
      <Contact></Contact>



const pageWithLayout = withLayout(Page);
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
