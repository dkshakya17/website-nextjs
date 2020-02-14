import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";


// function reviewTiles() {
//   return [
//       { src: '/list-images/list-slide.png' , name: 'Priya', 
//         review: 'loLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the in the standard dummy text ever since the 1500s.',
//         date:'11 Dec 2019'
//       }
      
//   ];
//   }
  
function ReviewTile (props) {
    return (
     <div className="review_item">
        <Card className="review_card">
            <Card.Body>
            <Row>
                <Col md={8} xs={8}>
                   <div className="review_cont">
                    <p className="date">{props.date}</p>
                    <p>{props.review}</p>
                    <h5>{props.name}</h5>
                    </div>
                </Col>
                <Col md={4} xs={4}>
                
                 <div className="reviw_img">
                 <img
                            className="d-block w-100"
                            src={props.src}
                            alt="First slide"
                            />
                 </div>
             </Col>
                 
            </Row>

            </Card.Body>
        </Card>
        </div>
        

    );
  }  

  
export default ReviewTile;