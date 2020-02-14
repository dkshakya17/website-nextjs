import React, { useState, Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Link from 'next/link';
import { Formik } from 'formik';
import Image from 'react-bootstrap/Image';
import css from "../public/style.css";
import {SubscriptionSchema} from "./FormValidationSchema.js"
import {newsletterPath} from "./urls"
const layoutStyle = {
    margin: 0,
    padding: 45,
  };

const FormSubscribe = () => (
    <div>
      <Formik
        initialValues= {{ email: '',page_src:''}}
        validationSchema= {SubscriptionSchema}
        onSubmit={(values, { setSubmitting }) => {
          document.getElementById('subscribeButton').setAttribute('disabled','disabled');
          values.page_src = window.location.pathname;
          fetch(newsletterPath, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json'
              },
              body: JSON.stringify(values)
          }).then(response => {
            if (response.status == 200) {
                document.getElementById('subscribeButton').removeAttribute('disabled','disabled');
                let messageEl = document.getElementById('formSubscribe');
                messageEl.setAttribute('class','fade alert alert-success show');
                values.email = '';
                if(messageEl.textContent == undefined || messageEl.textContent == "") {
                    let textEl = document.createTextNode('Subscribed successfully!');
                    messageEl.appendChild(textEl);
                }
            }
          })
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
          return (
            <form noValidate onSubmit={handleSubmit} className="py-2 pl-md-4 ml-md-2">
                <Row className="formSubscribeRow my-2">
                    <Col>
                        <Form.Group className="mb-0">
                            <Form.Control type="email" required placeholder="Enter email" id="email" name="email" value={values.email} onChange={handleChange}  className="mb-0"
                              isInvalid={touched.email && errors.email}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={{ span: 5 }} className="buttonCol">
                        <Button id="subscribeButton" type="submit" size="md" block disabled={ isSubmitting } >submit</Button>
                    </Col>
                </Row>
                <Row className="formSubscribeValidation">
                  <Form.Control hidden isInvalid={touched.email && errors.email} />
                  <Form.Control.Feedback type="invalid">Email required</Form.Control.Feedback>
                </Row>
                <br />
                <div id="formSubscribe"></div>
                <style jsx>{`
                div.form-group {
                    margin-bottom: 0;
                }
            `}</style>
            </form>

          );
        }}
      </Formik>
    </div>
  );

  const socialLinksData = [
    // links are ordered wrt to image used
    {name: 'insta', link: 'https://www.instagram.com/uniacco.official', src: "/icons/instagram.svg"},
    {name: 'twitter', link: 'https://twitter.com/acco_uni', src:"/icons/twitter.svg"},
    {name: 'linkedin', link: 'https://www.linkedin.com/company/uniacco-uk', src:"/icons/linkedin.svg"},
    {name: 'fb', link: 'https://www.facebook.com/uniacco.official/', src:"/icons/facebook.svg"},
]

const SocialLinks = () => (
    <div className="social_icons_wrapper pl-md-4 ml-md-2">
    {socialLinksData.map((social, index )=> (
        <div className="social_icon_bg" key={index}>
        <a href={social.link} target="_blank"><img src={social.src} alt="" className="social_icon_wd" /></a>
        </div>
    ))}
</div>
);

const Footer = () => (
  <div  className="footerDiv" style={layoutStyle}>
    <Container>
        <Row>
            <Col md={2}>
                <Link href="/"><a><Image src="/white_logo.svg" fluid className="mt-1 mb-4" /></a></Link>
                <ListGroup variant="flush" className="disclaimer mb-3">
                <span>Adventum Student Living Pvt. Ltd.</span>
                <span className="content_copyright">The content, images and logos used on this are copyright protected and copyrights vests with the respective owners. The usage is intended to promote, identify and search. No endorsement or partnership is implied.</span>
                </ListGroup>
            </Col>
            <Col md={3} className="pl-md-5">
                <Link href="/about-us"><h6><a>about us</a></h6></Link>
                <ListGroup variant="flush" className="py-2">
                    <a href="https://uniacco.com/blog/" target="_blank"><ListGroup.Item>blog</ListGroup.Item></a>
                    <Link href="/help/faqs"><a><ListGroup.Item>faqs</ListGroup.Item></a></Link>
                    <Link href="/how-it-works"><a><ListGroup.Item>how it works</ListGroup.Item></a></Link>
                    <Link href="/refer"><a><ListGroup.Item>refer</ListGroup.Item></a></Link>
                    <a href="https://uniacco.com/careers/" target="_blank"><ListGroup.Item>careers</ListGroup.Item></a>
                    <Link href="/terms"><a><ListGroup.Item>terms</ListGroup.Item></a></Link>
                    <Link href="/privacy-policy"><a><ListGroup.Item>privacy policy</ListGroup.Item></a></Link>
                    <Link href="/uk"><a><ListGroup.Item>accommodation in UK</ListGroup.Item></a></Link>
                </ListGroup>
            </Col>
            <Col md={3} className="pl-md-5 address">
                <Link href="/contact-us"><h6><a>contact us</a></h6></Link>
                <ListGroup variant="flush">
                    <ListGroup.Item><a href="https://goo.gl/maps/t27yVkdwQiDSKkpt9" className="footer_address" target="_blank"><small><span className="text-gray">UK</span>
                        <br />8 Avery Hill Rd, Avery house, New Eltham, London SE9 2BD, United Kingdom</small></a>
                    </ListGroup.Item>
                    <ListGroup.Item><a href="https://goo.gl/maps/aZBcfnzsjTDHyZCe6" className="footer_address" target="_blank"><small><span className="text-gray">India</span>
                        <br />A-2403, Adventum, Marathon Futurex, Lower Parel, Mumbai, Maharashtra 400013</small></a>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col className="pr-0">
                <h6 className="pl-md-4 ml-md-2">sign up to our newsletter</h6>
                <FormSubscribe />
                <h6 className="pl-md-4 ml-md-2">connect with us</h6>
                <SocialLinks />
            </Col>
            <style>{`
            .social_icon_wd{
                width: 100%;
                height: auto;
                background-color: #4C5472;
                border-radius: 50%;
            }

            .social_icons_wrapper{
                display: flex;
                flex-direction:row;
            }
            .social_icon_bg{
                width: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;
            }

            .social_icon_wd:hover{
                background-color: #334071;
            }

            button {
                background-color: #F05B4E;
            }
            div.card {
                margin-top: 1em;
            }
            .footerDiv {
                background-color: #101A42;
                padding-top: 3em;
                padding-bottom: 3em;

            }
            .hr {
                margin: 2em 2em 2em 0em;
                border: 1px solid gray;
                background-color: gray;
            }

            .content_copyright{
              color: #484f6b !important;
              line-height: 0.7rem !important;
              font-size: 0.6rem !important;
            }
            .formSubscribeValidation{
              background:none !important;
            }
            .formSubscribeValidation > div{
              color:white;
            }
            .footer_address:hover{
              text-decoration:none;
            }
            @media screen and (max-width:600px){
              .footerDiv{
                padding-left:0 !important;
              }
            }
            `}</style>
        </Row>
        <Row className="footerCopy">
            <Col md={{ span: 12, offset: 0 }}>
                <p className="text-white">&copy; 2019 All Rights Reserved</p>
            </Col>
        </Row>
        <style jsx>{`
        h6 {
            font-family: 'Clarika Grotesque';
            font-size: 1.4em;
            font-weight: 600;
            line-height: 1.7em;
            color: #ffffff;
        }
        a:hover {
            cursor: pointer;
            color: #F05B4E !important;
        }
        `}</style>
    </Container>
  </div>
);

export default Footer;
