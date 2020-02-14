import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';

function getAccomdation() {
    return [
        {imageSrc: '/compare.svg',  title:'Compare', description: 'We leverage the best technology to make comparison effortless for you.'},
        {imageSrc: '/consult.svg', title:'Consult', description: 'Browse our catalogue of expert recommended properties.'},
        {imageSrc: '/choose.svg', title:'Choose', description: 'Hand-tailored solutions for your personalized requirements.'}
    ]
}

const BookAccomodation = ()=> (
    <section>
        <Container fluid className="book_accomdation_bg py-3 mt-5">
            <Container className="p-0 py-5 p-md-5 mb-5 container_full_width">
                <div className="col-12 text-center">
                    <h1 className="main_heading font_color_tertiary mb-0">book accommodation faster</h1>
                    <p className="sub_heading font_color_tertiary">Trusted and hassle-free service on your fingertips</p>
                </div>
            </Container>
        </Container>

        <Container className="card_margin container_full_width">
            <div className="col-12 col-md-12 px-lg-4 col-xs-12 m-auto">
                <Row  className="px-0 px-md-5">
                    {
                      getAccomdation().map((detail,index)=> (
                    <div className="col-12 col-sm-4 mb-4 px-0 px-sm-1 px-md-1 px-lg-4" key={index}>
                        <div className="book_card_bg card_item_center px-2 py-3">
                            <Col md={2} lg={2} sm={3} xs={2} className="p-0">
                              <Image src={detail.imageSrc} alt="" />
                            </Col>
                             <Col md={8} lg={8} sm={7} xs={9} className="p-0 ml-3">
                                <p className="font_secondary_color card_heading  mt-4">{detail.title}</p>
                                <p className="card_sub_heading text-center">{detail.description}</p>
                             </Col>
                        </div>
                    </div>
                      )
                      )
                    }
                </Row>
            </div>
        </Container>
        <style type="text/css"> {`
        .book_accomdation_bg {
            background-color: #f05c4e;
           }
        .card_heading{
            font-size: 24px;
            font-family: 'Conv_clarika-grot-bold';
            margin:0 !important;
        }
        .card_sub_heading{
            font-size: 12px;
            text-align:left !important;
            font-family: 'Conv_clarika-grot-regular';
            color:#9ba7be ;
        }
        .card_margin {
            margin-top: -70px;

        }
        .card_item_center {
            display: flex;
            flex-direction:row;
            justify-content: center;
            align-items: center;
        }
        .book_card_bg{
            width: 100%;
            background-color: #fff;
            box-shadow: 2px 20px 20px 0px #ececec7a;
            border-radius: 5px;
            min-height:120px;
        }
        .book_card_bg > div> img{
          max-width:3rem;
        }
        @media only screen and (min-width: 961px) {
            .book_card_bg {
                max-width: 100%;
                margin: auto;
            }
            .card_margin.container_full_width{
              max-width:100% !important;
            }
          }
        @media only screen and (max-width:960px){
          .card_margin.container_full_width{
            max-width:100% !important;
          }
          .book_accomdation_bg > .container_full_width{
            max-width:100% !important;
          }
        }

        `}
        </style>
    </section>
)

export default BookAccomodation;
