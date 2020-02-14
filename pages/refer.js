import React, {useState} from 'react';
import withLayout from '../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { CardBody } from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Formik } from 'formik';
import css from "../public/style.css";
import {ReferSchema} from "../components/FormValidationSchema";
import {referPath} from "../components/urls"

const FormRefer = () => {
    let isSubmitLocked = false;
    const [formsuccess, setsuccess] = useState();
    return <div>
      <Formik
        initialValues={{ fullname: '',email:'', referfullname:'',referemail:'',referphone:'',referuniversity:''}}
        validationSchema={ReferSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            if(!isSubmitLocked) {
                isSubmitLocked = true;
                fetch(referPath, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(response => {
                  if (response.status == 200) {
                      clearInterval(timeOutFunc);
                      resetForm();
                      setsuccess(true);
                  }else{
                      setsuccess(false);
                  }
                    isSubmitLocked =  false;
                })
            }

        const timeOutFunc = setTimeout(() => {
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
          return (
            <form onSubmit={handleSubmit} noValidate className="referForm">
                <p>Your details</p>
                <Row>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Full Name" required id="fullname" name="fullname" value={values.fullname} onChange={handleChange}
                          isInvalid={touched.fullname && errors.fullname}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Email" required id="email" name="email" value={values.email} onChange={handleChange}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                </Row>
                <p>Referral details</p>
                <Row>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Referral Full Name" required id="referfullname" name="referfullname" value={values.referfullname} onChange={handleChange}
                          isInvalid={touched.referfullname && errors.referfullname}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Referral Email" required id="referemail" name="referemail" value={values.referemail} onChange={handleChange}
                          isInvalid={touched.referemail && errors.referemail}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Referral Phone number" required id="referfullphone" name="referphone" value={values.referphone} onChange={handleChange}
                          isInvalid={touched.referphone && errors.referphone}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Referral University" required id="referuniversity" name="referuniversity" value={values.referuniversity} onChange={handleChange}
                          isInvalid={touched.referuniversity && errors.referuniversity}
                        />
                        <Form.Control.Feedback type="invalid">Field Required</Form.Control.Feedback><br/>
                    </Col>
                </Row>
                <hr /><br />
                <Row>
                    <Col sm={6}>
                        <Button id="referButton" type="submit" size="md" block disabled={isSubmitLocked} className="shadow">submit</Button>
                    </Col>
                </Row>
                <br />
                  {typeof(formsuccess) !== 'undefined' &&
                        <div className={`fade alert show ${formsuccess?'alert-success':'alert-danger'}`}>
                                {formsuccess?'Message sent successfully!':'Some error occured please try later'}
                        </div>
                  }
                <style jsx>{`
                    form div div input {font-size: 2em; padding: 0.3em;}
                `}</style>
            </form>
          );
        }}
      </Formik>
    </div>
}

const terms = [
    'This offer is available to new customers only. Customers currently living with any property management firm are eligible for this offer.',
    'Unlimited voucher per customer is permitted depending on the number of referrals.',
    'UniAcco employees and their families are not eligible for this offer.',
    'UniAcco reserves the right to substitute the Amazon voucher with an alternative voucher of equal value if for any reason it is unable to procure an Amazon voucher.',
    'Use of the voucher is subject to the terms and conditions of the voucher issuing organisation.',
    'UniAcco is not liable for any loss or damage arising out of the customer’s use of the voucher.',
    'This offer is personal to the customer and is non-transferable.',
    'UniAcco reserves the right to withdraw or change this offer at any time.',
    'The offer is valid on minimum booking of 44 weeks lease period.',
    'The offer is only redeemed after 15 days of the person moving into the property.',
]
const Content = () => <Container fluid className="px-0">
      <div className="watermark px-3 px-lg-5">
        <Row className="heroRow px-lg-5">
            <Col md={{ span: 8, offset: 2 }}>
            <div className="px-lg-5">
              <Col md={{ span: 12 }} className="px-0 px-lg-5">
                <h1> refer a <span className="orangeText">friend</span></h1>
                <h4>Refer a Friend to book a room with us and get something!</h4>
                <Card className="giftBox my-4">
                    <Card.Body>
                        <FormRefer />
                    </Card.Body>
                </Card>
                <Card className="giftBox giftcardBg my-5 p-md-4">
                    <Card.Body>
                        <h2> gift <span className="orangeText">voucher</span></h2>
                        <h5>Refer a Friend to book a room with us and get a <span>£50</span> Amazon gift voucher.</h5><br/>
                        <Image className="amazonLogo mt-5" src="/amazon-logo@2x.png" fluid />
                    </Card.Body>
                </Card>
                <Card className="giftBox my-5 p-md-4">
                    <Card.Body>
                        <h2> terms &amp; <span className="orangeText">conditions</span></h2>
                        <div className="mt-2">
                            <ul>{terms.map((term, indx) => (
                                <li key={indx} ><span>{term}</span></li>
                            ))}
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
              </Col>
              <div className="amazonvoucherCircle"></div>
            </div>
          </Col>
        </Row>
      </div>
    <style jsx>{`
    ul {
        color: red;
        font-size: 1em;
        padding-right: 5px;
    }
    ul span {
        color: black;
    }
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
        font-family: 'Clarika Grotesque';
        font-size: 4rem;
        font-weight: 600;
        text-align: left;
        color: #101a42;
    }
    h2 {
        font-size: 3.5em;
        font-weight: 600;
        color: #101a42;
    }
    .watermark {
        background-image: url("/refer-bg.png");
        min-height: 30vh;
        //background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    hr {
        background-color: #F05B4E;
        width: 4em;
        height: .2em;
    }
    h5 {
        text-align: left;
        font-family: 'Clarika Grotesque';
        font-size: 22px;
        color: black;
    }
    h3 {
        font-family: 'Clarika Grotesque';
        font-size: 32px;
        font-weight: 400;
        margin-top: 0em;
        color: gray;
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
        //padding: 1em;
        // min-height: 33vh;
        // text-align: center;
        // background-color: white;
    }
    `}</style>
</Container>;

const Page = () => <div>
    <Content></Content>
</div>;

const pageWithLayout = withLayout(Page);
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
