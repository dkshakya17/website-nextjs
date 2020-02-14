import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Link from 'next/link';
import Badge from 'react-bootstrap/Badge'
import ViewRooms from '../components/ViewRooms';


function smallSlides() {
  return [
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' },
    { src: '/list-images/list-slide.png' }

  ];
}

function CityListingTile({ country, city, propData, handleModal, nearestData}) {
  const [show, setShow] = useState();
  const [open, setOpen] = useState(false);

  const addParamToData = (data) => {
    data.country = country;
    data.city = city;
    return data;
  }
  const viewRoomType = () => {
    setShow(true);
  }

  const hidden = {visibility: 'hidden'};
  if (!nearestData) {
    nearestData = {'place_time': {car: '', train: '', walk: ''}, 'place_name': ''};
  } 
  let time = {
    car: nearestData.place_time.car ? nearestData.place_time.car.slice(0, 6) : '',
    train: nearestData.place_time.train ? nearestData.place_time.train.slice(0, 6) : '',
    walk: nearestData.place_time.walk ? nearestData.place_time.walk.slice(0, 6) : '',
  }
  let place_name = nearestData.place_name ? `From ${nearestData.place_name}` : ``;

  return (
    <div className="similar_prop city_properties">
      <Card className="confi_box">
        <Card.Body>
          <Row>
            <Col md={4} xs={12} className="p-0">
              <Link href={'/' + country + '/' + city + '/' + propData.code}>
                <a rel="noopener noreferrer" target="_blank">
                  <div className="small_slider">
                    <Carousel>
                      {propData.images.map(image => (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={image.url}
                            alt={image.caption}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <h2 className="disc">Free Bedding Pack</h2>
                </a>
              </Link>
            </Col>
            <Col md={8} xs={12}>
              <div className="prop_tile_cont mx-3">
                <Link href={'/' + country + '/' + city + '/' + propData.code} >
                  <a rel="noopener noreferrer" target="_blank">
                    <div className="d-flex justify-content-between">
                      <p className="rating simi_tile"><b><img src="/icons/star.svg" /><span className="red">{propData.rating}</span> ({propData.reviews_count})</b></p>
                    </div>
                    <h4 className="prop_head">{propData.name}</h4>
                    <p className="loc" title={propData.address}><img src="/icons/pin.svg" /> {propData.address && propData.address.length> 40 ? propData.address.slice(0, 37) +'...': propData.address}</p>
                    <Row className="justify-content-xs-between justify-content-sm-start">
                      <Col xs={6} className="p-0">
                        <ul className="facilities_list">
                          {propData.apartment_facilities.slice(0, 4).map(facility => (
                            <li><img src={"/icons/facilities/" + facility.kind + ".svg"} title={facility.name} /> </li>
                          ))}
                        </ul>
                      </Col>
                      <Col xs={6} className="d-block d-sm-none p-0">
                        <Link href={'/' + country + '/' + city + '/' + propData.code}><a rel="noopener noreferrer" target="_blank"><h5 className="prop_rate red ml-2">{propData.min_price == propData.max_price ? `£${propData.min_price}` : `£${propData.min_price} - £${propData.max_price}`} <span>/week</span></h5></a></Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7} xs={12} className="p-0">
                        <ul className="dist_list prop_tile_list" title={place_name}>
                          <li className={`justify-content-center mr-2 ${time.train || 'invisible'}`}><img src="/icons/train.svg"/> {time.train} </li>
                          <li className={`justify-content-center mr-2 ${time.car || 'invisible'}`}><img src="/icons/car.svg"/> {time.car} </li>
                          <li className={`justify-content-center mr-2 ${time.walk || 'invisible'}`}><img src="/icons/walk.svg"/> {time.walk} </li>
                        </ul>
                      </Col>
                      <Col md={5} xs={12} className="d-none d-sm-block p-md-0 p-lg-0 p-xl-0">
                        <h5 className="prop_rate red ml-2">{propData.min_price == propData.max_price ? `£${propData.min_price}` : `£${propData.min_price} - £${propData.max_price}`} <span>/week</span></h5>
                      </Col>
                    </Row>
                  </a>
                </Link>
                <Row className="align-items-end">
                    <Col className="d-sm-block">
                        <a rel="noopener noreferrer" target="_blank" href={'/'+country+'/'+city+'/'+propData.code}>
                          {propData.tags.slice(0, 2).map(tag => (
                            <Badge pill variant="primary" className="prop_badge">
                                {tag}
                            </Badge>
                          ))}
                        </a>
                    </Col>
                    <Col>
                      <ButtonToolbar className="prop_tile_btns w-100 justify-content-end">
                          <Button variant="primary" size="lg" className="primary-btn pull-right" onClick={() => handleModal(addParamToData(propData))}>
                                Enquire
                          </Button>
                          <Button variant="primary" size="lg" className="primary-btn pull-right d-none d-sm-block" onClick={() => setShow(!show)} >
                            {show?'Hide Rooms':'View Rooms'}<span className={`custom_css_arrow  ${show?'rotate_arrow':''}`}></span>
                          </Button>
                      </ButtonToolbar>
                    </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {show &&

        <ViewRooms propData={propData} link={'/' + country + '/' + city + '/' + propData.code} />

        }
        <hr/>
          <style type="text/css" jsx>{`
            .custom_css_arrow{
              border: solid white;
              border-width: 0 3.4px 3.4px 0;
              display: inline-block;
              padding: 1.8px;
              transform: rotate(-135deg);
              margin-left: 5px;
              margin-right: -4px;
              transition:transform 0.5s;
            }
            .rotate_arrow{
                transform:rotate(40deg);
                margin-bottom:2px;
                transition:transform 0.5s;
            }

            a:hover{
              text-decoration:none;
              color:white;
            }
            a:focus{
              outline:none;
            }
            a{
              color:white;
            }
            .view_rooms_btn_city {
              padding:10px 15px;
            }
            .confi_box{
              padding:0 0 1rem 0;
            }

            
            /* The checkbox_wrapper */
            .checkbox_wrapper {
              display: block;
              position: relative;
              padding-left: 35px;
              margin-bottom: 12px;
              cursor: pointer;
              font-size: 22px;
              z-index:1;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }

            /* Hide the browser's default checkbox */
            .checkbox_wrapper input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;
            }

            /* Create a custom checkbox */
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              height: 25px;
              width: 25px;
              border: 1px solid #19c45d;
              border-radius: 6px;
            }

            /* On mouse-over, add a grey background color */
            .checkbox_wrapper:hover input ~ .checkmark {
              background-color: #fff;
            }

            /* When the checkbox is checked, add a blue background */
            .checkbox_wrapper input:checked ~ .checkmark {
              background-color: #fff;
            }

            /* Create the checkmark/indicator (hidden when not checked) */
            .checkmark:after {
              content: "";
              position: absolute;
              display: none;
            }

            /* Show the checkmark when checked */
            .checkbox_wrapper input:checked ~ .checkmark:after {
              display: block;
            }

            /* Style the checkmark/indicator */
            .checkbox_wrapper .checkmark:after {
              left: 9px;
              top: 5px;
              width: 5px;
              height: 10px;
              border: solid #19c45d;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
            input:checked ~ .content{
              background-color: #19c45d;
            }

            .content{
            min-width: 300px;
            height: 50px;
            position: absolute;
            top: -10px;
            z-index: -1;
            left: -50px;
            background-color: #fff;
            border:1px solid #19c45d;
            border-radius: 6px;
            }
            
            .content:hover{
            background-color: #d6f1e0;
            }
            `}
      </style>
    </div>


  );
}


export default CityListingTile;
