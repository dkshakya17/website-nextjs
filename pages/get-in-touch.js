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
import { content } from './how-it-works';
import {NextSeo} from 'next-seo';
import Offers from "../components/Offers"


const MetaInfo = () => {
  const meta = {
    title:'Student Accommodation | Compare, Consult & Choose | UniAcco',
    description:'	Compare, consult & choose your Student Accommodation from a wide range of premium and affordable student flats, lodges, studio apartments, ensuites, premium halls and more near your university. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.',
    url: 'https://uniacco.com/get-in-touch',
    type:'generic'
  };
  return <NextSeo
      title = {meta.title}
      description = {meta.description}
      cononical = {meta.url}
      openGraph= {{title: meta.title, description: meta.description, url: meta.url, type:meta.type}}
      noindex={true}
    />}

const GiftVoucher = () => <div className="grab_the_deal">
  {/*<h2>gift <span className="red">voucher</span> <span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2>
    <p>For every student who signs up with your referral you get a <b className="red">£50</b> Amazon gift voucher</p>
    <div className="img_cont">
        <div>
        <Image src="/list-images/amazon-logo.svg" fluid/>
        <p>*t&c apply </p>
        </div>
        <Image src="/list-images/gift.svg" fluid />
    </div>*/}
    <Image src="/grab_the_deal.svg" fluid />
    <div className="grab_deal_items">
        <p><b className="red">£50</b> Amazon Voucher</p>
            <p className="text-center"><b className="red">+</b></p>
            <p className="text-center">FREE Bedding Pack on every booking</p>
    </div>
</div>;

const GetInTouchMain = () => {
  const [showSubmission, setShowSubmission] = useState(false);

const infoFormSubmitted = ()=> {
    setShowSubmission(true);
}

return <React.Fragment>

<section className="get_in_touch get_in_touch_hero_img">
    <Container className="container_full_width p-0">
        <Row className="d-flex flex-column-reverse flex-md-row">
            <Col md={5} xs={12} className="git_context_container">

            <div className="git_cont">
            {/* <img src="/white_logo.svg" className="git_logo"/> */}
            <h1>Your <b>home</b> is here</h1>
            <p>We are focused on our student accomodation with the best technology,<br></br> excellent customer support & offers.</p>
            </div>
            <div className="getintouch_rating">
                Rated 4.8 By <img src="/trustpilot.svg"/>
            </div>
            <GiftVoucher/>
            {/* <Offers /> */}
            </Col>
            <Col md={7} xs={12} className="mb-4 mb-md-0">
            <Card className="git_form_card w-100">
                <div className="form_header">
                    <div>
                      <h1 className="card_heding">Get Personal Assistance</h1>
                     <h1 className="sub_heding pb-2">Receive personalized recommendations based on your preferences like rent, distance from university, from our trained customer executives within hours.</h1>
                    </div>
                    {/*<ul className="Personal_Assistance_card">
                      <li className="bullet_hide"><img src="/icons/support.svg" title="support" className="mr-1"/><span className="sub_heding">24X7 Customer Support</span> </li>
                      <li className="bullet_hide"><img src="/icons/verified.svg" title="verified" className="mr-1"/><span className="sub_heding">Verified Property</span> </li>
                      <li className="bullet_hide"><img src="/icons/discount.svg" title="discount" className="mr-1"/><span className="sub_heding">Free Service</span> </li>
                    </ul>*/}
                </div>
                <Card.Body>
                  {
                    showSubmission ? <FormSubmit /> : <EnquiryForm infoFormSubmitted= {infoFormSubmitted} pageSrc={'get-in-touch'}/>
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
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
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

.readReviewButton:hover {
    background-color: #F05C4E;
}

.get_in_touch {
    padding:0px;
    margin:0 auto;
    display:flex;
}

.card{
    padding: 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}
.card-body{
  padding:1.5rem !important;
}
.card_heding{
    font-size:2.12rem;
    color:#fff;
}
section {
    padding: 0px !important;
}
.sub_heding{
    font-size: 12px;
    color:#fff;
}

.book_accomdation_bg {
    background-color: #f05c4e;
    margin-top:0 !important;
}
.card-header{
   padding: .75rem 2rem;
}
.getintouch_rating {
  border: 1px solid white;
  max-width: 240px;
  border-radius: 4px;
  height: 30px;
  display: inline-flex;
  justify-content: center;
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
.blue_color_label{
  color:#045e92;
  font-size:0.9rem;
}

.form-control {
    height: 36px;
    opacity: 0.5;
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #101a42;
    background:none !important;
    border: solid 1px rgba(206, 213, 228, 0.93) !important;
    border-radius:4px !important;
}
.privacy_policy_tx{
  font-size:11px;
  color:#9ba7be;
}
.submitButton {
  height:35px;
}
.container_full_width{
  max-width:100% !important;
}

.grab_the_deal{
  position:relative;
  max-width:310px;
  display:flex;
  align-items:center;
  justify-content:center;
  left: -10px;
}
.grab_deal_items{
  position: absolute;
    bottom: 14%;
    left: 7%;
    width: 90%;
    padding: 0 0.5rem;
}
.grab_deal_items > p{
  margin:0;
  font-size:0.7rem;
  font-weight:900;
  line-height:1;

}
.grab_deal_items > p > b{
  font-size:1.3rem;
}
select.form-control{
  background-image: url(/icons/down-arrow.svg) !important;
background-repeat: no-repeat !important;
background-position: right 7px center !important;
background-size: auto !important;
-webkit-appearance: none;
}
.git_context_container{
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:flex-start;
}
.blue_color_text{
  color:#045e92;
}
.enquiry_group_form{
  padding:0 1rem !important;
}
.cc_class{
  border-top-right-radius: unset !important;
  border-bottom-right-radius: unset !important;
}
.phone_class{
  border-left:none !important;
  border-top-left-radius: unset !important;
  border-bottom-left-radius: unset !important;
}

@media screen and (max-width:700px){
    .container_full_width{
      max-width:88% !important;
    }
    .enquiry_group_form{
      padding:0 5px !important;
    }
    .info_form{
      margin-top:0;
    }
    .get_in_touch .form_header{
      padding:0.9rem;
    }
    .card_heding{
      font-size:1.72rem;
      text-align:left;
    }
    .card-body{
      padding:1rem !important;
    }
    .grab_the_deal{
      max-width:100%;
      width:100%;
      left: unset;
    }
    .grab_deal_items{
      left:14%;
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
