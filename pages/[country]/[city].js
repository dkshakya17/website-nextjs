import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import withLayout from '../../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from 'react-bootstrap/Dropdown'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import { Formik } from 'formik';
import Pagination from 'react-bootstrap/Pagination'
import Filters from '../../components/Filters';
import CityListingTile from '../../components/city-prop';
import css from "../../public/style.css";
import custom from "../../public/custom.css";
import ListingMap from '../../components/listingmap';
import Loader from '../../components/Loader';
import * as urls from '../../components/urls';
import fetch from 'isomorphic-unfetch';
import ReactPaginate from 'react-paginate';
import CountryCode from '../../components/CountryCode';
import FormSubmit from '../../components/FormSubmit';
import EnquireNowForm from '../../components/EnquireNowForm';
import Modal from 'react-bootstrap/Modal';
import { EnquireNowFormSchema } from '../../components/FormValidationSchema';
const cookies = new Cookies();

const InfoForm = (props) => {
  let isSubmitLocked = false;

  return <div>
    <Formik
      initialValues={{
        source: props.source, city: props.city, fullname: '', countryCode: '44', email: '', phone: '', university: ''
      }}
      validationSchema={EnquireNowFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!isSubmitLocked) {
          isSubmitLocked = true;

          if (cookies.get('utm_source')) {
            values.utm_source = cookies.get('utm_source');
          }

          if (cookies.get('utm_campaign')) {
            values.utm_campaign = cookies.get('utm_campaign');
          }

          if (cookies.get('utm_medium')) {
            values.utm_medium = cookies.get('utm_medium');
          }

          if (cookies.get('utm_term')) {
            values.utm_term = cookies.get('utm_term')
          }

          if (cookies.get('utm_content')) {
            values.utm_content = cookies.get('utm_content');
          }
          if (cookies.get('referrer')) {
            values.referrer = cookies.get('referrer');
          }

          fetch(urls.getLeadFormPath(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: JSON.stringify(values)
          }).then(response => {
            if (response.status == 200) {
              document.getElementById('studentButton').removeAttribute('disabled', 'disabled');
              let messageEl = document.getElementById('formMessage');
              messageEl.setAttribute('class', 'fade alert alert-success show');
              if (messageEl.textContent == undefined || messageEl.textContent == "") {
                let textEl = document.createTextNode('Message sent successfully!');
                messageEl.appendChild(textEl);
              } else {
                document.getElementById('email').value = "";
                messageEl.removeAttribute('class', 'show');
                messageEl.textContent = "";
              }

              isSubmitLocked = false;
              props.infoFormSubmitted();
            }
          }).catch((error) => {
            let messageEl = document.getElementById('formMessage');
            if (messageEl) {
              messageEl.setAttribute('class', 'fade alert alert-danger show');
              let textEl = document.createTextNode('There is some error, Please try later!');
              messageEl.appendChild(textEl);
            }

            isSubmitLocked = false;
          });

          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isInvalid,
        } = props;
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  id="fullname"
                  size="md"
                  required
                  type="text"
                  placeholder="Full Name"
                  defaultValue=""
                  name="fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  isInvalid={touched.fullname && errors.fullname}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Full Name.
                      </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom04">
                <Form.Control size="md" type="email" placeholder="Email" required name="email" isInvalid={errors.email && touched.email} value={values.email} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Email Address.
                      </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Row>
                  <Col md={2} xs={12}>
                    <Form.Control size="md" as="select" onChange={(e) => { values.countryCode = e.target.value; }}>
                      <CountryCode />
                    </Form.Control>
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Control size="md" type="number" placeholder="Phone" required name="phone" value={values.phone} isInvalid={errors.phone && touched.phone} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                      Enter valid phone number.
                        </Form.Control.Feedback>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Control size="md" type="text" placeholder="Your University or College" required name="university" value={values.university} onChange={handleChange}
                      isInvalid={touched.university && errors.university}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the name of the University.
                      </Form.Control.Feedback>
                  </Col>
                </Form.Row>
              </Form.Group>

            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom01">
                <Button id="studentButton" type="submit" size="lg" block disabled={isSubmitLocked} className="shadow">submit</Button>

                <div id="formMessage"></div>
                <p>By submitting form you agree to <a href="/terms" target="_blank" className="red">terms</a> and <a href="/privacy-policy" target="_blank">privacy policy</a> </p>

              </Form.Group>

            </Form.Row>
          </form>
        );
      }}
    </Formik>
  </div>
}

const BreadCrumSection = ({ data }) => {
  return <p className="breadcrum">
    <span>
      <a href='/'>
        Home
          </a>
    </span>>
      <span>
      <a href={'/' + data.country}>
        {data.country_name}
      </a>
    </span>>
      {
      data.type === 'city' ?
        <span className="active">
          {data.city_name}
        </span> :
        <>
          <span>
            <a href={'/' + data.country + '/' + data.city}>
              {data.city_name}
            </a>
          </span> > <span className="active">{data.place_name}</span></ >
    }
  </p>
}

const FilterSection = React.forwardRef(({ data, getProperties, selectedProps, user }, ref) =>
  <section className="filter_sec">
    <Container>
      <Row>
        <Col md={12} xs={12}>
          <h1 className="list_head">{data.type == 'place' ? `${data.place_name} Accommodation` : `Student Housing in ${data.city_name}`}</h1>
          <BreadCrumSection data={data} />
          <Filters ref={ref} getProperties={getProperties} data={data} selectedProps={selectedProps} user={user} />
        </Col>
      </Row>
    </Container>
  </section>
)

const BootmContent = ({ city, content }) => {

  const [open, setOpen] = useState(false);
  const showOpen = () => {
    if (!content) {
      return false;
    }
    return true;
  }

  return (
    <section className="filter_sec">
      <Container>
        <Row className={`city_details_section ${open ? 'show_details_full' : ''}`}>
          <Col md={12} xs={12}>
            {/* replace content only if content present */}
            <p className="cityDesc" dangerouslySetInnerHTML={{ __html: content }}></p>
          </Col>
        </Row>
        {!showOpen() ? null :
          <Row className={`justify-content-start ${!showOpen ? 'hideReadmore' : ''}`}>
            <Col>
              <a className="red underline_on_hover" onClick={() => setOpen(!open)}>{open ? 'Show Less' : 'Read More..'}</a>
            </Col>
          </Row>
        }
      </Container>
      <style type='text/css'>{`
            .city_details_section{
              height:20rem;
              transition:height 1s linear;
              overflow:hidden;
            }
            .show_details_full{
              height:2000px;
            }
            .filter_sec{
              padding-bottom:0 !important;
            }
            @media screen and (max-width:600px){
              .filter_sec > .container{
                padding:0 !important;
              }
            }
          `}</style>
    </section>
  );
}

const SORT_BY = [{ id: 0, name: "Relevance", displayName: "Relevance" },
{ id: 1, name: "Price", displayName: "Price: Low to High" },
{ id: 2, name: "Pricerev", displayName: "Price: High to Low" },
{ id: 3, name: "Distance", displayName: "Distance" },
]

const EnquireFormModal = ({ data, hideModalForm, city }) => {
  if (!data) {
    return null;
  }
  const [showSubmission, setSubmission] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [showModalSubmission, setModalSubmission] = useState(false);
  const infoFormSubmitted = (values) => {
    setUserInformation(values);
    setSubmission(true);
  }

  const infoFormModalSubmitted = (values) => {
    setUserInformation(values);
    setModalSubmission(true);
  }
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const closeFunc = () => {
    hideModalForm();
  }
  return <div>
    <Modal show={show} onHide={() => closeFunc()}
      className="enquirymodal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Row className="m-0">
          <Col md={6} xs={12} className="p-0">
            <div className="modal_img blue_bg white">
              <Image src={data.images.length > 0 ? data.images[0].url : '/list-images/prop1.png'} fluid />
              <h3>{data.name}</h3>
              <p>{data.address}</p>
            </div>
          </Col>
          <Col md={6} xs={12} className="p-0">
            <div className="modal_form">
              <Button variant="default" onClick={() => closeFunc()}>
                ✕
          </Button>
              {showModalSubmission ? null : <p>Fill in the following details to complete your request.</p>}
              {showModalSubmission ? <FormSubmit data={data} userInformation={userInformation} /> : <EnquireNowForm infoFormSubmitted={infoFormModalSubmitted} source={data.code} city={city} />}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  </div>;
}


const InfoFormContainer = ({ data }) => {
  const [showSubmission, setSubmission] = useState(false);
  const infoFormSubmitted = () => {
    setSubmission(true);
  }
  return (
    <div className="info_form prop_list_form mr-md-1">
      <h2 className="prop_rate white red_bg blue_bg">Want something else?
      <br /> <br />
        <span>Just tell us your requirements & get the best apartments for your stay hasslefree.</span>
      </h2>
      <Card className="formBox">
        <Card.Body>
          {
            showSubmission ? <FormSubmit /> : <InfoForm infoFormSubmitted={infoFormSubmitted} source={data.city} city={data.city} />
          }
        </Card.Body>
      </Card>
    </div>
  );
}

const PropListing = ({ data, paginate, setSortBy, handleForm, user, handleSelectProp, selectedProps, page }) => {
  const [showSubmission, setSubmission] = useState(false);
  const [sort_By, setSort_By] = useState('Relevance');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoveredCode, setHoveredCode] = useState("");
  const [commuteData, setCommuteData] = useState({});
  const [dataState, setDataState] = useState(data);

  const setListingMarkerHover = (code) => {
    setHoveredCode(code);
  };

  const resetCardMarkerHover = () => {
    setHoveredCode("");
  };
  const handleTitle = (param) => {
    param === 'Pricerev' ? setSort_By('Price') : setSort_By(param);
  };

  useEffect(() => {
    if (!data.properties) {
      return
    }
    let codes = data.properties.map(prop => prop.code).join(',');
    let url = data.type == 'place'
      ? urls.getPlaceCommuteDataPath(data.place, codes)
      : urls.getNearestPlaceDataPath(codes);
    fetch(url).then(res => res.json()).then(nearestData => {
      setCommuteData(nearestData.data);
    });
    axios.get(urls.getPropConfigsPath(codes)).then(res => {
      return res.data;
    }).then(res => {
      let dataWithConfig = data.properties;
      dataWithConfig.properties = data.properties.map(propData => {
        propData.configs = res.configs[propData.code];
        propData.tags = res.tags[propData.code];
        return propData;
      });
      setDataState(dataWithConfig);
    });
  }, [data]); // hook equivalent to componentDidMount

  return <React.Fragment>
    <section className="prop_listing">
      <Container>
        <Row>
          <Col md={8}>
            <Row>
              <Col>
                <p> found {data.count} places to stay</p>
              </Col>
              <Col>
                <p className="sort_by pull-right">
                  {/* // */}
                  <label className="form-label" htmlFor="formGridPassword">Sort by </label>
                  <Dropdown onSelect={(e) => { handleTitle(e); setSortBy(e); }}>
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                      {
                        sort_By
                      }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {SORT_BY.map((sortBy, index) => (
                        <Dropdown.Item key={index} eventKey={sortBy.name}>{sortBy.displayName}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </p>
              </Col>
            </Row>
            <hr />
            <div className="cit_prop_listing mr-md-1">
              {data.properties.map((propData, index) => (

                <div onMouseEnter={() => { setListingMarkerHover(propData.code); }} onMouseLeave={() => { resetCardMarkerHover(); }} key={index}>
                  {
                    user && <Form.Check id={'checkbox-' + propData.code} checked={selectedProps[propData.code] ? true : false}
                      onChange={() => handleSelectProp(propData, commuteData[propData.code])} />
                  }
                  <CityListingTile key={propData.code} country={data.country} city={data.city} propData={propData} handleModal={handleForm} nearestData={commuteData[propData.code]} />
                </div>

              ))}
            </div>
            <div className="pagination_content">
              <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel={'...'}
                initialPage={0}
                breakClassName={'break-me'}
                pageCount={data.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(page) => { paginate(page.selected + 1); }}
                forcePage={page - 1}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
              />
            </div>
            <InfoFormContainer data={data} />
          </Col>
          <Col md={4} xs={12}>
            {/* <div className="map_inst">
      <p>Nearby Properties</p>
      <div className="pull-right map_switch">
      <Form.Check
              type="switch"
              id="custom-switch"
              label="Show map"
              className="red"
          />
      </div>
      </div> */}
            <div className="prop_map">
              <ListingMap properties={data.properties} type={data.type} place_name={data.place_name} location={data.location} hoveredCode={hoveredCode} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <style type="text/css"> {`
      .previous_page {
        background-image: url(/leftArrow.png)!important;
        width: 15px;
        height: 20px;
        background-repeat: no-repeat!important;
        opacity: 8;
        margin-top:10px;
        z-index:1;
        display:block;
      }

      .next_page {
        background-image: url(/rightArrow.png)!important;
        width: 15px;
        height: 20px;
        background-repeat: no-repeat!important;
        opacity: 8;
        margin-top:10px;
        z-index:1;
        display:block;
      }

      .pagination {
        display: -webkit-inline-box;
      }

      .pagination a{
        color: #f05c4e !important;
        font-size: 22px;
        cursor:pointer;
      }

      .compare_prop {
          min-height:215px;
          width:100%;
          border: 1px solid #19c45d;
          margin-top: 10px;
          border-radius: 5px;
      }

      .compare_prop .header {
        padding: 10px;
        width:100%;
        background-color: #19c45d;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .compare_prop .header h1{
      font-size: 14px;
      color: #fff;
      margin-bottom: 0px;
  }
  .compare_prop .header p{
    font-size: 12px;
    color: #fff;
  }


  .bg_white{
    background-color: #fff;
  }

  .clear_btn_bg{
    background-color: transparent;
    border: 1px solid #fff !important;
    color: #fff!important;
  }

  .compare_btn{
  display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 5px 15px;
    font-family: 'Conv_clarika-grot-regular';
    font-size: 10px;
    line-height: 1.5;
    border-radius: 4px;
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #19c45d;
  }

  .compare_card{
    width: 100%;
    background-color: #fff;
    min-height: 120px;
    box-shadow: 3px 4px 40px -13px #c3c0bda8;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    margin-top: 15px;
  }

  .compare_card:after{
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: #fff;
    top: 0px;
    right:0px;
    border-radius:50%;
  }

  .compare_card p{
    font-size: 12px;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}

.price_text {
  font-size: 12px;
  color: #f05c4e;
  font-family: 'Conv_clarika-grot-bold';
  margin-bottom: 0px;
}

.weeks_font{
  font-size: 12px;
  color: #f05c4e;
  font-family: 'Conv_clarika-grot-regular';
  margin-bottom: 0px;
}
      .pagination.active {
        color: #f05c4e !important;
      }

      .pagination_content {
        text-align:center;
      }

      .pagination li {
        margin-left:5px;
        margin-right:5px;
      }

      .dropdown button {
        font-family: 'Conv_clarika-grot-regular';
        color: #2a2e31;
      }

      .sort_by > label{
        position: absolute;
        right: 120px;
        margin-bottom:0 !important;
      }
      .sort_by >.show.dropdown > .dropdown-menu.show{
        margin-left:-80px;
      }
  `}
    </style>

  </React.Fragment>;
}

const SoldOutSection = (data) => {
  return (
    <section className="prop_listing">
      <Container>
        <p className="mb-4"><h5>All properties with current filters are sold out at this moment.</h5></p>
        <hr />
        <Row>
          <InfoFormContainer data={data.data} />
        </Row>
      </Container>
    </section>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      propertiesData: props,
      city: props.city,
      filters: {},
      sort_by: "Relevance",
      requests: new Map(),
      loading: false,
      city_name: props.city_name,
      description: props.description,
      selectedProps: {},
      metaValues: this.getMetaValues(),
      openModal: false,
      modalData: '',
      user: props.user,
    }

    this.filter = React.createRef();
    this.getProperties = this.getProperties.bind(this);
    this.paginate = this.paginate.bind(this);
    this.setModal = this.setModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


  paginate(page) {
    this.setState({ page: page }, () => {
      this.fetchProperties(this.filter.current.filterProperties());
      window.scrollTo(0, 0)
    })
  }

  fetchProperties = (obj = null, ...additionalParams) => {
    let str = [];

    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

    for (let element in additionalParams) {
      for (let p in additionalParams[element]) {

        if (additionalParams[element].hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(additionalParams[element][p]));
        }
      }
    }

    let queryParams = str.join("&");
    let url = urls.getCityPropsPath(this.state.city);
    let searchUrl = `${url}?page=${this.state.page}&sortBy=${this.state.sort_by}&${queryParams}`;
    if (!this.state.requests.has(searchUrl)) {
      this.setState({ loading: true }, () => {
        let auth_token = cookies.get('auth_token');
        let headers = auth_token ? { Authorization: `Bearer ${auth_token}` } : {};
        axios.get(searchUrl, { headers: headers }).then((res) => {
          res.data.properties.map(prop => {
            if (prop.images && prop.images.length == 0) {
              prop.images = [
                { url: '/list-images/list-slide.png', caption: 'Property Image' },
                { url: '/list-images/list-slide.png', caption: 'Property Image' },
                { url: '/list-images/list-slide.png', caption: 'Property Image' },
                { url: '/list-images/list-slide.png', caption: 'Property Image' },
              ]
            }

            return prop;
          });

          this.state.requests.set(searchUrl, res.data);
          console.log(res.data);
          this.setState({ propertiesData: res.data, loading: false });
        }).catch((err) => {
          if (err.response && err.response.status == 401) {
            window.location.href = '/login';
          } else {
            this.setState({ loading: false });
          }
        });
      })
    }
    else {
      let resultfromState = this.state.requests.get(searchUrl)
      this.setState({ propertiesData: resultfromState });
    }
  }

  setSortBy = (sortBy) => {
    this.setState({ sort_by: sortBy, page: 1 }, () => {
      this.fetchProperties(this.filter.current.filterProperties());
    })
  }

  getProperties = ({ ...params }) => {
    this.setState({ page: 1 }, () => {
      this.fetchProperties({ ...params });
    });
  }

  handleSelectProp = (propData, commuteData) => {
    propData.commuteData = commuteData;
    this.setState(prevState => {
      if (prevState.selectedProps[propData.code]) {
        delete prevState.selectedProps[propData.code];
      } else {
        prevState.selectedProps[propData.code] = propData;
      }
      return { selectedProps: prevState.selectedProps }
    });
  }

  getMetaValues = () => {

    let name = this.props.city_name;
    let code = this.props.city
    if (this.props.type == 'place') {
      name = this.props.place_name;
      code = this.props.place;
    }

    let values = {
      title: `Student Accommodation ${name} | UniAcco`,
      description: `Compare prices, amenities and more for your Student Accommodation in ${name}. Consult our team of experts to cater your personalized requirements. Choose from a wide range premium and affordable Student Housing, Halls, Flats, Studios in London. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.`,
      keywords: `student accommodation ${name}, student housing ${name}, cheap student accommodation ${name}, student halls ${name}, student residence ${name}`,
      canonical: `https://uniacco.com/${this.props.country}/${code}`,
      og: { type: 'website', locale: 'en_IE', image: 'https://uniacco.com/buildings@2x.jpg', site_name: 'UniAcco', imageWidth: 1200, imageHeight: 1200 },
    }
    if (this.props.type == 'place') {
      values.title = `${name} Accommodation | UniAcco`;
      values.description = `Compare prices, amenities and more for your ${name} Student Accommodation. Consult our team of experts to cater your personalized requirements. Choose from a wide range premium and affordable Student Housing, Halls, Flats, Studios near UCL. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.`;
      values.keywords = `${name} accommodation, ${name} student accommodation`;
    }
    values.og.url = values.canonical;
    values.og.title = values.title;
    values.og.description = values.description;
    return values;
  }

  setModal = (arg) => {
    this.setState({ modalData: arg });
  }

  hideModal = () => {
    this.setState({ modalData: '' });
  }

  render() {
    return <div>
      {this.state.loading ? <Loader /> : null}
      <NextSeo
        title={this.state.metaValues.title}
        description={this.state.metaValues.description}
        keywords={this.state.metaValues.keywords}
        canonical={this.state.metaValues.canonical}
        openGraph={this.state.metaValues.og}
      />
      <FilterSection
        ref={this.filter}
        data={this.state.propertiesData}
        getProperties={this.getProperties}
        selectedProps={this.state.selectedProps} // required by FilterSection > AdminSection > EmailContent
        user={this.props.user}
      />
      {
        this.state.propertiesData.properties.length == 0 ?
          <SoldOutSection data={this.state.propertiesData} /> :
          <PropListing data={this.state.propertiesData} paginate={this.paginate} setSortBy={this.setSortBy}
            user={this.props.user} handleSelectProp={this.handleSelectProp} handleForm={this.setModal}
            selectedProps={this.state.selectedProps} page={this.state.page} // required to maintain checkbox state
          />
      }
      <section className="pb-0">
        <Image src="/list-images/listingimg.svg" fluid />
        <EnquireFormModal data={this.state.modalData} hideModalForm={this.hideModal} city={this.state.city} />
      </section>
      {this.state.description ? <BootmContent city={this.state.city_name} content={this.state.description} /> : null}
    </div>;
  }
}

const pagewithLayout = withLayout(Page);
pagewithLayout.getInitialProps = async ({ req, query }) => {
  const url = urls.getCityPropsPath(query.city) + '?extra=description';
  const res = await fetch(url);
  if(res.status !== 200){
    const e = new Error("City not found");
    e.code = "ENOENT";  // Triggers a 404
    throw e;
  }
  const json = await res.json();
  json.country = query.country;

  json.properties.map(prop => {
    if (prop.images.length == 0) {
      prop.images = [
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
        { url: '/list-images/list-slide.png', caption: 'Property Image' },
      ];
    }
    return prop;
  });


  // check if users has authenticated
  const cookies = new Cookies(req ? req.headers.cookie : null);
  const auth_token = cookies.get('auth_token');
  if (auth_token) {
    try {
      const user = await axios.post(urls.getTokenVerifyPath(), { token: auth_token });
      json.user = { name: 'Team' }; //await user.data;
    } catch (err) {
      err.response && console.log(err.response.data);
    }
  }
  return { props: json }
}

export default pagewithLayout;
