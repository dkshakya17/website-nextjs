import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Carousel from "react-bootstrap/Carousel";
import Nav from 'react-bootstrap/Nav';
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import axios from 'axios';
import * as urls from '../components/urls';

import { getDirectionRoute } from './MapHelper';
import Select from "react-select"; // v1
import "react-select/dist/react-select.css";
import Form from "react-bootstrap/Form";

const PlaceMarker = (props) => (
  <div className="facility_tooltip">
    <img className="place_marker" src={props.data.icon} width="20px" height="20px" />
    <span className="tooltiptext university"> {props.data.name} </span>
  </div>
)

const PropertyLocationMarker = (props) => {
  const [showToolTip, setShowToolTip] = useState(false);
  return  <React.Fragment>
    <div className="list_marker"  onMouseOver={()=> {setShowToolTip(true);}} onMouseLeave={()=>{setShowToolTip(false);}}>
       <div className="marker_text">£{props.data.min_price}</div>
    {showToolTip?
        <Card className="confi_box marker_box m-0">
         <Card.Body>
        <Row>
            <Col md={12} xs={12} className="p-0">
                <div className="small_slider">
                <Carousel>
                {props.data.images.map(sli => (
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
                    <h4 className="prop_head">{props.data.name}</h4>
                    <h5 className="prop_rate red">£{props.data.min_price} - £{props.data.max_price}<span>/week</span></h5>
            </div>
            </Col>
        </Row>
        </Card.Body>
        </Card>
    : null}
    </div> 
    </React.Fragment>
 }

class LocationMap extends Component {

  static defaultProps = {
    loc: {
      lat: 12.971599,
      lng: 77.594566,
    },
    zoom: 11,
    name: 'Property',
  };

  constructor(props) { 
    super(props);
    this.state = {
      universities: [], 
      university: '',
      map: {},
      maps: {},
      university_location:{lat: 51.5182, lng: 0.1411},
      mapLoaded: false,
      showPlaces: false,
      places:[],
      selectedFactility: 'university', // change it
      walkLine: null,
      transitLine: null,
      drivingLine: null,
      walk_legs: { time: '', distance: '' },
      transit_legs: { time: '', distance: '' },
      driving_legs: { time: '', distance: '' },
    }
  }

  center = () => {
    return <img width="45px" height="45px"  src="/location.svg" {...location} />
  }

  componentDidMount() { 
    const url = urls.getUniversities(this.props.data.city);
    // call api to get universities data.
    axios.get(url).then((res)=>{
      let universities =  JSON.parse(JSON.stringify(res.data.places));
      this.setState({universities: universities});
    }).catch((err)=> {
      console.log(err);
    })
  }

  static defaultCenter = {'lat': 51.5073509, 'lng': -0.1277583};
 
  cleanUpRoute = () => {
    if (this.state.walkLine) {
      this.state.walkLine.setMap(null);
    }
    if (this.state.transitLine) {
      this.state.transitLine.setMap(null);
    }
    if (this.state.drivingLine) {
      this.state.drivingLine.setMap(null);
    }
  }

  universityMarker = (university) => {
    return <div class="university_tooltip" {...university.location}>
      <img className="cityCenterMarker" src="/icons/facilities/University.svg" />
      <span class="university_name distance_text">{university.name}</span>
    </div>
  }

  drawPathToUniversity (code) {
    if(this.state.mapLoaded && this.state.maps) {
      let university = this.state.universities.filter((university)=> {
       return university.code == code;
      });

      this.setState({university: university[0]});  

      let origin = new this.state.maps.LatLng(this.props.data.location.lat, this.props.data.location.lng);
      let destination = new this.state.maps.LatLng(university[0].location.lat, university[0].location.lng);

      getDirectionRoute(this.state.maps, this.state.map, origin, destination).then((routes) => {
        // cleanup old data
        this.cleanUpRoute();

        routes.map((route) => {
          if (route.travelMode == this.state.maps.DirectionsTravelMode.DRIVING) {
            this.setState({ drivingLine: route.line, driving_legs: route.legs });
          }
          else if (route.travelMode == this.state.maps.DirectionsTravelMode.TRANSIT) {
            this.setState({ transitLine: route.line, transit_legs: route.legs });
          }
          else if (route.travelMode == this.state.maps.DirectionsTravelMode.WALKING) {
            this.setState({ walkLine: route.line, walk_legs: route.legs });
          }
        })
      })

    }
  } 
 
  showFacilityPlaces = (type) => {
    // TODO: right now, icon is not as per requested in the response, get the right icons and put it place.
    if(this.state.mapLoaded) {
      let pyrmont = new this.state.maps.LatLng(this.props.data.location.lat, this.props.data.location.lng);

      let request = {
        location: pyrmont,
        radius: '50000',
        type: [type]
      };
    
      let service = new this.state.maps.places.PlacesService(this.state.map);
      service.nearbySearch(request, (results, status) => {
       if (status === 'OK') {
       let places =  JSON.parse(JSON.stringify(results));
        this.setState({places: places});
        }
        else {
         console.error(`can not fetch ${type}`);
        }
      })
    }
  
  }
 
  render() {
    const places =  this.state.places.map((place, index)=> {  
      return <PlaceMarker data={place} key={index} {...place.geometry.location} />
    })

    places.push(<PropertyLocationMarker data={this.props.data} {...this.props.data.location}/>);
    if(this.state.university) {
      places.push(this.universityMarker(this.state.university));
    }

    const options = this.state.universities.map((university, index) => {
      return {
         label: university.name,
         value: university.code, 
      }
    }) 

    //let gmapKey = process.env.NODE_ENV == 'development' ? '' : "AIzaSyAib9zXwRsLDWAa0oEpMwqJYPjP5RR8U4M";
    let gmapKey = "AIzaSyAib9zXwRsLDWAa0oEpMwqJYPjP5RR8U4M";
    
    return (
      <React.Fragment>
      <Container>
      <Row>
          <Col md={12} xs={12}>
          <h3 className="list_head"> Location</h3>
              <hr/>
              <div id="wrapper">
                <div id="google_map">
                  <div style={{ height: '450px', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: gmapKey, libraries: ['places']}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    defaultCenter={this.props.data.location}
                    defaultZoom={this.props.zoom}
                    onGoogleApiLoaded={({map, maps}) =>  this.setState({map: map, maps: maps, mapLoaded: true})}
                    > 
                      {places}
                    </GoogleMapReact>
                  </div>
                </div>
                <div id="travel_map">
                  <Card className="">
                    <Card.Body className="university_card">
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Distance to university:</Form.Label>
                        <Select 
                        name="university"
                        placeholder="Enter university"   
                        isMulti={false}
                        isSearchable
                        value={this.state.university.code}
                        options={options}
                        onChange={(val) => { if(val){this.drawPathToUniversity(val.value);} }}
                        />
                      </Form.Group>  
                    </Form.Row>
                    {this.state.university !=''?
                      <Row>
                      <ul className="dist_list prop_tile_list prop_time distance_list ml-2 mr-2">
                          <li className="walk_border tooltiptext">
                            <img className="" src={"/icons/walk.svg"} title="walk"/> {`${this.state.walk_legs.distance} (${this.state.walk_legs.time})`}  
                          </li>
                          <li className="train_border tooltiptext">
                            <img className="" src={"/icons/train.svg"} title="train"/>  {`${this.state.transit_legs.distance} (${this.state.transit_legs.time})`}  
                          </li>
                          <li className="car_border tooltiptext">
                            <img className="" src={"/icons/car.svg"} title="car"/> {`${this.state.driving_legs.distance} (${this.state.driving_legs.time})`}  
                          </li>
                      </ul>
                      </Row> :null
                  }
                    
                    </Card.Body>
                  </Card>  
                </div>
                <div id="facilities_map" onClick={this.showFacilityPlaces}>
                  <Nav className="flex-column"> 
                    <Nav.Item className="icon_university facility_tooltip" onClick={()=>{this.showFacilityPlaces("university");}}>
                      <span class="tooltiptext">{'university'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_publictransport facility_tooltip" onClick={()=>{this.showFacilityPlaces("transit_station");}}>
                      <span class="tooltiptext">{'transport'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_restaurant facility_tooltip" onClick={()=>{this.showFacilityPlaces("restaurant");}}>
                      <span class="tooltiptext">{'restaurant'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_banks facility_tooltip" onClick={()=>{this.showFacilityPlaces("bank");}}>
                      <span class="tooltiptext">{'bank'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_bar facility_tooltip" onClick={()=>{this.showFacilityPlaces("bar");}}>
                      <span class="tooltiptext">{'bar'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_store facility_tooltip" onClick={()=>{this.showFacilityPlaces("shopping_mall");}}>
                      <span class="tooltiptext">{'store'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_cafe facility_tooltip" onClick={()=>{this.showFacilityPlaces("cafe");}}>
                      <span class="tooltiptext">{'cafe'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_medical facility_tooltip"  onClick={()=>{this.showFacilityPlaces("hospital");}}>
                      <span class="tooltiptext">{'medical'}</span>
                    </Nav.Item>
                    <Nav.Item className="icon_gym facility_tooltip" onClick={()=>{this.showFacilityPlaces("gym");}}>
                    <span class="tooltiptext">{'gym'}</span>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>      
          </Col>
      </Row>
  </Container>
  <style> {`
  #wrapper {
     position: relative; 
  }

  .prop_time {
    margin: 0px 10px;
  }

  .distance_list {
    flex-direction:column;
    padding-left:10px;
    font-size:12px;
  }

.walk_border{
  border-bottom: 1px solid #054d7f;
}

.train_border{
  border-bottom: 1px solid #f05c4e;
}

.car_border{
  border-bottom: 1px solid #000000;
}

  #travel_map {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    width: 200px;
    height: 116px;
    z-index: 99;
  }

  .university_card{
    color: #054d7f;
    padding:1rem!important;
  }
 
  #travel_map div {
    margin-top: 0px !important;
  } 

  #facilities_map { 
    position: absolute;
    top: 11px;
    right: 10px;
    background-color: white;
    width: 40px;
    height: 325px;
    z-index: 99;
  }

  .icon_university, .icon_publictransport, .icon_restaurant, .icon_banks, .icon_store, .icon_cafe, .icon_medical, .icon_gym,.icon_bar {
    background-image: url("/icons/map-stripe.svg"); 
    background-repeat: no-repeat;
    background-size: cover;
    width: 36px;
    height:36px;
  }
  
  .icon_university {
    background-position: 0px 0px;
  }

  .icon_publictransport {
    background-position: 0px -35px;
  }

  .icon_restaurant {
    background-position: 0px -71px;
  }

  .icon_banks {
    background-position: 0px -115px;
  }

  .icon_bar {
    background-position: 0px -150px;
  }

  .icon_store {
    background-position: 0px -190px;
  }

  .icon_cafe{ 
    background-position: 0px -230px;
  }
  
  .icon_medical {
    background-position: 0px -266px;
  } 
  
  .icon_gym  {
    background-position: 0px -305px;
  }

  .facility_tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltiptext { 
    font-size: 12px!important;
    font-family: 'Conv_clarika-grot-regular';
    color: #000000!important;
   }

  .facility_tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #ffffff;
    color: #000000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    left: -180%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .facility_tooltip .university {
     bottom:25px !important;
     left:15px;
  }

  .facility_tooltip .university::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20;
    right: 53px;
    margin: 0 auto;
    width: 10;
    height: 0;
    border-top: solid 10px white;
    border-left: solid 12px transparent;
    border-right: solid 12px transparent;
  }
    
  .facility_tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

   .gm-fullscreen-control {
    top: 376px !important;
    right: 57px !important;
  }

  .university_tooltip {
    position: relative;
    display: inline-block; 
  }
  
  .university_tooltip .university_name {
    visibility: hidden;
    width: 120px;
    background-color: white;
    color: #000000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  
    /* Position the tooltip */
    position: absolute;
    z-index: 9999;
    bottom: 8.5vh;
    left: -55px;
  }

  .university_tooltip .university_name:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20;
    right: 53px;
    margin: 0 auto;
    width: 10;
    height: 0;
    border-top: solid 10px white;
    border-left: solid 12px transparent;
    border-right: solid 12px transparent;
  }
  
  .university_tooltip:hover .university_name {
    visibility: visible;
  }


  
@media only screen and (min-width: 320px) and (max-width: 991px){
  #facilities_map{
      display: none;
    }

    #travel_map{
      display: none;
    }

  }
`}
</style> 
</React.Fragment>
    );
  }
}

export default LocationMap;
