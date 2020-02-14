import React, { useState, Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Link from 'next/link';
import { Formik } from 'formik';
import Image from 'react-bootstrap/Image';
import css from "../public/style.css";

const layoutStyle = {
    margin: 0,
    padding: 45,
  };

const FormSubscribe = () => (
    <div>
      <Formik
        initialValues={{ fullname: '' }}
        onSubmit={(values, { setSubmitting }) => {
          document.getElementById('subscribeButton').setAttribute('disabled','disabled');
          fetch('https://formspree.io/meqjaqdp', {
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
                if (messageEl.textContent == undefined || messageEl.textContent == "") {
                    let textEl = document.createTextNode('Subscribed successfully!');
                    messageEl.appendChild(textEl);
                } else { 
                    document.getElementById('email').value = "";
                    messageEl.removeAttribute('class','show');
                    messageEl.textContent = "";
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
          } = props;
          return (
            <form onSubmit={handleSubmit} className="">
                <Row className="formSubscribeRow my-2">
                    <Col>
                        <Form.Group className="mb-0">
                            <Form.Control type="email" required placeholder="Enter email" id="email" name="email" value={values.email} onChange={handleChange}  className="mb-0"/>
                        </Form.Group>
                    </Col>
                    <Col md={{ span: 5 }} className="buttonCol">
                        <Button id="subscribeButton" type="submit" size="md" block disabled={ isSubmitting } >submit</Button>
                    </Col>
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
    {name: 'insta', link: 'https://www.instagram.com/uniacco.official', src: "./icons/instagram.svg"},
    {name: 'twitter', link: 'https://twitter.com/acco_uni', src:"./icons/twitter.svg"},
    {name: 'linkedin', link: 'https://www.linkedin.com/company/uniacco-uk', src:"./icons/linkedin.svg"},
    {name: 'fb', link: 'https://www.facebook.com/uniacco.official/', src:"./icons/facebook.svg"},
]

const SocialLinks = () => (
    <div className="social_icons_wrapper">
    {socialLinksData.map((social, index )=> (
        <div className="social_icon_bg" key={index}>
            <Link href={social.link}>
                <img src={social.src} alt="" className="social_icon_wd" />     
            </Link>
        </div> 
    ))}
</div>
);

const Footer = () => (
    <React.Fragment>
        <footer>
            <Container fluid className="footer_bg">
        <Container>
            <Row>
                <div className="col-12 col-sm-12 col-md-12 col-lg-3 main_heading_margin ">
                    <div className="disclaimer_padding">
                        <Image src="./uniacco-logo-white-s.png" fluid alt="" className="footer_logo_wd" /> 
                        <p className="footer_disclaimer disclaimer_margin">Adventum Student Living Pvt. Ltd.</p>
                        <p className="footer_disclaimer">A-4301, 43rd Floor, Lodha Bellisimo, N.M.Joshi Marg,
                            Mahalakshmi Mumbai- 400011</p>
                        <p className="footer_disclaimer">The content, images and logos used on this are copyright
                            protected and copyrights vests with
                            the respective owners. The usage is intended to promote, identify and search. No
                            endorsement
                            or partnership is implied.</p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-2 main_heading_margin">
                    <p className="footer_heading">about us</p>
                    <ul className="about_us">
                            <a href="https://uniacco.com/blog/" target="_blank"><li className="about_us_item">blog</li></a>
                            <Link href="/help/faqs"><li className="about_us_item">faq</li></Link>
                            <Link href="/how-it-works"><li className="about_us_item">how its works</li></Link>
                            <Link href="/refer"><li className="about_us_item">refer</li></Link>
                            <a href="https://uniacco.com/careers/" target="_blank"><li className="about_us_item">careers</li></a>
                            <Link href="/terms"><li className="about_us_item">term</li></Link>
                            <Link href="/privacy-policy"><li className="about_us_item">privacy policy</li></Link>
                        </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-3 main_heading_margin">
                    <div className="disclaimer_padding">
                        <p className="footer_heading">contact us</p>
                        <p className="country_name">UK</p>
                        <address className="footer_address_tx">8 Avery Hill Rd, Avery house, New Eltham, London SE9 2BD, United Kingdom</address>
                        <div className="address_separator"></div>
                        <div className="mt-3">
                            <p className="country_name">India</p>
                            <address className="footer_address_tx"> A-2403, Adventum, Marathon Futurex, Lower Parel, Mumbai,
                                Maharashtra 400013</address>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 main_heading_margin">
                    <p className="footer_heading">sign up to our newsletter</p>

                    <div className="footer_input">
                        <div>
                            <input type="email" className="Uniacco_input" placeholder="email address" />
                        </div>
                        <div className="pr-2">
                            <button type="button" className="uniacco_btn primary_color">submit</button>
                        </div>
                    </div>
                    <div className="address_separator separator_margin"></div>
                    <p className="footer_heading mt-3 ">connect with us</p>
                
                    <SocialLinks /> 
                  
                </div>
            </Row>
        </Container>
    </Container>
        </footer>
        <style type="text/css">{`
        .footer_input input {
            outline:none;
        }
.Uniacco_input{
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.uniacco_btn {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding:  12px 24px;
    font-family: 'Conv_clarika-grot-bold';
    font-size: 15px;
    line-height: 1.5;
    border-radius: 12px;
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #fff;
}

.footer_logo_wd{
    width: 50%;
}

.footer_disclaimer{
    color: #b4bddc;
    font-size: 0.8em;
    line-height: 1.5;
    font-family: 'Conv_clarika-grot-regular';
}


.disclaimer_margin{
    margin-top: 23px;
}

.disclaimer_padding{
    padding-right: 45px;
}



.footer_bg{
    width: 100%;
    min-height: 350px;
    background-color: #101A42;
}

.about_us a:hover {
    text-decoration: none !important;
}

.about_us_item {
    font-family: 'Conv_clarika-grot-regular';
    font-size: 0.9rem;
    color: #fff;
    line-height: 2.3;
    list-style: none;
    cursor: pointer;
}

.footer_heading{
    font-family: 'Conv_clarika-grot-bold';
    font-size: 1.2rem;
    color: #fff;
}
.main_heading_margin{
    margin: 2rem 0rem;
}

.about_us{
    padding-left: 0px;
}

.country_name{
    font-family: 'Conv_clarika-grot-regular';
    font-size: 0.9rem;
    color: #4C5371;
}

.footer_address_tx{
    font-family: 'Conv_clarika-grot-regular';
    font-size: 0.9rem;
    color: #fff;
}

.address_separator{
   border-bottom: 1px solid #4C5472;
}

.footer_input{
    background-color: #fff;
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    justify-content: space-between;
}


.separator_margin{
 margin-top: 36px;
}

.social_icon_wd{
    width: 24px;
}

.social_icons_wrapper{
    display: flex;
    flex-wrap: wrap;
}
.social_icon_bg{
    width: 48px;
    height: 48px;
    background-color: #4C5472;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
}

.social_icon_bg:hover{
    background-color: #334071;
}

 `}
 </style>
    </React.Fragment>
);

export default Footer;