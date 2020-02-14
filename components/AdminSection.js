import React from "react";
import withLayout from "../components/MyLayout";
import Form from "react-bootstrap/Form";
import * as urls from "../components/urls";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Cookies from "universal-cookie";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from 'react-bootstrap/Tab'
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select"; // v1
import Image from "react-bootstrap/Image"; 
import "react-select/dist/react-select.css";

const cookies = new Cookies();

class EmailContent extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     opts: props.opts,
        //     propDetails: props.propDetails,
        // }
        this.width = {sm: 100, md: 150, lg: 200}
    }

    render () {
        let url = `/${this.props.country}/${this.props.city}/${this.props.propDetails.code}`;
        let style = {
          name: {color: '#f05c4e', textDecoration: 'none'},
          configName: {color: '#054d7f', textDecoration: 'none'},
          list: {paddingLeft: '0px', listStyle: 'none', marginTop: '5px'},
          image: {marginRight: '10px'},
          p1: {paddingLeft: '10px', borderLeft: '1px solid gray'},
          f1: {fontSize: '1rem'}
        }
        return <>
        {/* using inline css here to allow copy of content with style */}
            <div className="adminEmail">
                <a href={url} target="_blank" style={style.name}><h3 style={style.f1}>{this.props.propDetails.name}</h3></a>
                <div style={style.p1}>
                  {this.props.propDetails.images.map((image, i) => (
                      <Image height={this.width[this.props.opts.imageSize]} src={image.url} style={style.image} key={i} />
                  ))}
                  {this.props.opts.showDist && <div><br />
                    {this.props.propDetails.commuteData.place_name && <>
                      <span>Nearest University: {this.props.propDetails.commuteData.place_name}</span>
                      <ul style={style.list}>
                        <li key='car'><strong style={style.configName}>By car:</strong> {this.props.propDetails.commuteData.place_time.car}</li>
                        <li key='train'><strong style={style.configName}>By train/bus:</strong> {this.props.propDetails.commuteData.place_time.train}</li>
                        <li key='walk'><strong style={style.configName}>By walk:</strong> {this.props.propDetails.commuteData.place_time.walk}</li>
                      </ul>
                    </>
                    }
                  </div>}
                  {this.props.opts.showConfig && <div>
                      <span>Available room types</span>
                      <ul style={style.list}>{this.props.propDetails.configs.map((config, ind) => (<li key={ind}>
                              <strong style={style.configName}>{config.name}:</strong>
                              {config.subconfigs.length > 0
                              ? <ul style={style.list}>
                                {config.subconfigs.map((subconfig, ind) => (
                                  <li key={ind}>- {subconfig.lease} week lease{this.props.opts.showMoveIn && ` from ${subconfig.available_from}`}: 
                                  <strong> £{subconfig.price}</strong>/week {/*`(Security deposit: £{subconfig.security_deposit})`*/}</li>
                                ))}
                              </ul>
                              : <span>
                                {config.min_price == config.max_price 
                                  ? ` £${config.min_price}/week ` 
                                  : ` £${config.min_price} - £${config.max_price}/week `
                                }
                                {config.min_lease == config.max_lease 
                                  ? `(${config.min_lease} weeks)` 
                                  : `(${config.min_lease} - ${config.max_lease} weeks)`
                                }
                                <br />
                              </span>
                              }
                              </li>
                      ))}</ul>
                  </div>}
                </div>
            </div>
        </>;
    }
}

class WhatsAppContent extends React.Component {
    render = () => (<div></div>);
}

class AdminSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managers: [],
      cities: [],
      manager: 0,
      propNameHint: "",
      adminModalShow: false,
      showConfig: "all",
      imageSize: "sm", // sm, md, lg
      showDist: false,
      showOffers: true,
      properties: props.data.properties,
      selectedProps: props.selectedProps,
    };
  }
  
  getDisplayOpts = () => ({
        showConfig: this.state.showConfig, 
        imageSize: this.state.imageSize, 
        showDist: this.state.showDist, 
        showOffers: this.state.showOffers,
        showMoveIn: this.state.showMoveIn,
  })

  logout = () => {
    cookies.remove("auth_token", { path: "/" });
    window.location.reload();
  };

  filter = () => {
    this.props.setAdminFilters(this.state.manager, this.state.propNameHint);
  };

  getContent = () => {
    this.setState({adminModalShow: true});
  };

  updateManagerList = city => {
    axios.get(urls.getManagerPath(city), {headers: {Authorization: 'Bearer '+ cookies.get('auth_token')}}).then(res => {
      let managers = res.data.managers.map(manager => ({
        value: manager.id,
        label: manager.name
      }));
      this.setState({ managers: managers });
    });
  };

  updateCityList = country => {
    axios.get(urls.getCityPath(country)).then(res => {
      let cities = res.data.cities.map(city => ({
        value: city.code,
        label: city.name
      }));
      this.setState({ cities: cities });
    });
  };

  componentDidMount = () => {
    this.updateManagerList(this.props.data.city);
    this.updateCityList(this.props.data.country);
  };

  render() {
    if (!this.props.user) {
      return <></>;
    }
    return (
      <div className="adminSection">
        <Card>
          <Card.Body className="">
            <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Select
                  name="city"
                  placeholder="Switch city"
                  onChange={val => {
                    val && (window.location.href = `/${this.props.data.country}/${val.value}`);
                  }}
                  //value={this.state.city}
                  options={this.state.cities}
                  isMulti={false}
                  isSearchable
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                {/* <Form.Label>Property Manager</Form.Label> */}
                <Select
                  name="manager"
                  placeholder="Enter manager name"
                  onChange={val => {
                    this.setState({ manager: val ? val.value : 0});
                  }}
                  value={this.state.manager}
                  options={this.state.managers}
                  isMulti={false}
                  isSearchable
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicEmail">
                {/* <Form.Label>Property Name</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Property Name"
                  value={this.state.propNameHint}
                  onChange={e =>
                    this.setState({ propNameHint: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col>
                <Button
                  onClick={this.logout}
                  className="btn-sm btn-danger"
                >
                  Logout
                </Button>
              </Col>
              <Col sm={2} className="pull-right">
                <Button
                  onClick={this.getContent}
                  className="btn-sm btn-success"
                >
                  Get Content
                </Button>
              </Col>
              <Col sm={1} className="pull-right">
                <Button onClick={this.filter} className="btn-sm btn-success">
                  Filter
                </Button>
              </Col>
            </Form.Row>
          </Card.Body>
        </Card>
        <Modal
          show={this.state.adminModalShow}
          onHide={() => this.setState({ adminModalShow: false })}
          className="adminModal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Form className="advance_filter">
              {/* <Row className="">
                <h6 className="mr-3">Include Configuration</h6>
                <Form.Check
                  type="radio"
                  name="config"
                  inline
                  label="All"
                  id="config-all"
                  checked={this.state.showConfig == "all" ? true : false}
                  onChange={e => this.setState({ showConfig: "all" })}
                />
                <Form.Check
                  type="radio"
                  name="config"
                  inline
                  label="Studio"
                  id="config-studio"
                  onChange={e => this.setState({ showConfig: "studio" })}
                />
                <Form.Check
                  type="radio"
                  name="config"
                  inline
                  label="Ensuite"
                  id="config-ensuite"
                  onChange={e => this.setState({ showConfig: "ensuite" })}
                />
                <Form.Check
                  type="radio"
                  name="config"
                  inline
                  label="Shared"
                  id="config-shared"
                  onChange={e => this.setState({ showConfig: "shared" })}
                />
              </Row>
               */}
              <Row>
                <h6 className="mr-3">Image Size</h6>
                <Form.Check
                  type="radio"
                  name="image-size"
                  inline
                  label="Small"
                  id="image-size-sm"
                  checked={this.state.imageSize == "sm" ? true : false}
                  onChange={e => this.setState({ imageSize: "sm" })}
                />
                <Form.Check
                  type="radio"
                  name="image-size"
                  inline
                  label="Medium"
                  id="image-size-md"
                  onChange={e => this.setState({ imageSize: "md" })}
                />
                <Form.Check
                  type="radio"
                  name="image-size"
                  inline
                  label="Large"
                  id="image-size-lg"
                  onChange={e => this.setState({ imageSize: "lg" })}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  name="show-dist"
                  inline
                  label="Show Distance"
                  id="show-dist"
                  checked={this.state.showDist}
                  onChange={e =>
                    this.setState({ showDist: !this.state.showDist })
                  }
                />
                <Form.Check
                  type="checkbox"
                  name="show-offers"
                  inline
                  label="Show Offers"
                  id="show-offers"
                  checked={this.state.showOffers}
                  onChange={e =>
                    this.setState({ showOffers: !this.state.showOffers })
                  }
                />
                <Form.Check
                  type="checkbox"
                  name="show-movein"
                  inline
                  label="Show Move In Date"
                  id="show-movein"
                  checked={this.state.showMoveIn}
                  onChange={e =>
                    this.setState({ showMoveIn: !this.state.showMoveIn })
                  }
                />
              </Row>
            </Form>
          </Modal.Header>
          <Modal.Body contentEditable={true} className="adminModalBody">
                  {Object.keys(this.props.selectedProps).map((code, i) => {
                      return <EmailContent propDetails={this.props.selectedProps[code]} city={this.props.data.city} country={this.props.data.country} 
                            opts={this.getDisplayOpts()} key={i}/>
                  })}

            {/* return <Tabs defaultActiveKey="email" id="uncontrolled-tab-example">
              <Tab eventKey="email" title="Email">
                {this.state.selectedProps.map(selectedProp => {
                    <EmailContent data={selectedProp} opts={this.getDisplayOpts()} />
                })}
              </Tab>
              <Tab eventKey="whatsapp" title="WhatsApp">
                {this.state.selectedProps.map(selectedProp => {
                    <WhatsAppContent data={selectedProp} opts={this.getDisplayOpts()} />
                })}
              </Tab>
            </Tabs> */}
            
          </Modal.Body>
        </Modal>
        <style>{`
            .adminModal .modal-header {margin-left: 15px;}
        `}</style>
      </div>
    );
  }
}

export default AdminSection;
