import React from "react";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Carousel from "react-multi-carousel";


function getServices () {
    return [ {imageSrc: '/home.svg', title: 'Property Consultation',
    description: 'No tossing around. One expert to personalise & book your accommodation.' },
    {imageSrc: '/passport.svg', title: 'Student Visa',
    description: 'Hassle-free, best-in-class visa application service.' },
    {imageSrc: '/loan.svg', title: 'Student Loan',
    description: 'No collateral, minimum documentation, safe and secure.' },
    {imageSrc: '/concierge.svg', title: 'Concierge Service',
    description: 'You’re never on your own with our 24x7 assistance till we settle you in.' },
    {imageSrc: '/surface1.svg', title: 'Guarantor',
    description: 'Get a professional guarantor to take care of your rental contract.' }
    ]
}

const OurServices = () => (
    <section>
    <Container fluid>
        <div className="col-12 main_heading_margin text-center">
            <h1 className="main_heading font_secondary_color">our services</h1>
        </div>
        <div className="col-12 row justify-content-center">
        <Carousel
         additionalTransfrom={0}
         arrows={false}
         autoPlaySpeed={3000}
         centerMode={false}
         className=""
         containerClass="container"
         dotListClass=""
         draggable
         focusOnSelect={false}
         infinite={false}
         itemClass=""
         keyBoardControl
         minimumTouchDrag={80}
         renderButtonGroupOutside={false}
         renderDotsOutside={false}
         responsive={{
           desktop: {
             breakpoint: {
               max: 3000,
               min: 1024
             },
             items: 5,
             partialVisibilityGutter: 50
           },
           mobile: {
             breakpoint: {
               max: 464,
               min: 0
             },
             items: 1,
             partialVisibilityGutter: 30
           },
           tablet: {
             breakpoint: {
               max: 1024,
               min: 464
             },
             items: 2,
             partialVisibilityGutter: 30
           }
         }}
         showDots={true}
         sliderClass=""
         slidesToSlide={1}
         swipeable
      >
         {
             getServices().map((service, index)=> (
                <div key={index} className="col-12 card_bg">
                  <div class="our_services_carousel">
                      <Image src={service.imageSrc} alt="" />
                      <p className="font_secondary_color s_card_heading  mt-4 mb-0">{service.title}</p>
                      <p className="card_sub_heading mt-2">{service.description}</p>
                  </div>
                </div>
             ))
         }
          </Carousel>
         </div>
    </Container>
    <style type="text/css"> {`
    .our_services_carousel{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 17rem;
    }
    .card_bg{
        width: 100%;
        min-height: 210px;
        padding: 1.2rem;
        background-color: #fff;
    }

    .s_card_heading{
        font-size: 20px;
        font-family: 'Conv_clarika-grot-bold';
        height: 3rem;
        line-height: 1;
        display: table-cell;
        vertical-align: bottom;
        text-align:center;
        display:flex;
        align-items:flex-end;
    }
    .our_services_carousel .card_sub_heading{
        font-size: 16px;
        font-family: 'Conv_clarika-grot-regular';
        color: #9ba7be;
        text-align:center !important;
    }
    .card_bg:hover{
        box-shadow:2px 17px 15px 0px #ecebe9;
        cursor: pointer;
        transform:scale(1.08);
    }
    .react-multi-carousel-dot > button{
      border:none !important;
    }
    @media only screen and (min-width: 320px) and (max-width: 575px) {
        .card_bg{
            padding: 0.8rem;
            min-height: 220px;
        }
    }
    .card_bg img {
      width: 75px;
      height: 75px;
    }
    `}
    </style>
</section>
)

export default OurServices;
