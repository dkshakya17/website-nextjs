import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'



const featuredInSize = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide:1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide:1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide:1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide:1,
      partialVisibilityGutter:0
    },
};



const CustomLeftArrow = ({onClick}) => {
  return (
    <Button  className="feature_btn feature_btn_left" onClick={() => onClick()}>
       <Image src="/leftArrow.png" alt="" />
   </Button>
  );
}

const CustomRightArrow = ({onClick}) =>{
  return (
    <Button  className="feature_btn feature_btn_right" onClick={() => onClick()}>
       <Image src="/rightArrow.png" alt="" />
   </Button>
  );
}

const FeaturedIn = () => {
  return (
    <Container>
      <Row className="main_heading font_secondary_color justify-content-center mt-4">
        <h1 className="text-center">featured in</h1>
      </Row>
      <Col md={12} className="mt-5 pb-3">
        <Carousel
         responsive={featuredInSize}
         containerClass="featuredInContainer"
         customLeftArrow={<CustomLeftArrow />}
         customRightArrow={<CustomRightArrow />}
         transitionDuration={10}
         autoPlay={false}
         autoPlaySpeed={3000}
         partialVisible={false}
         itemClass="featuredIn-item"
        >
          <a href='https://www.asianage.com/metros/mumbai/050120/uniacco-international-student-accommodation-platform-raises-1-million.html' target="_blank" class='feature_itm itm_asian' alt="The Asian Age"> </a>
          <a href='https://in.news.yahoo.com/uniacco-international-student-accommodation-platform-raises-usd-1-133413251.html' target="_blank" class='feature_itm itm_yahoo' alt="Yahoo! News"> </a>
          <a href='https://m.dailyhunt.in/news/india/english/business+world-epaper-bizworld/international+student+accommodation+platform+uniacco+raises+1+million-newsid-157719390' target="_blank" class='feature_itm itm_dh' alt="dailyhunt"> </a>
          <a href='https://www.aninews.in/news/business/uniacco-international-student-accommodation-platform-raises-usd-1-million20200106190412/' target="_blank" class='feature_itm itm_ani' alt="ANI"> </a>
          <a href='https://www.business-standard.com/article/news-ani/uniacco-international-student-accommodation-platform-raises-usd-1-million-120010700376_1.html' target="_blank" class='feature_itm itm_bs' alt="Business Standard"> </a>
          <a href='https://thepienews.com/news/accommodation-platform-uniacco-raises-1m/' target="_blank" class='feature_itm itm_pn' alt="Pie news"> </a>
        </Carousel>
      </Col>
      <Row className="main_heading font_secondary_color justify-content-center mt-5">
        <h1 className="text-center">our partners</h1>
      </Row>
      <Col className="mt-5 pt-2 text-center d-flex align-items-center justify-content-center">
          <a target="_blank" href="https://www.studentjob.co.uk/" className="our_partners_wrapper mr-0 mr-md-4"><Image src="thirdPartyImages/StudentJob.png" alt="student job"></Image></a>
          <a target="_blank" href="https://www.yourguarantor.com/" className="our_partners_wrapper ml-0 ml-md-4"><Image src="thirdPartyImages/guarantor_icon.png" className="partners_img guarantor_img" alt="guarantor"></Image></a>
      </Col>
      <style type="text/css" >{`
          .feature_itm{
              height:100px;
              width:204px;
              display:block;
              background-size: cover;
          }

          .itm_asian{
            background:url('thirdPartyImages/news-paper.png') -66px 0px;
          }

          .itm_yahoo{
            background:url('thirdPartyImages/news-paper.png') -309px 0;
          }

          .itm_dh{
            background:url('thirdPartyImages/news-paper.png') -559px 0px;
          }

          .itm_ani{
            background:url('thirdPartyImages/news-paper.png') -821px 0;
          }

          .itm_bs{
            background:url('thirdPartyImages/news-paper.png') -1065px 0;
          }
          .itm_pn{
            background:url('thirdPartyImages/news-paper.png') -1309px 0;
            width:177px;
          }

          .feature_btn{
            position: absolute;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 2px 4px 16px 0px #eac7a2a8;
            border: 1px solid transparent;
            line-height: 1;
          }
          .feature_btn:hover{
            background-color:#ffffff;
          }
          .feature_btn:focus{
            background-color:#ffffff
          }

          .feature_btn_left{
              left:0;
          }

          .feature_btn_right{
              right:0;
          }
          .featuredIn-item{
            padding:0 0.5rem;
            box-sizing:content-box;
            margin: 0 -0.4rem;
            display:flex;
            justify-content:center;
          }

          .our_partners_wrapper > img{
              width:10rem;
              padding:0 1rem;
          }
          .guarantor_img{
            width:8rem !important;
          }
        `}
      </style>
    </Container>
  );
}



export default FeaturedIn;
