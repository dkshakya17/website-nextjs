import React, { useState } from 'react';
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

const ListingMarker = (props) => {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
    <React.Fragment>
    <div className="list_marker" onClick={()=> {props.drawPathToCenter(props.place.location);}}  onMouseOver={()=> {setShowToolTip(true);}} onMouseLeave={()=>{setShowToolTip(false);}}>
       <div className="marker_text">£{props.place.min_price}</div>
      {(props.hoveredCode == props.text || showToolTip)?
        <Card className="confi_box marker_box m-0">
        <Card.Body>
        <Row>
            <Col md={12} xs={12} className="p-0">
                <div className="small_slider">
                <Carousel>
                {props.place.images.slice(0,5).map(sli => (
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
                    <h4 className="prop_head">{props.place.name}</h4>
                    <h5 className="prop_rate red">£{props.place.min_price} - £{props.place.max_price}<span>/week</span></h5>
            </div>
            </Col>
        </Row>
        </Card.Body>
    </Card>
    : null}
   </div>
   </React.Fragment>
    );
  };

  export default ListingMarker;
