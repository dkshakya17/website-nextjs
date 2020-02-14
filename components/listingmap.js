import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ListingMarker from './ListingMarker';
import { getDirectionRoute } from './MapHelper';

class ListingMap extends Component {
  static defaultProps = {
    zoom: 12,
    name: 'Property',
  };

  constructor(props) {
    super(props);
    this.state = {
      map: {},
      maps: {},
      mapLoaded: false,
      showRoute: false,
      properties: null,
      walkLine: null,
      transitLine: null,
      drivingLine: null,
      walk_legs: { time: '', distance: '' },
      transit_legs: { time: '', distance: '' },
      driving_legs: { time: '', distance: '' },
      location: this.props.location
    }
  }

  componentDidUpdate() {
    // A hack for bounding for the first time. this can not happen without this check, otherwise componentDidUpdate
    // will bound it again for all the markers after route display map bound.
    if (!this.state.properties) {
      this.updateMapBounds();
      this.setState({ properties: this.props.properties });
    }
  }

  updateMapBounds = () => {
    if (this.state.mapLoaded && this.state.map) {
      let bounds = new this.state.maps.LatLngBounds();
      this.props.properties.map((place) => {
        var latLng = new this.state.maps.LatLng(place.location.lat, place.location.lng);
        bounds.extend(latLng);
      });

      let centerLocationLatLng = new this.state.maps.LatLng(this.props.location.lat, this.props.location.lng);
      bounds.extend(centerLocationLatLng);
      this.state.map.fitBounds(bounds);

      this.state.maps.event.addDomListenerOnce(this.state.map, 'idle', () => {
        this.state.maps.event.addDomListener(window, 'resize', () => {
          this.state.map.fitBounds(bounds);
        })
      });
    }
  }

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

  componentWillReceiveProps(nextProps) {
    if (this.props.properties !== nextProps.properties) {
      this.cleanUpRoute();
      this.updateMapBounds();
      this.setState({ showRoute: false });
    }

    let centerPlace = nextProps.properties.filter((property) => property.code == nextProps.hoveredCode);
    if (centerPlace.length > 0) {
      this.setState({ location: centerPlace[0].location });
    }
  }  

  drawPathToCenter = (location) => {
    if (this.state.mapLoaded) {
      let origin = new this.state.maps.LatLng(location.lat, location.lng);
      let destination = new this.state.maps.LatLng(this.props.location.lat, this.props.location.lng);

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

      this.setState({ showRoute: true })
    }
  }

  render() {
    let places = null;

    const center = () => {
      if (this.props.type === "city") {
        return <img className="cityCenterMarker" src="/location.svg" {...this.props.location} />
      }

      return <div class="university_tooltip" {...this.props.location}>
        <img className="cityCenterMarker" src="/icons/facilities/University.svg" />
        <span class="university_name distance_text">{this.props.place_name}</span>
      </div>
    }

    if (this.state.mapLoaded) {
      places = this.props.properties
        .map((place, i) => {
          return (
            <ListingMarker
              key={place.code}
              {...place.location}
              text={place.code}
              hoveredCode={this.props.hoveredCode}
              place={place}
              drawPathToCenter={this.drawPathToCenter}
            />
          );
        });

      places.push(center());
    }

    // TODO: enable and rewrite this code properly if university icon needs to be shown.
    // const university = ()=> {
    //   return <img className="cityCenterMarker" src="/icons/facilities/University.svg" {...this.props.location} />
    // }

    // if(this.props.type == "place") {
    //   places.push(university());
    // }
    // else {
    //   places.push(center());
    // }

    let gmapKey = process.env.NODE_ENV == 'development' ? '' : "AIzaSyAib9zXwRsLDWAa0oEpMwqJYPjP5RR8U4M";

    return <React.Fragment>
      <div id="wrapper" style={{ height: '550px', width: '100%' }}>
        <div className="google_map">
          <div style={{ height: '550px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: gmapKey }}
              center={this.state.location}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={({ map, maps }) => this.setState({ map: map, maps: maps, mapLoaded: true, bounds: new maps.LatLngBounds() })}
            >
              {places}
            </GoogleMapReact>
          </div>
        </div>
        {
          this.state.showRoute ? <React.Fragment>
            <div className="distance_icon_align">
              <div className="d-flex distance_info car">
                <img className="svg20 distance_icon" src="/icons/facilities/Cab.svg" alt="" />
                <p className="distance_text font_primary_color"> {`${this.state.driving_legs.distance} (${this.state.driving_legs.time})`}</p>
              </div>
              <div className="d-flex distance_info walk">
                <img className="svg20 distance_icon" src="/icons/facilities/walk.svg" alt="" />
                <p className="distance_text font_primary_color"> {`${this.state.walk_legs.distance} (${this.state.walk_legs.time})`}</p>
              </div>
              <div className="d-flex distance_info transit">
                <img className="svg20 distance_icon" src="/icons/facilities/Train.svg" alt="" />
                <p className="distance_text font_primary_color"> {`${this.state.transit_legs.distance} (${this.state.transit_legs.time})`}</p>
              </div>
            </div>
          </React.Fragment> : null
        }

      </div>
      <style>{`
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

      #wrapper {
       position: relative; 
      }

      .distance_text { 
       font-size: 12px!important;
       font-family: 'Conv_clarika-grot-regular';
       color: #000000!important;
      }

      .distance_info {
       min-height: 20px;
       min-width: 125px;
       background-color: white;
       margin: 5px;
       border: 1px solid #bdbdbd;
       padding: 0px 8px;
      }

      .distance_icon{
      width: 20px;
      margin-right: 5px;
      }

      .car {
      border-bottom: 2px solid #054d7f;
      }

      .walk {
      border-bottom: 2px solid #000000;
      }

      .transit {
      border-bottom: 2px solid #f05c4e;
      }

      .distance_icon_align{
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      top: 0;
      }

 `}
      </style>
    </React.Fragment>
  }
}

export default ListingMap;
