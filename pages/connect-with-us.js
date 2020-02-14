
import React, { useState } from 'react';
import withLayout from '../components/MyLayout';
import Container from 'react-bootstrap/Container';
import BookAccomodation from '../components/book-accomodation';
import GetInTouchSteps from '../components/GetInTouchSteps';
import EnquiryForm from '../components/EnquiryForm';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import FormSubmit  from '../components/FormSubmit';
import Col from "react-bootstrap/Col";
import custom from "../public/custom.css";
import { content } from './how-it-works';
import {NextSeo} from 'next-seo';
import Offers from "../components/Offers";
import ConnectEnquiryForm from "../components/ConnectEnquiryForm";


const MetaInfo = () => {
  const meta = {
    title:'Student Accommodation | Compare, Consult & Choose | UniAcco',
    description:'	Compare, consult & choose your Student Accommodation from a wide range of premium and affordable student flats, lodges, studio apartments, ensuites, premium halls and more near your university. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.',
    url: 'https://uniacco.com/connect-with-us',
    type:'generic'
  };
  return <NextSeo
      title = {meta.title}
      description = {meta.description}
      cononical = {meta.url}
      openGraph= {{title: meta.title, description: meta.description, url: meta.url, type:meta.type}}
      noindex={true}
    />}

const GiftVoucher = () => <div className="gift_voucher">
    <h2>gift <span className="red">voucher</span> <span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2>
    <p>For every student who signs up with your referral you get a <b className="red">£50</b> Amazon gift voucher</p>
    <div className="img_cont">
        <div>
        <Image src="/list-images/amazon-logo.svg" fluid/>
        <p>*t&c apply </p>
        </div>
        <Image src="/list-images/gift.svg" fluid />
    </div>
</div>;

const GetInTouchMain = () => {
  const [showSubmission, setShowSubmission] = useState(false);

const infoFormSubmitted = ()=> {
    setShowSubmission(true);
}

return <React.Fragment>

<section className="get_in_touch get_in_touch_hero_img">
    <Container fluid>
        <Row className="d-flex flex-column-reverse flex-md-row">
            <Col md={5} xs={12} >

            <div className="git_cont">
            {/* <img src="/white_logo.svg" className="git_logo"/> */}
            <h1>Find your next <b>Home</b></h1>
            <p>Your student housing search ends here.</p>
            </div>
            <div className="getintouch_rating">
                Rated 4.8 By <img src="/trustpilot.svg"/>
            </div>
            <GiftVoucher/>
            {/* <Offers /> */}
            </Col>
            <Col md={7} xs={12} className="mb-4 mb-md-0">
            <Card className="git_form_card pull-right col-md-offset-2">
                <div className="form_header">
                    <div className="border_bottom mb-2">
                    <h1 className="card_heding">Get Personal Assistance</h1>
                    {/* <h1 className="sub_heding pb-2">Receive personalized recommendations based on your preferences like rent, distance from university, from our trained customer executives within hours.</h1> */}
                </div>
                <ul className="Personal_Assistance_card">
                <li className="bullet_hide"><img src="/icons/support.svg" title="support" className="mr-1"/><span className="sub_heding">24X7 Customer Support</span> </li>
                <li className="bullet_hide"><img src="/icons/verified.svg" title="verified" className="mr-1"/><span className="sub_heding">Verified Property</span> </li>
                <li className="bullet_hide"><img src="/icons/discount.svg" title="discount" className="mr-1"/><span className="sub_heding">Free Service</span> </li>
                </ul>
                </div>
                <Card.Body>
                {
                showSubmission ? <FormSubmit /> : <ConnectEnquiryForm infoFormSubmitted= {infoFormSubmitted} pageSrc={'connect-with-us'}/>
                }

                </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
</section>
<style> {`
.get_in_touch .form_header {
    padding: 1.3rem;
    background-color:#054d7f;
    border-top-right-radius: 0.50rem;
    border-top-left-radius: 0.50rem;
}
.get_in_touch_hero_img {
  background-image: url(/payment_hero_img.png);
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-color: white;
  background-size: cover;
  background-position: center;
  display: flex;
  padding:5rem 4rem 12rem 4rem !important;
  justify-content: space-between;
}

.blue_star_icon img{
    margin:2px;
}

.trustpilot_text {
    color: #054D7F;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
}
.readReviewButton {
  color: #FFFFF;
  background-color: #F05C4E;
  width: auto;
  border-color:#F05C4E;
}

.blue_color_text{
  color:#045e92;
}
.readReviewButton:hover {
    background-color: #F05C4E;
}

.get_in_touch {
    padding:0px;
    margin:0 auto;
    display:flex;
}

.git_form_card {
    margin-bottom: -100px;
    max-width: 450px;
}
.card{
    padding: 0;
    border-top-right-radius: 0.50rem;
    border-top-left-radius: 0.50rem;
}
.card_heding{
    font-size: 34px;
    color:#fff;
}
section {
    padding: 0px !important;
}
.sub_heding{
    font-size: 12px;
    color:#fff;
}

.card-header{
   padding: .75rem 2rem;
}
.getintouch_rating {
    border: 2px solid #ccc;
    max-width: 250px;
    border-radius: 12px;
    height: 30px;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row;
    width: 100%;
    padding: 20px;
    margin-bottom: 50px;
    color: white;
}
.getintouch_rating img {
    margin-left: 10px;
}
.bullet_hide{
    list-style: none;
}

.border_bottom{
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.Personal_Assistance_card{
    display: flex;
    padding: 0px 0px;
    flex-wrap: wrap;
    justify-content: space-between;
}

dl, ol, ul {
    margin-top: 0;
    margin-bottom: 0;
}

.form-control {
    border-radius: 6px !important;
    background-color: rgba(155, 167, 190, 0.1) !important;
    height: 35px;
    opacity: 0.5;
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #101a42;
    border: none !important;
}
.wd_100{
  width:100%;
}

.privacy_policy_tx{
  font-size:11px;
  color:#9ba7be;
}
.book_accomdation_bg {
    background-color: #f05c4e;
    margin-top:0 !important;
}
.submitButton {
  height:35px;
}
@media (max-width: 768px) and (min-width: 320px) {
  .get_in_touch_hero_img{
   padding: 1rem 0rem !important;
   background-image: none;
   background-color: #bdbdbd;
 }
}

`}
</style>


</React.Fragment>
}




const Page = () => <div>
    <MetaInfo />
    <GetInTouchMain/>
    <BookAccomodation />
    <div className="text-center m-4 m-md-5"><h1> how it <span className="orangeText"> works </span></h1></div>
    <GetInTouchSteps />
    <style jsx>{`
    span {
            color: #F05B4E;
            }
            h1 {
                font-family: 'Clarika Grotesque';
                /* font-size: 4rem; */
                font-weight: 600;
                color: #101a42;
            }
            `}
    </style>
</div>;


const pageWithLayout = withLayout(Page);
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
