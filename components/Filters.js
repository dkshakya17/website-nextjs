import React from 'react';
import InputRange from 'react-input-range';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import "react-input-range/lib/css/index.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown'
import Carousel from "react-bootstrap/Carousel";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import css from "../public/style.css";
import custom from "../public/custom.css";
import Checkbox from "./Checkbox";
import * as urls from '../components/urls';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"; // v1
import "react-select/dist/react-select.css";
import { setPriority } from 'os';
import AdminSection from './AdminSection';



const BILLINCLUDED = [
  { id: 4, name: "breakfast", label: "Breakfast" },
  { id: 7, name: "cleaningServices", label: "Cleaning Service" },
  { id: 12, name: "heating", label: "Heating" },
  { id: 1, name: "utilityBills", label: "Utility Bills" }
]

const FACILITIES = [
  { id: 2, name: "wifi", label: "Wifi" },
  { id: 10, name: "cinemaRoom", label: "Cinema Room" },
  { id: 6, name: "gym", label: "Gym" },
  { id: 51, name: "refrigerator", label: "Refrigerator " },
  { id: 57, name: "personalContentInsurance", label: "Personal contents insurance" },
  { id: 15, name: "bikeStorage", label: "Bike storage" },
  { id: 44, name: "reception", label: "Reception" },
  { id: 5, name: "onsiteManager", label: "Onsite Manager" },
  { id: 60, name: "elevators", label: "Elevators" },
  { id: 26, name: "entertainmentRoom", label: "Entertainment Room" },
  { id: 20, name: "kitchen", label: "Kitchen" },
  { id: 11, name: "studyRoom", label: "Study Room" },
  { id: 33, name: "laundry", label: "Laundry" },
  { id: 61, name: "maintenanceTeam", label: "Maintenance Team" },
  { id: 8, name: "securitySafety", label: "Security & safety" }
]

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: [],
      city: this.props.data.city_name,
      place: this.props.data.place,
      type: this.props.data.type,
      university: '',
      moveIn: new Date(),
      moveOut: new Date(),
      roomType: '',
      priceRange: {min:50, max:1000},
      maxDistance: {min:0, max: 20},
      bathRooms: new Map(),
      rating: 0,
      facilities: new Map(),
      billIncluded: new Map(),
      show: false,
      manager: 0,
      propNameHint: '',
      selectedProps: props.selectedProps,
      data: props.data,
      toggleFilter: true
    }

    this.onHandleFacilityChange = this.onHandleFacilityChange.bind(this);
    this.onHandleBillIncludedChange = this.onHandleBillIncludedChange.bind(this);
    this.filterProperties = this.filterProperties.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.filterByUniversity = this.filterByUniversity.bind(this);
    this.setAdminFilters = this.setAdminFilters.bind(this);
  }

  componentDidMount() {
    this.state.bathRooms.set('priv_bath', true);
    this.state.bathRooms.set('shared_bath', true);

    const url = urls.getUniversities(this.state.city);
    // call api to get universities data.
    axios.get(url).then((res) => {

      let result = res.data.places.map((place) => {
        return { value: place.code, label: place.name }
      });

      this.setState({ universities: result });
    }).catch((err) => {
      console.log(err);
    })
  }

  onHandleBillIncludedChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => ({ billIncluded: prevState.billIncluded.set(name, checked) }));
  }

  onHandleFacilityChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => ({ facilities: prevState.facilities.set(name, checked) }));
  }

  resetAll = () => {
    // do it later
    this.state.bathRooms.set('privateBathroom', true);
    this.state.bathRooms.set('sharedBathroom', true);
    this.setState({ facilities: new Map(), billIncluded: new Map(), rating: 0 })
  }

  filterProperties = () => {
    let facilities = [...this.state.facilities.entries()]
      .filter(({ 1: v }) => v === true)
      .map(([k]) => k).join(',');

    let billIncluded = [...this.state.billIncluded.entries()]
      .filter(({ 1: v }) => v === true)
      .map(([k]) => k).join(',');

    let bathRooms = [...this.state.bathRooms.entries()]
      .filter(({ 1: v }) => v === true)
      .map(([k]) => k).join(',');

    let move_in_month = ("0" + (this.state.moveIn.getMonth() + 1)).slice(-2);
    let move_in_day = ("0" + this.state.moveIn.getDate()).slice(-2);
    let move_in = [this.state.moveIn.getFullYear(), move_in_month, move_in_day].join("-");

    let move_out_month = ("0" + (this.state.moveOut.getMonth() + 1)).slice(-2);
    let move_out_day = ("0" + this.state.moveOut.getDate()).slice(-2);
    let move_out = [this.state.moveOut.getFullYear(), move_out_month, move_out_day].join("-");
    let university = (this.state.university == '' && this.state.type == 'place') ? this.state.place : this.state.university;

    let stateobj = {
      move_in: move_in, move_out: move_out, room_type: this.state.roomType,
      university: university,
      price_min: this.state.priceRange.min, price_max: this.state.priceRange.max,
      dist_min: this.state.maxDistance.min, dist_max: this.state.maxDistance.max,
      facilities: facilities,
      billIncluded: billIncluded,
      bathRooms: bathRooms,
      rating: this.state.rating,
      manager: this.state.manager,
      propNameHint: this.state.propNameHint,
    }

    return stateobj;
  }

  getProperties() {
    this.props.getProperties(this.filterProperties());
  }

  filterByUniversity = (val) => {
    this.setState({ university: val }, () => {
      this.getProperties();
    });
  }

  onChangeMoveIn = (date) => {
    if (this.state.moveOut < date) {
      this.setState({ moveOut: date, moveIn: date }, () => {
        this.getProperties();
      })
    }
    else {
      this.setState({ moveIn: date }, () => {
        this.getProperties();
      })
    }
  }

  onChangeMoveOut = (date) => {
    this.setState({ moveOut: date }, () => {
      this.getProperties();
    })
  }

  onChangeRoomType = (roomType) => {
    this.setState({ roomType: roomType }, () => {
      this.getProperties();
    })
  }

  setAdminFilters = (manager, propNameHint) => {
    this.setState({ manager: manager, propNameHint: propNameHint }, () => {
      this.getProperties();
    });
  }



render() {
  return <React.Fragment>
  <div className="d-block d-md-none pl-1 apply_filter_btn" onClick={() => this.setState({toggleFilter:!this.state.toggleFilter})}>
      {this.state.toggleFilter?`Apply Filters`:`Hide Filters`}
    <span className={`filter_arrow ${this.state.toggleFilter?'':'toggle_filter'}`}></span>
  </div>
  <div className={`fiter_box d-md-block ${this.state.toggleFilter?'d-none':'d-block'}`}>
  <Card className="filter_card">
      <Card.Body>
      <Form className="filter_form">
      <Form.Row>
          <Form.Group as={Col} controlId="formUniName">
            <Form.Label>University</Form.Label>
            <Select
             name="university"
             width='200px'
             placeholder="Enter university"
             onChange={(val) => { if(val){this.filterByUniversity(val.value);} }}
             value={this.state.university}
             options={this.state.universities}
             isMulti={false}
             isSearchable
             className="university_filter"
             />

          </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Move in</Form.Label>
          <DatePicker
            className="form-control"
            selected={this.state.moveIn}
            minDate={new Date()}
            onChange={(date)=>  {this.onChangeMoveIn(date) }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDate">
          <Form.Label>Move out</Form.Label>
          <DatePicker
            className="form-control"
            selected={this.state.moveOut}
            minDate={this.state.moveIn}
            onChange={(date)=>  {this.onChangeMoveOut(date) }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Room Type</Form.Label>
          <Form.Control as="select" className="filter_room_type" onChange={(e)=> {this.onChangeRoomType(e.target.value)}}>
            <option value="">Select</option>
            <option value="ensuite">En-Suite</option>
            <option value="non-suite">Non En-Suite</option>
            <option value="studio">Studio</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="dist_slider">
        <Form.Label>Price Range (Per Week)</Form.Label>
        <InputRange
          maxValue={1000}
          minValue={50}
          formatLabel={value => `£ ${value}`}
          value={this.state.priceRange}
          onChange = {value => { this.setState({priceRange: value});}}
          onChangeComplete = {value => { this.setState({priceRange: value}, ()=> {
            this.getProperties(this.filterProperties());
          });}}
         />
        </Form.Group>
        <Form.Group as={Col} className="dist_slider">
          <Form.Label>Max Distance (in miles)</Form.Label>
          <InputRange
          formatLabel={value => `${value}`}
          maxValue={20}
          minValue={0}
          value={this.state.maxDistance}
          onChange={value => { this.setState({maxDistance: value}, ()=> {
            this.getProperties(this.filterProperties());
          });}}

         />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword2">
        <div className="advance_drop">
          <Dropdown show={this.state.show} onToggle={(val)=> { this.setState({show:val});}} >
          <Dropdown.Toggle split variant="default" id="dropdown-custom-2" className={this.state.show?'rotate_dropdown_arrow':''}>
              <span className="mr-2 font-weight-bold">{this.state.show?'Less':'More'}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Form className="advance_filter">
                          <Form.Row>
                            <Form.Group as={Col} md={4} controlId="advanceForm">
                              <Form.Label>Bathroom</Form.Label>
                              <div className="inline_check">
                                <Checkbox type={'checkbox'} name={'priv_bath'} id={'privateBathroom'} checked={this.state.bathRooms.get('priv_bath')} label={'Private Bathroom'} onChange={(e) => { let name = e.target.name; let checked = e.target.checked; this.setState(prevState => ({ bathRooms: prevState.bathRooms.set(name, checked) })); }} />
                                <Checkbox type={'checkbox'} name={'shared_bath'} id={'sharedBathroom'} checked={this.state.bathRooms.get('shared_bath')} label={'Shared Bathroom'} onChange={(e) => { let name = e.target.name; let checked = e.target.checked; this.setState(prevState => ({ bathRooms: prevState.bathRooms.set(name, checked) })); }} />
                              </div>
                            </Form.Group>
                            <Form.Group as={Col} md={8} controlId="advanceForm2">
                              <Form.Label>Rating</Form.Label>
                              <div className="inline_check">
                                <Form.Check
                                  name="shared"
                                  type="radio"
                                  id="all"
                                  inline
                                  label="All"
                                  checked={this.state.rating == 0 ? true : false}
                                  onChange={(e) => this.setState({ rating: 0 })}
                                />
                                <Form.Check
                                  name="shared"
                                  type="radio"
                                  id="5stars"
                                  inline
                                  label="5 Stars"
                                  checked={this.state.rating == 1 ? true : false}
                                  onChange={(e) => this.setState({ rating: 1 })}
                                />
                                <Form.Check
                                  name="shared"
                                  type="radio"
                                  id="4stars"
                                  inline
                                  label="From 4 Stars"
                                  onChange={(e) => this.setState({ rating: 2 })}
                                  checked={this.state.rating == 2 ? true : false}
                                />
                                <Form.Check
                                  name="shared"
                                  type="radio"
                                  id="3stars"
                                  inline
                                  label="From 3 Stars"
                                  checked={this.state.rating == 3 ? true : false}
                                  onChange={(e) => this.setState({ rating: 3 })}
                                />
                              </div>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group as={Col} controlId="advanceForm3">
                              <Form.Label>Facilities</Form.Label>
                              <div className="inline_check">
                                {
                                  FACILITIES.map((facility) => (
                                    <Checkbox type={'checkbox'} name={facility.name} checked={this.state.facilities.get(facility.name)} label={facility.label} onChange={this.onHandleFacilityChange} />
                                  ))
                                }
                              </div>

                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group as={Col} md={8} controlId="advanceForm4">
                              <Form.Label>Bills Included</Form.Label>
                              <div className="inline_check">
                                {
                                  BILLINCLUDED.map((billIncluded) => (
                                    <Checkbox type={'checkbox'} name={billIncluded.name} checked={this.state.billIncluded.get(billIncluded.name)} label={billIncluded.label} onChange={this.onHandleBillIncludedChange} />
                                  ))
                                }
                              </div>

                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="advanceForm5" className="filter_btn_row mb-0">

                              <ButtonToolbar className="list_det_btns filter_btn pull-right" >
                                <Button variant="outline-dark" size="lg" className="btn-outline-primary" onClick={() => this.setState({ show: false })}>
                                  Cancel
                  </Button>
                                <Button variant="primary" size="lg" className="apply_btn primary-btn" onClick={() => { this.setState({ show: false }); this.getProperties(); }}>
                                  Apply
                  </Button>
                              </ButtonToolbar>

                              <a onClick={this.resetAll} className="filter_reset_btn pull-right red">Reset All</a>
                            </Form.Group>

                          </Form.Row>
                        </Form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Form.Group>
              </Form.Row>
            </Form>

          </Card.Body>
        </Card>
        {
          /* only for logged in users */
          this.props.user && <AdminSection
            data={this.props.data}
            setAdminFilters={this.setAdminFilters}
            selectedProps={this.state.selectedProps}
            user={this.props.user}
          />
        }
      </div>
      <style type="text/css"> {`
 .university_filter .Select-control {
  border-radius: 6px !important;
  background-color: rgba(155, 167, 190, 0.1) !important;
  height: 48px;
  opacity: 0.5;
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #101a42;
  border: none !important;
 }

  .inline_drop {
    display: inline-flex;
    width: 100%;
    min-width: 210px;
    justify-content: center;
    align-items: center;
    position: relative;
}

.filter_btn button {
  color:white;
}

.apply_btn {
  color:white!important;
}
  .univeristy {
    width : 100px;
  }

  .react-datepicker__current-month {
    color:white;
  }

  .react-datepicker__header {
    background-color: #f05c4e!important;
  }

  .react-datepicker__day-names {
    color:white;
  }

  .react-datepicker__day--selected {
    background-color: #f05c4e!important;
  }
  .react-datepicker__triangle::before
  {
    border-top-color:#f05c4e!important;
  }

  .datepicker_custom_input {
    color: #ced4da;

  }

  .css-yk16xz-control {
    height: 48px;
  }


  form.filter_form input[type="date"] {
    height:48px;
    width:100%;
    min-width: 150px!important;
  }

  .error {
    color:red;
  }
  .filter_room_type{
    opacity:0.5 !important;
  }
  .maxLabel{
    display:none;
  }
  .input-range__label--max{
    display:none;
  }
  .input-range__label--min{
    display:none;
  }
  .filter_reset_btn{
      cursor:pointer;
  }
  .apply_filter_btn{
    font-size: 0.9rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    text-align: left;
    color: #9ba7be;
    padding-left:5px;
  }
  .filter_arrow{
    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
  }
  .filter_arrow.toggle_filter{
    transform:rotate(-180deg);
  }
  .Select-arrow-zone{
    background-image: url(/icons/arrowdownblue.svg);
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: auto;
    -webkit-appearance: none;
    opacity: 1;
    padding: 0;
  }

    .Select-arrow,.Select.is-open .Select-arrow, .Select .Select-arrow-zone:hover > .Select-arrow{
      display:none !important;
  }

  `}
      </style>
    </React.Fragment>
  }
}
