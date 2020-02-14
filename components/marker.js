import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";


function smallSlides() {
  return [
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' },
      { src: '/list-images/list-slide.png' }

  ];
  }

const Marker = (props) => {
    return (
      <div className="marker" >
      <Card className="confi_box m-0">
            <Card.Body>
            <Row>
                <Col md={12} xs={12} className="p-0">
                    <div className="small_slider">
                    <Carousel>
                    {props.images.map(sli => (
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={sli.url}
                            alt="First slide"
                            />

                        </Carousel.Item>
                        ))}

                        </Carousel>
                    </div>
                </Col>
                <Col md={12} xs={12}>
                <div className="prop_tile_cont marker_tile">
                    {/* <p className="rating simi_tile">Shared Room <b className="pull-right"><img src="/icons/star.svg"/><span className="red">4.5</span> (123)</b></p> */}
                    <h4 className="prop_head">{props.name}</h4>
                    <h5 className="prop_rate red">£{props.min_price} - £{props.max_price} <span>/week</span></h5>

                </div>

                </Col>


            </Row>

            </Card.Body>
        </Card>
    </div>
    );
  };

  export default Marker;
