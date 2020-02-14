import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Link from 'next/link';
import Image from "react-bootstrap/Image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";




const ViewRoomTile = ({propData, link}) => (
  <a href={link} target='_blank'>
  <div className="view_room_tile">
    <Card className="view_box">
      <Card.Body>
        <Row>
          <Col md={12} xs={12} className="p-0">
             <p className="room_name">{propData.config__name}</p>
              <div className="view_room_img">
                <Image src={propData.images.url} fluid/>
              </div>
          </Col>
          <Col md={12} xs={12} className="p-0">
          <div className="prop_tile_cont marker_tile">
            <ul className="facilities_list view_more_facilities">
            {propData.facilities.slice(0, 4).map(facility => (
                <li><img src={"/icons/facilities/"+facility.kind+".svg"} title={facility.name}/> </li>
            ))}
            </ul>
            {
              (!propData.price)?
                <h5 className="prop_rate red">£ {propData.min_price == propData.max_price ? propData.min_price : `${propData.min_price} - ${propData.max_price}`} <span>/week</span></h5>
                :
                <h5 className="prop_rate red">£ {propData.price}<span>/week</span></h5>
            }
          </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
      <style type="text/css">
        {`
            a:hover{
              text-decoration:none;
            }
          `}
      </style>
  </div>
  </a>
)

const ViewRooms = ({propData, link}) => {
  return (

     <div className="view_rooms">
     <Carousel
         additionalTransfrom={0}
         arrows
         autoPlaySpeed={3000}
         centerMode={false}
         className="viewRoomCarousel"
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
             items: 3,
             partialVisibilityGutter: 50
           },
           mobile: {
             breakpoint: {
               max: 464,
               min: 0
             },
             items: 1,
             partialVisibilityGutter: 10
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
         showDots={false}
         sliderClass=""
         slidesToSlide={1}
         swipeable
      >
      {propData.configs.map((value,key) =>{

          if(key >= propData.images.length)
          {
            value.images = propData.images[0];
          }else{
            value.images = propData.images[key];
          }
          value.facilities = propData.apartment_facilities;
          return <ViewRoomTile propData={value} key={key} link={link}/>
      })}
      </Carousel>
      <style type="text/css" jsx>
        {`
          .view_rooms{
              background:#f5f5f5;
              margin:0;
              padding:14px 0 14px 14px;
              margin-top: 14px;
          }
        `}
      </style>
     </div>

    );
  }


export default ViewRooms;
