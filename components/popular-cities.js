import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';

function getPopularCities() {
  return [{imageSrc : "/cities/London.jpg", route:'/uk/london', alt:"London", name:"London", description:"Lorem Ipsum is simply dummy text"},
  {imageSrc : "/cities/Glasgow.jpg", route:'/uk/glasgow', alt:"", name:"Glasgow", description:"Lorem Ipsum is simply dummy text"},
  {imageSrc : "/cities/Edinburgh.jpg", route:'/uk/edinburgh', alt:"Edinburgh", name:"Edinburgh", description:"Lorem Ipsum is simply dummy text"},
  {imageSrc : "/cities/Birmingham.jpg", route:'/uk/birmingham', alt:"Birmingham", name:"Birmingham", description:"Lorem Ipsum is simply dummy text"},
  {imageSrc : "/cities/Sheffield.jpg", route:'/uk/sheffield', alt:"Sheffield", name:"Sheffield", description:"Lorem Ipsum is simply dummy text"},
  {imageSrc : "/cities/Nottingham.jpg", route:'/uk/nottingham', alt:"Nottingham", name:"Nottingham", description:"Lorem Ipsum is simply dummy text"}
];
}

const PopularCities = () => {
  return <section>
    <Container fluid className="popular_cities_container">
      <div className="container">
        <div className="col-12 main_heading_margin text-center">
            <h1 className="main_heading font_primary_color">popular cities</h1>
        </div>

        <Row>
          {
            getPopularCities().map((city,index) =>
             <React.Fragment  key={index}>
             <a  href={city.route} className="col-6 col-sm-4 px-xs-1 px-2">
                  {/* <Card> */}
                  <div className="card city-card img-fluid pointer">
                    <img className="card-img-top" src={city.imageSrc} alt="Card image" style={{width:'100%'}} />
                    <div className="card-img-overlay city_text_align">
                    <h4 className="card-title">{city.name}</h4>
                    <p className="card-text">{}</p>
                    </div>
                    </div>
              </a>

                <style type="text/css">{`
                    .city-name {
                      position:absolute;
                      top :10px;
                      z-index:1;
                      color: #ffffff;
                    }
                    .city-description: {
                      position:absolute;
                      top:15px;
                      z-index:1;
                      color: #ffffff;
                    }
                    .city-card {
                        border-radius:2px;
                        margin-bottom:30px;
                    }
                    .card-img {
                      padding:0px !important;
                      margin:0px !important;
                    }
               `}
               </style>
               </React.Fragment>
     //   </Col>
            )
          }
               </Row>

      </div>
    </Container>
    <style type="text/css">{`
      .card{
        border: 1px solid transparent;
      }
      .card-title{
        font-family: 'Conv_clarika-grot-bold';
        color:#fff;
        text-shadow: 1px 1px black
      }

      .card-img-overlay{
        padding: 1.2rem;
        background-color: #5f3d3a2b;

      }


      .card-img-overlay:hover{
        background-color: #211413b5;
        transition: .3s ease-in-out;
      }
      .card-text{
        font-family: 'Conv_clarika-grot-regular';
        color:#fff;
      }

      .card-title{
        margin-bottom: 0rem;
      }

      .city_text_align{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-end;
      }

      @media only screen and (min-width: 320px) and (max-width: 575px) {
        .card-title{
          font-size:16px;
        }

        .card-text{
          font-size: 14px;
          line-height: 1;
        }

        .popular_cities_container{
          padding:0;
        }
        .city-card{
          margin-bottom:0px;
        }
        .container{
          max-width:100% !important;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 575px) {
      .card-img-overlay{
        padding: 0.4rem;
      }

  }

      `}
    </style>

    </section>
}

export default PopularCities;
