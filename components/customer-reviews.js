import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image"; 
import Button from "react-bootstrap/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; 

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5, 
      slidesToSlide:1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide:1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide:1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide:1
    },
  };

function getCustomerReviews() {
   return [
            {name:'Tahran Gotla', imageSrc:'/review/tahran-gotla.png',
             text:'UniAcco made it so simple. They just asked me for a few details and I am so happy with my property. They were so responsive and promptly answered all of my questions and any queries I could think of. Kudos to you guys'},
             {name:'Isabella Lewis', imageSrc:'/review/isabella-lewis.png',
             text:'They made this experience amazingly swift. They\'ve helped me and my friend with everything starting from the accommodation that fits our budget to helping us on how to reach from the airport to our rooms. In my opinion, it can\'t get better than this. Truly thank you.'},
             {name:'Sajal Sharma', imageSrc:'/review/sajal-sharma.png',
             text:'I want to take out time to thank Mitali for being so helpful in finding myself an accommodation. She answered my million questions that too with such calm. I truly appreciate her efforts and I am so happy I came across your website. It is so reliable and hassle free.'},
             {name:'Ahmed Al-Hadi', imageSrc:'/review/ahmed-al-hadi.png',
             text:'I am very particular in terms of everything, but Uniacco took care of it. They\'ve picked up my calls every time and been there 24/7 to help me. I came in at the last minute but still was able to find my accommodation and I am so happy with it.'}           
            ]
}

function onClick() {

}

export const CustomRightArrow = ({onClick}) => (
    <React.Fragment>
      <div>
      <Button  className="primary_color slider_btn_right" onClick={() => onClick()}>
         <Image src="/rightArrow.png" alt="" />
     </Button> 
     </div>
     <style type="text/css"> {`
     .slider_btn_right{
      position: absolute;
      right: 7%;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 2px 4px 16px 0px #eac7a2a8;
      border: 1px solid transparent;
      line-height: 1;
    }
   
    .slider_btn_right:hover{
      background-color: #fff;
    
    }

    .slider_btn_right:focus{
      background-color: #ffff;
    }
  `}
  
       </style>
     </React.Fragment>
     )
     
  export const CustomLeftArrow  = ({onClick}) => ( 
    <React.Fragment>
      <div>
    <Button  className="primary_color slider_btn_left" onClick={() => onClick()}>
       <Image src="/leftArrow.png" alt="" />
   </Button> 
   </div>
  
   <style type="text/css"> {`
     .slider_btn_left{
      position: absolute;
      left: 7%;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 2px 4px 16px 0px #eac7a2a8;
      border: 1px solid transparent;
      line-height: 1;
    }
   
    .slider_btn_left:hover{
      background-color: #fff;
      }

    .slider_btn_left:focus{
     background-color: #ffff;
    }
  `}
  
  </style>
   </React.Fragment>
     )
   
const ReviewCard = ({review, index}) => (
    <div key={index} className="card_container">
        <div className="review_card position_relative over_flow_hidden">
                         <div className="d-flex justify-content-between">
                             <div>
                                 <Image src="/small_quote.png" alt="" fluid />
                             </div>
                             <div>
                                 <Image src={review.imageSrc} alt="" />
                             </div>
                         </div>
                         <div>
                             <p className="card_sub_heading review_card_content">{review.text}</p>
                             <p className="font_secondary_color card_heading">{review.name}</p>
                         </div>
                     </div>
                 </div>
)

export default class CustomerReviews extends React.Component {

onClick() {
}

render(){
return <section className="position_relative">
    <Container className="our_customer_bg mb-5">
        <Container>
            <div className="col-12 main_heading_margin">
                <h1 className="main_heading font_secondary_color">our customers<br />
                    love what we do.</h1>
                <p className="card_sub_heading">We give love. We get love.</p>
            </div>
            
            <Carousel responsive={responsive}
              customLeftArrow={<CustomLeftArrow onClick={this.onClick}/>}
              customRightArrow={<CustomRightArrow onClick={this.onClick}/>}
              removeArrowOnDeviceType={["tablet", "mobile"]} 
              autoPlay={true}
              autoPlaySpeed={3000}
              slidesToSlide={1}
            >
            {
                 getCustomerReviews().map((review, index)=> (
                     <ReviewCard review={review} key={index}/>
                 ))
            }
            </Carousel>
            
        </Container>
    </Container>
    <style type="text/css"> {`
    .card_heading{
        font-size: 24px;
        font-family: 'Conv_clarika-grot-bold';
        margin-bottom: 0px;
    }
    .review_card_content {
      min-height: 96px;
    }

    .review_card{
        width: 100%;
        background-color: #fff;
        min-height: 200px;
        box-shadow: 2px 6px 19px 0px #e2d9cfb8;
        border-top-right-radius: 12px;
        border-bottom-left-radius: 12px;
        padding: 24px;
       
        }


        .review_card:after{
          content: '';
          background-image: url(/light_small_quote.png);
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          width: 150px;
          height: 150px;
          bottom: -50px;
          right: 0;
        }


        .react-multi-carousel-list {
            position:inherit !important;
          }

 .card_container {
     width:100%;
     padding: 20px;
 }
 .our_customer_bg:after{
    content: '';
    background-image: url("/quote.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 760px;
    height: 760px;
    z-index: -1;
    top: 0px;
    left: -90px;
}

@media only screen and (min-width: 320px) and (max-width: 575px){
    .our_customer_bg:after{
        width: 310px;
        height: 310px;
    }

    
    .review_card:after{
      display: none;
    }
}

    `}
    </style>
   </section>
}
}