import React from "react";
import axios from 'axios';

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import * as urls from '../components/urls';

import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide:1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
      slidesToSlide:1,
      partialVisibilityGutter: 30
    },
  };

const CITIES = [
    {id:"london", name:"London"},
    {id:"glasgow", name:"Glasgow"},
    {id:"nottingham", name:"Nottingham"},
    {id:"manchester", name:"Manchester"},
    {id:"sheffield", name:"Sheffield"},
    {id:"liverpool", name:"Liverpool"},
    {id:"coventry", name:"Coventry"},
    {id:"chester", name:'Chester'},
];


const DEFAULTACTIVEKEY = 'london';
function onClick() {

}

const PropertyCard = ({property, index, country, city}) => {
  var addr = ''
  if(property.address) {
      addr = property.address;
      property.address = property.address.length> 25 ? property.address.slice(0, 24) +'...': property.address;
  }
  return <React.Fragment key={index}>
    <a href={`/${country}/${city}/${property.code}`}>
    <div className="popular_property_card pointer">
        <div>
           <div className='background-image property_img' style ={ { backgroundImage: `url(" ${property.image? property.image: './house1.png'}")` } }></div>
            {/* <Image src={property.image || './house1.png'} alt={property.name} className="popular_prop_image" fluid /> */}
            <p className="font_primary_color card_heading my-2">{property.name}</p>
            <p className="card_sub_heading" title={addr}>{property.address}</p>
        </div>

        <div className="price_text_align">
            <div className="d-flex">
            {
                property.facilities.slice(0, 3).map((facility)=> {
                    return  <div>
                        <Image className="mr-2 pc_icon_size" src={'/icons/facilities/'+facility+'.svg'} alt={facility} title={facility}/>
                  </div>
                })
            }

            </div>
            <div>
               <h1 className="price_text">£{property.price}/ <span className="weeks_font">week</span> </h1>
            </div>
        </div>

    </div>
    <div className="popular_property_bottom_card  mb-5">
    <p className="property_address_text">{property.landmark}</p>
        <div className="mt-2 price_text_align">
            {property.time.walk && <div className="d-flex align-items-center">
                <img className="mr-2 svg20" src="/icons/facilities/walk.svg" alt="" />
                <p className="property_address_text font_primary_color">{property.time.walk.slice(0, 6)}</p>
            </div>}

            {property.time.car && <div className="d-flex align-items-center">
                <img className="mr-2 svg20" src="/icons/facilities/Cab.svg" alt="" />
                <p className="property_address_text font_primary_color">{property.time.car}</p>
            </div>}

            {property.time.train && <div className="d-flex align-items-center">
                <img className="mr-2 svg20" src="/icons/facilities/Train.svg" alt="" />
                <p className="property_address_text font_primary_color">{property.time.train}</p>
            </div>}
        </div>
    </div>
</a>
<style type="text/css" jsx>{`
    a:hover{
      text-decoration:none;
    }
    a:focus{
      outline:none;
    }
    .card_heading{
        font-size: 18px;
        font-family: 'Conv_clarika-grot-bold';
        margin-bottom: 0px;
        height: 3rem ;
        line-height:1.5rem;
        /* min-height: 54px; */
    }

    .property_img {
        width:100%;
        height:200px;
        background-size:cover;
    }

    .popular_property_bottom_card img{
        width:20px;
    }
    .popular_property_card {
        width: 95%;
        background-color: #fff;
        min-height: 347px;
        box-shadow:3px 4px 30px -13px #c3c0bda8;
        border-top-right-radius: 12px;
        border-bottom-left-radius: 12px;
        padding: 10px;
    }
    .popular_property_bottom_card{
        background-color: #c7c7c742;
        min-height: 50px;
        padding: 10px;
        width: 95%;
    }

    .col {
        flex-basis:1!important;
    }

    .nav-pills .nav-item .nav-link {
        border-radius: .25rem;
        font-size: 18px;
        font-family: 'Conv_clarika-grot-regular';
        border: 1px solid #f05c4e;
        color:#f05c4e;
        margin: 10px;
    }

    .nav-pills .nav-item .nav-link.active {
        background-color:#f05c4e!important;
        color:white!important;
    }

    .react-multi-carousel-item {
        transform-style: preserve-3d;
        backface-visibility: hidden;
        width:100%;
    }



    .weeks_font{
      font-size: 18px;
      color: #f05c4e;
      font-family: 'Conv_clarika-grot-regular';
      margin-bottom: 0px;
    }


    .price_text_align{
          display: flex;
          justify-content: space-between;
          align-items: center;
      }
    .property_address_text{
        font-size: 12px;
        font-family: 'Conv_clarika-grot-regular';
        margin-bottom: 0px;
    }

    .tab_width{
        width: 100%;
    }
    @media only screen and (min-width: 320px) and (max-width: 575px){
        .nav{
            flex-wrap: nowrap;
            overflow-x: auto;
        }
    }
    img {
        width: 20px;
    }
    `}
    </style>
   </React.Fragment>
}


export const CustomRightArrow = ({onClick}) => (
    <React.Fragment>
      <Button  className="primary_color sd_btn_right" onClick={() => onClick()}>
         <Image src="/rightArrow.png" alt="" />
     </Button>
     <style type="text/css"> {`
     .sd_btn_right{
      position: absolute;
      right: -50px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 2px 4px 16px 0px #eac7a2a8;
      border: 1px solid transparent;
      line-height: 1;
    }

    .sd_btn_right:hover{
      background-color: #fff;

      }
   .sd_btn_right:focus{
    background-color: #ffff;

    }
  `}

       </style>
     </React.Fragment>
     )

export const CustomLeftArrow  = ({onClick}) => (
    <React.Fragment>
    <Button  className="primary_color sd_btn_left" onClick={() => onClick()}>
       <Image src="/leftArrow.png" alt="" />
   </Button>

   <style type="text/css"> {`
     .sd_btn_left{
      position: absolute;
      left: -50px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 2px 4px 16px 0px #eac7a2a8;
      border: 1px solid transparent;
      line-height: 1;
    }

    .sd_btn_left:hover{
      background-color: #fff;

      }
   .sd_btn_left:focus{
    background-color: #ffff;
    }
  `}

  </style>
   </React.Fragment>
     )



export default class PopularProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           properties: [],
           cities: CITIES,
           city: '',
           country: '',
           resData:{}
        }

        this.renderSelectedCity.bind(this);
    }

    componentDidMount() {
       this.renderSelectedCity(DEFAULTACTIVEKEY);
    }

    renderSelectedCity(key) {
          if(this.state.resData[key] !== undefined){
            let storeData = this.state.resData[key];
            this.setState({properties:storeData.properties,city:storeData.city, country:storeData.country});
          }else{
            let popularPropertiesUrl = urls.getPopularPropsPath(key);
            axios.get(popularPropertiesUrl).then((res)=> {
            let tempStoreData = this.state.resData;
            tempStoreData[key] = res.data;
            this.setState({
                   cities: CITIES,
                   properties :res.data.properties,
                   city: res.data.city,
                   country: res.data.country,
                   resData:tempStoreData
              });

            }).catch((err)=> {
                console.log("error",err);
            });
        }
       this.Carousel.goToSlide(0, true);
    }

    render() {
    const id = null;
    return <section>
    <Container fluid>
        <Container id="explore">
            <div className="col-12 main_heading_margin text-center">
                <h1 className="main_heading font_secondary_color">popular properties</h1>
            </div>
            <Tab.Container id="city-tab" defaultActiveKey="london" activeKey={this.state.city}>

                    <Nav variant="pills" className="flex-row tab_width">
                    {
                        this.state.cities.map((city,index)=>(
                            <Nav.Item key={index+city.id}>
                                <Nav.Link eventKey={city.id} onSelect={()=>this.renderSelectedCity(city.id) }>{city.name}</Nav.Link>
                            </Nav.Item>
                        ))
                    }
                    </Nav>

                    <Col className="p-0">
                        <Tab.Content className="mt-4">
                        {
                                <Carousel responsive={responsive}
                                 customLeftArrow={<CustomLeftArrow onClick={onClick}/>}
                                 customRightArrow={<CustomRightArrow onClick={onClick}/>}
                                 removeArrowOnDeviceType={["tablet", "mobile"]}
                                 transitionDuration={10}
                                 ref={el => (this.Carousel = el)}
                                 autoPlay={false}
                                 autoPlaySpeed={3000}
                                 partialVisible={true}

                                 itemClass="carousel-item-padding-100-px">
                                 {
                                        this.state.properties.map((property, key)=>(
                                         <PropertyCard property={property} key={key+this.state.city} country={this.state.country} city={this.state.city} />
                                     ))
                                 }
                                 </Carousel>
                        }
                        </Tab.Content>
                    </Col>

            </Tab.Container>
            <div className="explore">
            {/* <Button className="explore_home_btn">explore all homes</Button> */}
              <Button className="explore_home_btn"  href={`/uk/${this.state.city}`}> explore all homes</Button>
            </div>

        </Container>
    </Container>
    <style type="text/css">{`
    .explore_home_btn {
        background-color: #101a42;
        font-size: 18px;
        color: #fff;
        font-family: 'Conv_clarika-grot-regular';
        margin: 10px;
    }

    .explore_home_btn:hover{
        background-color: #101a42;
    }

    .explore {
        text-align: center;
    }

    .popular_property_card {
        width: 95%;
        background-color: #fff;
        min-height: 200px;
        box-shadow:3px 4px 30px -13px #c3c0bda8;
        border-top-right-radius: 12px;
        border-bottom-left-radius: 12px;
        padding: 10px;
    }

    .popular_property_bottom_card{
        background-color: #c7c7c742;
        min-height: 50px;
        padding: 10px;
        width: 95%;

    }

    .col {
        flex-basis:1!important;
    }

    .pc_icon_size {
        width: 25px;
    }

    .nav-pills .nav-item .nav-link {
        border-radius: .25rem;
        font-size: 18px;
        font-family: 'Conv_clarika-grot-regular';
        border: 1px solid #f05c4e;
        color:#f05c4e;
        margin: 10px;
    }

    .nav-pills .nav-item .nav-link.active {
        background-color:#f05c4e!important;
        color:white!important;
    }

    .react-multi-carousel-list {
        position:inherit;
    }

      .react-multi-carousel-item {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          width:100%;
      }

    .price_text{
        font-size: 18px;
        color: #f05c4e;
        font-family: 'Conv_clarika-grot-bold';
        margin-bottom: 0px;
    }

    .weeks_font{
        font-size: 18px;
        color: #f05c4e;
        font-family: 'Conv_clarika-grot-regular';
        margin-bottom: 0px;
    }

    .price_text_align{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .property_address_text{
        font-size: 12px;
        font-family: 'Conv_clarika-grot-regular';
        margin-bottom: 0px;
    }

    @media only screen and (min-width: 320px) and (max-width: 991px){
        .nav{
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .popular_property_card {
            width: 100% !important;

        }
        .popular_property_bottom_card{
            width: 100% !important;
        }
        .carousel-item-padding-100-px{
          padding:0 0.2rem;
        }

    }
    `}
    </style>
</section>;
    }
}
