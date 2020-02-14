import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import fetch from 'isomorphic-unfetch';
import {getSimilarProp} from './urls.js';
import * as urls from './urls.js'

function smallSlides() {
  return [
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' }
  ];
}

function SimilarPropTile({country, city, propData, timeData}) {
    return (
     <div className="similar_prop">
        <Card className="confi_box">
            <Card.Body>
              <Row>
                <Col md={4} xs={12} className="p-0">
                  <Link href={'/'+country+'/'+city+'/'+propData.code} >
                    <a target="_blank" rel="noopener noreferrer">
                    <div className="small_slider">
                        <Carousel>
                            {propData.images.map((image, indx) => (
                            <Carousel.Item key={indx}>
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
                <Link href={'/'+country+'/'+city+'/'+propData.code} >
                  <a target="_blank" rel="noopener noreferrer">
                    <div className="prop_tile_cont mx-3">
                      <p className="rating simi_tile"><b className="pull-right"><img src="/icons/star.svg"/><span className="red">{propData.rating}</span> ({propData.reviews_count})</b></p>
                      <h4 className="prop_head">{propData.name}</h4>
                      <p className="loc" title={propData.address}><img src="/icons/pin.svg"/> {propData.address && propData.address.length> 25 ? propData.address.slice(0, 24) +'...': propData.address}</p>
                      <ul className="facilities_list">
                        {propData.apartment_facilities.slice(0, 4).map((facility,indx) => (
                            <li key={indx}><img src={"/icons/facilities/"+facility.kind+".svg"} title={facility.name}/> </li>
                        ))}
                        <li><h5 className="prop_rate red ml-2">£{propData.min_price} - £{propData.max_price} <span>/week</span></h5></li>
                      </ul>
                      <Row className="justify-content-start">
                        {
                          timeData[propData.code]
                           ?
                          <Col md={9} xs={12} className="p-0">
                            <ul className="dist_list prop_tile_list">
                              <li className="justify-content-center similar_prop_item"><img src="/icons/walk.svg"/> {timeData[propData.code].place_time.walk ? timeData[propData.code].place_time.walk.slice(0, 6) : ''} </li>
                              <li className="justify-content-center similar_prop_item"><img src="/icons/train.svg"/> {timeData[propData.code].place_time.train} </li>
                              <li className="justify-content-center similar_prop_item"><img src="/icons/car.svg"/> {timeData[propData.code].place_time.car} </li>
                            </ul>
                          </Col>
                           :
                          null
                        }
                      </Row>
                      <ButtonToolbar className="similar_prop_btn prop_tile_btns w-100 mt-3">
                        {propData.tags.slice(0, 2).map((tag, indx) => (
                            <Button key={indx} variant="primary" size="lg" className="secondary-btn grey-btn">
                                {tag}
                            </Button>
                        ))}
                          <Button variant="primary" size="lg" className="primary-btn pull-right">
                                View Rooms <span>></span>
                          </Button>
                      </ButtonToolbar>
                    </div>
                  </a>
                </Link>
                </Col>
              </Row>
            </Card.Body>
        </Card>
        <style type="text/css" jsx>
          {`
            .prop_tile_cont{
              height:100%;
              display:flex;
              flex-direction:column;
              justify-content:space-between;
            }
              a{
                text-decoration:none;
                color:white;
              }
              a:hover{
                text-decoration:none;
                color:white
              }
              a:focus{
                outline:none;
              }
              .similar_prop_item{
                line-height:0.6rem;
                font-size:12px;
              }
              @media screen and (min-width:300px) and (max-width:720px)
                {
                  .prop_tile_cont{
                    display:block;
                  }
                }
          `}
        </style>
        </div>

    );
  }

const SimilarProp = ({country, city, propCode}) => {

  const [props,setProps] = useState([]);
  const [timeData, setTimeData] = useState({});
  useEffect(()=>{
    const urlPath = getSimilarProp(city,propCode);
      fetch(urlPath).then((res)=>{
        return res.json();
      }).then((result)=>{
        setProps(result.properties);
      }).catch((error)=>{
          console.log(error);
      });
  },[]);

  useEffect(() => {
if(props.length > 0){
      let codes = props.map(prop => prop.code).join(',');
      fetch(urls.getNearestPlaceDataPath(codes)).then(res => res.json()).then((result) => {
          setTimeData(result.data);
      }).catch((e) => {console.log(e)});
  }},[props]);

  return (<section>
        {!props.length?null:
      <Container>
      <Row>
          <Col md={12} xs={12}>
          <h3 className="list_head">Similar Properties</h3>
          <hr/>
          </Col>
      </Row>
      <Row>
        {props.slice(0, 2).map((prop,indx) => (
            <Col md={6} xs={12} key={indx}>
            <SimilarPropTile country={country} city={city} propData={prop} timeData={timeData}/>
            </Col>
        ))}
      </Row>
      <Row>
        {props.slice(2, 4).map((prop, indx) => (
          <Col md={6} xs={12} key={indx}>
          <SimilarPropTile country={country} city={city} propData={prop} timeData={timeData}/>
          </Col>
        ))}
      </Row>
      <Row className="view_btn">
          <Col md={12} xs={12}>
          <Link href={'/'+country+'/'+city}>
            <Button variant="primary" size="md" className="primary-btn">
            View All >
            </Button>
          </Link>
          </Col>
      </Row>
      </Container>}
  </section>);
}

export default SimilarProp;
