import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import withLayout from '../../../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import BannerSlide  from '../../../components/BannerSlide';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import SimilarProp from '../../../components/similar-prop';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import css from "../../../public/style.css";
import custom from "../../../public/custom.css";
import ReviewTile  from '../../../components/review';
import FormSubmit  from '../../../components/FormSubmit';
import LocationMap  from '../../../components/google-map';
import CountryCode  from '../../../components/CountryCode';
import EnquireNowForm from '../../../components/EnquireNowForm';
import {InfoFormSchema} from '../../../components/FormValidationSchema';
import fetch from 'isomorphic-unfetch';
import * as urls from '../../../components/urls'
import { render } from 'react-dom';
import Select from "react-select"; // v1
import "react-select/dist/react-select.css";
import Dropdown from 'react-bootstrap/Dropdown';
import {NextSeo} from 'next-seo';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Offers from '../../../components/Offers'

const cookies = new Cookies();

function ListBanner({data}) {
    const [show, setShow] = useState(false);
    const [showSubmission, setSubmission] = useState(false);
    const [userInformation, setUserInformation] = useState({});
    const [openLightBox, setOpenLightBox] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const infoFormSubmitted = (values)=> {
      setUserInformation(values);
      setSubmission(true);
    }

    const onCarousalClick = (index)=> {
      setPhotoIndex(index);
       setOpenLightBox(true);
    }
    return (

    <section className="banner_sec">
  {openLightBox && (
          <Lightbox
            mainSrc={data.images[photoIndex].url}
            nextSrc={data.images[(photoIndex + 1) % data.images.length]}
            prevSrc={data.images[(photoIndex + data.images.length - 1) % data.images.length]}
            onCloseRequest={() =>setOpenLightBox(false)}
            clickOutsideToClose={true}
            onMovePrevRequest={() => {
              let index = (photoIndex + data.images.length - 1) % data.images.length;
              setPhotoIndex(index);
            }}
            onMoveNextRequest={() => {
              let index = (photoIndex + 1) % data.images.length;
              setPhotoIndex(index);
            }
            }
          />
        )}
    <Container>
    <Row>
    <Col md={5} xs={12}>
        <p className="breadcrum">
        <span>
            <a href='/'>
                Home
            </a>
        </span>>
          <span>
              <a href={'/'+data.country}>
                  {data.country_name}
              </a>
          </span>>
          <span>
              <a href={'/'+data.country+'/'+data.city}>
                  {data.city_name}
              </a>
          </span>>
          <span className="active">
              {data.name}
          </span>
        </p>
        <p className="rating">
            <img src="/icons/star.svg"/>
            <span className="red">{data.rating}</span>
            ({data.reviews_count})
        </p>
        <h1 className="main_head">{data.name}</h1>
        <p className="loc"><img src="/icons/pin.svg"/> {data.address} <span className="red">/</span> {data.time.car} drive from {data.nearest_place || "City Centre"}</p>
        <ul className="facilities_list">
          {data.apartment_facilities.slice(0, 4).map(facility => (
            <li><img src={"/icons/facilities/"+facility.kind+".svg"} title={facility.name} /> </li>
          ))}
        </ul>
        <hr className="banner_hr"/>
        <h3 className="prop_rate red">{data.min_price == data.max_price ? `£${data.min_price}` : `£${data.min_price} - £${data.max_price}`} <span>/week</span></h3>
        <ButtonToolbar className="list_det_btns">
        <Button variant="primary" size="lg" className="secondary-btn" onClick={handleShow}>
        <img src="/icons/chat.svg"/>  enquire
        </Button>
        {/* <Button variant="outline-dark" size="lg" className="btn-outline-secondary">
        <img src="/icons/fav.svg"/>  shortlist
        </Button> */}
        </ButtonToolbar>
        <Modal show={show} onHide={handleClose}
          className="enquirymodal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
         >
        <Modal.Body>
          <Row className="m-0">
            <Col md={6} xs={12} className="p-0">
              <div className="modal_img blue_bg white">
                <Image src={data.images.length > 0 ? data.images[0].url: "/list-images/prop1.png" } fluid/>
                <h3>{data.name}</h3>
                <p>{data.address}</p>
              </div>
            </Col>
            <Col md={6} xs={12} className="p-0">
              <div className="modal_form">
                <Button variant="default" onClick={handleClose}> ✕ </Button>
                {showSubmission?null:<p>Fill in the following details to complete your request.</p>}
                {showSubmission ? <FormSubmit data={data} userInformation={userInformation}/> : <EnquireNowForm infoFormSubmitted= {infoFormSubmitted} source={data.code} city={data.city} />}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Col>
    <Col md={7} xs={12}>
        <div className="banner_slide">
            <BannerSlide slides={data.images} onClickCarousal={(e) => {onCarousalClick(e);}}/>
        </div>
    </Col>
    </Row>
    </Container>
</section>
    );
}


const InfoForm = ({data, infoFormSubmitted}) => {
  let isSubmitLocked = false;

  return  <div>
      <Formik
        initialValues={{ fullname: '', countryCode:'44', source:data.code , email:'', phone:'', city: data.city}}
        validationSchema = {InfoFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          if(!isSubmitLocked) {
            isSubmitLocked = true;

            if(cookies.get('utm_source')) {
              values.utm_source = cookies.get('utm_source');
            }

            if(cookies.get('utm_campaign')) {
              values.utm_campaign = cookies.get('utm_campaign');
            }

            if(cookies.get('utm_medium')) {
              values.utm_medium = cookies.get('utm_medium');
            }

            if(cookies.get('utm_term')) {
              values.utm_term =  cookies.get('utm_term')
            }

            if(cookies.get('utm_content')) {
              values.utm_content =  cookies.get('utm_content');
            }

            if(cookies.get('referrer')){
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
                document.getElementById('studentButton').removeAttribute('disabled','disabled');
                let messageEl = document.getElementById('formMessage');
                messageEl.setAttribute('class','fade alert alert-success show');
                if (messageEl.textContent == undefined || messageEl.textContent == "") {
                    let textEl = document.createTextNode('Message sent successfully!');
                    messageEl.appendChild(textEl);
                }

                return response.json();
            }
          }).then(result => {
              isSubmitLocked = false;
              values.leadId = result.lead_id;
              infoFormSubmitted(values);
          }).catch((error) => {
            let messageEl = document.getElementById('formMessage');
            messageEl.setAttribute('class','fade alert alert-danger show');

            let textEl = document.createTextNode('There is some error, Please try later!');
            messageEl.appendChild(textEl);
            isSubmitLocked = false;
          });
          }

          setTimeout(() => {
            setSubmitting(false);
          }, 500);
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

          let timestamp;
          return (
            <form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlid="formFullName">
                  <Form.Control
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
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col}>
                <Form.Row>
                <Col md={4}>
                <Form.Control  size="md" as="select" onChange={(e)=> {values.countryCode = e.target.value; }}>
                <CountryCode/>
                </Form.Control>
                </Col>
                <Col md={8}>
                    <Form.Control size="md" type="number" placeholder="Phone" required name="phone" value={values.phone} onChange={handleChange}
                      isInvalid={touched.phone && errors.phone}
                    />
                </Col>
                  <Form.Control hidden isInvalid={touched.phone && errors.phone}/>
                  <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number.
                  </Form.Control.Feedback>
                </Form.Row>
              </Form.Group>
             </Form.Row>
             <Form.Row>
                <Form.Group as={Col} controlid="formEmail">
                  <Form.Control size="md" type="email" placeholder="Email" required name="email" value={values.email} onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email Address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button id="studentButton" type="submit" size="lg" block disabled={isSubmitLocked} className="shadow">submit</Button>
              <Form.Control hidden value= {values.source} />
              <div id="formMessage"></div>
              <p>By submitting form you agree to <a target="_blank" href="/terms" className="red">Terms</a> and <a href="/privacy-policy" target="_blank">Privacy policy</a> </p>

            </form>
          );
        }}
      </Formik>
    </div>
}

const GiftVoucher = () => <div className="gift_voucher pb-1">
    {/* <h2>gift <span className="red">voucher</span> <span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2> */}
    <h2><span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2>
    <h5>Gift Voucher</h5>
    <p>For every student who book with your referral, you get a <b className="red">£50</b> Amazon gift voucher</p>
    {/* <div className="img_cont">
        <div>
        <Image src="/list-images/amazon-logo.svg" fluid/>
        </div>
        <Image src="/list-images/gift.svg" fluid />
    </div> */}
</div>;

const CurrentDeals = () => <div className="gift_voucher">
    <h2><span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2>
    <h5>For every student who signs up with your referral you get a <b className="red">£50</b> Amazon gift voucher</h5>
    <p className="muted p-0 m-0 light">Refer a friend and get GBP 50 Amazon gift card/Cashback.</p>
    <div className="img_cont">
        <p>*t&c apply</p>
        <Image src="/list-images/gift.svg" fluid />
    </div>
</div>;

const PaymentBooking = ({data}) => {
  const [openpayment, setPayment] = useState(false);
  const [openbooking, setBooking] = useState(false);
  const showBooking = () => {
      if(!data.description.booking.deatils){
        return false;
      }
  }
  const showPayment = () =>{
    if(!data.description.payment.deatils){
      return false;
    }
    return true;
  }

  return <Tabs defaultActiveKey="payment" transition={false} id="payment_booking">
    <Tab eventKey="payment" title="Payment">
      <div className={`payment_details_area ${openpayment?'show_full_details':''}`}>
        <strong>{data.descriptions.payment.title}</strong>
        <p dangerouslySetInnerHTML={{__html: data.descriptions.payment.details}}></p>
     </div>
     <div className={`red underline_on_hover ${!showPayment?'hideReadmore':''}`} onClick={()=> setPayment(!openpayment)}>{openpayment?'Show Less..':'Read More..'}</div>
    </Tab>
    <Tab eventKey="booking" title="Booking">
      <div  className={`booking_details_area ${openbooking?'show_full_details':''}`}>
        <strong>{data.descriptions.booking.title}</strong>
        <p dangerouslySetInnerHTML={{__html: data.descriptions.booking.details}}></p>
      </div>
      <div className={`red underline_on_hover ${!showBooking?'hideReadmore':''}`} onClick={()=>setBooking(!openbooking)}>{openbooking?'Show Less..':'Read More..'}</div>
    </Tab>
</Tabs>;
}

const Faqs = ({data, renderElements}) => {
  return (
    <Accordion defaultActiveKey="0">
            {data.faqs.slice(0, renderElements).map((faq, i) => (
                <Card className="mt-1">
                    <Accordion.Toggle as={Card.Header} eventKey={i} className="faqHeader">{faq.q}
                    <span className="pull-right acc_icon"></span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i}>
                        <Card.Body><p dangerouslySetInnerHTML={{__html: faq.a}}></p></Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
    </Accordion>
  );
}

const Reviews = ({data}) =><Carousel className="review_slider">
    <Carousel.Item>
     <Row>
         <Col  md={6} xs={12}>
         <ReviewTile
            name="Tahran Gotla"
            src="/review/tahran-gotla.png"
            review= "UniAcco made it so simple. They just asked me for a few details and I am so happy with my property. They were so responsive and promptly answered all of my questions and any queries I could think of. Kudos to you guys"
            date="3 Nov 2019" />
         </Col>
         <Col  md={6} xs={12}>
         <ReviewTile
            name="Isabella Lewis"
            src="/review/isabella-lewis.png"
            review= "They made this experience amazingly swift. They\'ve helped me and my friend with everything starting from the accommodation that fits our budget to helping us on how to reach from the airport to our rooms. In my opinion, it can\'t get better than this. Truly thank you."
            date="16 Nov 2019" />
         </Col>
     </Row>
    </Carousel.Item>
    <Carousel.Item>
     <Row>
         <Col  md={6} xs={12}>
         <ReviewTile
            name="Ahmed Al-Hadi"
            src="/review/ahmed-al-hadi.png"
            review= "I am very particular in terms of everything, but Uniacco took care of it. They\'ve picked up my calls every time and been there 24/7 to help me. I came in at the last minute but still was able to find my accommodation and I am so happy with it."
            date="2 Dec 2019" />
         </Col>
         <Col  md={6} xs={12}>
         <ReviewTile
            name="Sajal Sharma"
            src="/review/sajal-sharma.png"
            review= "I want to take out time to thank Mitali for being so helpful in finding myself an accommodation. She answered my million questions that too with such calm. I truly appreciate her efforts and I am so happy I came across your website. It is so reliable and hassle free."
            date="3 Dec 2019" />
         </Col>
     </Row>
    </Carousel.Item>

  </Carousel>;

const ConfigFacility = ({facilities}) => {
  if (!facilities || facilities.length == 0) {
    return null;
  }
  return (
    <ul className="tag_list mt-2">
        {facilities.map(facility => (
          <li className="tag"><img src={"/icons/facilities/"+facility.kind+".svg"}/> {facility.name} </li>
        ))}
    </ul>
  )
}

const SubConfigCalculator = ({arr}) => {
    const [init, setInit] = useState(arr[0].price);
    const [lease, setLease] = useState(arr[0].lease)
    const subState = arr;
    const check = (ele,obj) =>{
          setInit(subState[ele].price);
          setLease(subState[ele].lease);
    }
    return (<>
      <Row className="align-items-center justify-content-xs-end justify-content-sm-start subconfig_cal_wrapper m-0 mb-2 m-md-0">
          <span className="subConfig_label_text">Total rent for &nbsp;</span>
            <Dropdown
            onSelect={(ele,obj) => {check(ele,obj)}}
            role="menu"
            className="text-center"
            size="sm"
            as={ButtonGroup}
             alignRight
            >
              <Button variant="success" className="btn_drop_subconfig">{lease}</Button>
              <Dropdown.Toggle split variant="success" className="toggle_drop_subconfig">
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDown_subConfig">
                {arr.map((ele,key) => (<Dropdown.Item key={key} eventKey={key}>{ele.lease}</Dropdown.Item>))}
              </Dropdown.Menu>
            </Dropdown>
          <span>&nbsp; weeks is</span><span className="red"> &nbsp; £{Math.round(init*lease * 100) / 100}</span>
          <style type="text/css" jsx>{`
            .dropDown_subConfig{
              left:-10% !important;
            }
            `}</style>
      </Row>
      </>);
}

const InfoSection = ({data}) => {
  const [showSubmission, setSubmission] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [showModalSubmission, setModalSubmission] = useState(false);

  const infoFormSubmitted = (values)=> {
    setUserInformation(values);
    setSubmission(true);
  }

  const infoFormModalSubmitted = (values)=> {
    setUserInformation(values);
    setModalSubmission(true);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (arg) => {
    setShow(true);
    setCode(arg);
  }
  const [open, setOpen] = useState(false);
  const [codeContainer, setCode] = useState();
return <section className="banner_sec info_sec">
  <Container className="prop_code_wrapper">
  <Row>
  <Col md={8} xs={12}>
      <GiftVoucher/>
      <Offers city={data.city} propCode={data.code}/>
        <p className="offerTNC pl-1" title='Offers are subject to change. To claim offer, please confirm with our executive before booking.'>*t&c apply </p>
      {data.intro && <>
      <h3 className="list_head"> Intro</h3>
      <hr/>
      <p className="info_cont" dangerouslySetInnerHTML={{__html: data.intro}}></p>
      </>}

      <hr/>
      <h5>Distance from {data.nearest_place || "City Centre"}</h5>
      <ul className="prop_det_list">
        <li title="By walk"><img src="/icons/facilities/walk.svg"/> {data.time.walk} </li>
        <li title="By train"><img src="/icons/facilities/train.svg"/> {data.time.train} </li>
        <li title="By car"><img src="/icons/facilities/Cab.svg"/> {data.time.car} </li>
      </ul>
      <br/>
      <h3 className="list_head innersec_space"> Apartment Facilities</h3>
      <ul className="tag_list">
        {data.apartment_facilities.map(facility => (
            <li className="tag"><img src={"/icons/facilities/"+facility.kind+".svg"}/> {facility.name} </li>
        ))}
      </ul>
      {data.community_facilities.length != 0 && <>
      <h3 className="list_head innersec_space"> Community Facilities</h3>
      <ul className="tag_list">
        {data.community_facilities.map(facility => (
            <li className="tag"><img src={"/icons/facilities/"+facility.kind+".svg"}/> {facility.name} </li>
        ))}
      </ul>
      </>}
      <h3 className="list_head innersec_space"> Configurations</h3>

      <div className="info_confi">
      {data.configs.map(config => (
      <Card className='confi_box'>
          <Card.Body>
          {config.sold_out&&<span class="sold_out_overlay"></span>}
              <p className="red confi_head mb-1">{config.name}
                <span><b>£{config.price}</b> / week</span>
              </p>
              <hr className="m-0 w-75" />
              <ConfigFacility facilities={config.facilities} />
          {/* <h3 className="list_head innersec_space">  Booking Deposit: £{config.deposit} </h3> */}
          <p dangerouslySetInnerHTML={{__html: config.description}}></p>
          {config.subconfigs &&
            <ul>
              {config.subconfigs.map(subconfig => <div>
                <li>{subconfig.lease} week lease (£{subconfig.price}/week) starts from {subconfig.available_from}, book now by paying £{subconfig.deposit}</li>
              </div>)}
            </ul>
          }

          <hr className="inner_space mb-2"/>
          {/* <ul className="card_img_list">
              <li><img src="/list-images/prop1.png"/></li>
              <li><img src="/list-images/prop2.png"/></li>
              <li><img src="/list-images/prop3.png"/></li>
              <li className="all_img"><img src="/list-images/prop1.png"/> <p>10+ images</p></li>
              </ul>
          <hr/>*/}
          <Row className="justify-content-between align-items-end">
            <Col xs={12} sm={7} md={7} lg={6} className="justify-content-start">
              {config.sold_out && <span className="red confi_head">[Sold Out]</span>}
              {config.subconfigs.length && !config.sold_out?
                <SubConfigCalculator arr={config.subconfigs} />:null
              }
            </Col>
            <Col md={5} lg={6} sm={5} xs={12} xl={3}>
              <Button variant="primary" size="lg" className="UniAcco_btn login_btn_shadow primary-btn book_btn pull-right"  onClick={() =>handleShow(config.code)}>book</Button>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose}
          className="enquirymodal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
         >
            <Modal.Body>
              <Row className="m-0">
                <Col md={6} xs={12} className="p-0">
                 <div className="modal_img blue_bg white">
                  <Image src={data.images.length>0 ? data.images[0].url : '/list-images/prop1.png'} fluid/>
                  <h3>{data.name}</h3>
                  <p>{data.address}</p>
                 </div>
                </Col>
                <Col md={6} xs={12} className="p-0">
                  <div className="modal_form">
                    <Button variant="default" onClick={handleClose}> ✕ </Button>
                    {showModalSubmission?null:<p>Fill in the following details to complete your request.</p>}
                    {showModalSubmission? <FormSubmit data={data} userInformation={userInformation}/> : <EnquireNowForm infoFormSubmitted={infoFormModalSubmitted} source={`${data.code} - ${codeContainer}`} city={data.city} /> }
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
      ))}

      <div className="innersec_space info_tabs">
          <PaymentBooking data={data} />
       </div>
       <div className="innersec_space">
       <h3 className="list_head innersec_space"> Faq </h3>
       <hr/>
       <div className="innersec_space info_accordian text-center">
        <div class="faq_wrapper_container">
          <Faqs data={data} renderElements={open?data.faqs.length:'3'}/>
        </div>
        <Button variant="primary" size="lg" onClick={()=>setOpen(!open)} className="UniAcco_btn login_btn_shadow btn faq_btn primary-btn">read all faq</Button>
       </div>

       </div>
       <div className="innersec_space review_sec">
       <h3 className="list_head innersec_space"> Reviews <b className="rating review_rate pull-right"><img src="/icons/star-outline.svg"/><span className="red">4.5</span> (123)</b> </h3>
       <div className="innersec_space">
          <Reviews />
       </div>

       </div>
      </div>


  </Col>
  <Col md={4} xs={12}>
      <div className="info_form">
      <h4 class="prop_rate white red_bg">{data.min_price == data.max_price
        ? `£${data.min_price} `
        : `£${data.min_price} - £${data.max_price}`} <span>/week</span>
      </h4>
      <Card className="formBox">
          <Card.Body>
           <ul>
            <li><img src="/icons/support_dark.svg"/>  24 X 7 Customer Support</li>
            <li><img src="/icons/verified_dark.svg"/>  Verified Property</li>
            <li><img src="/icons/discount_dark.svg"/>  Free Service</li>
           </ul>
           <hr/>
          {showSubmission?null:<p>Find the perfect home near your university.</p>}
          {showSubmission ? <FormSubmit data={data} userInformation={userInformation}/> : <InfoForm  data={data} infoFormSubmitted= {infoFormSubmitted}/>}
          </Card.Body>
          <SocialSharing />
      </Card>

      </div>
  </Col>
  </Row>

  </Container>

  </section>;
}

const SocialSharing = () => {

    const postFb = () =>{
      const pageURL = encodeURI(window.location.href);
      const page_title = 'FacebookShare'
      const message = encodeURI("Hey, checkout this awesome accommodation");
      PopupCenter(`https://www.facebook.com/sharer/sharer.php?u=${pageURL}&quote=${message}`,page_title);
    }
    const postTweet = () =>{
      const pageURL = encodeURI(window.location.href);
      const message = encodeURI("Hey, checkout this awesome accommodation");
        const page_title = 'TwitterShare';
        PopupCenter(`https://twitter.com/share?url=${pageURL}&text=\n${message}`,page_title);
    }

    const postWhatsapp = () =>{
      const pageURL = encodeURI(window.location.href);
      const message = encodeURI("Hey, checkout this awesome accommodation \n");
      const page_title = 'WhatsappShare';
      PopupCenter(`https://wa.me/?text=${message+pageURL}`,page_title);
    }

  const PopupCenter = (pageURL, title,w,h) => {
      var w = 500;
      var h = 500;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      return targetWin;
    }
    return (
      <>
        <Card.Body className="social_icon_container text-left pb-2 px-4 pt-0">
          <hr className="m-0" />
            <ul className="social_list mb-0 p-2 pl-3">
                <li onClick={() => postFb()}>
                  <img className="fb_social" src="/icons/facebook.svg"/>
                </li>
                <li onClick={() => postTweet()}>
                  <img className="tweet_social" src="/icons/twitter.svg"/>
                </li>
                <li onClick={() => postWhatsapp()}>
                  <img className="whatsapp_social" src="/icons/whatsapp.svg"/>
                </li>
            </ul>
        </Card.Body>
          <style type="text/css" jsx>
            {`
                .fb_social{
                  background-color:#3b5999;
                }
                .insta_social{
                  background-color:black;
                }
                .tweet_social{
                  background-color:#55acee;
                }
                .whatsapp_social{
                  height:50px;
                  width:60px;
                }

                .social_list > li > img{
                    box-shadow:3px -1px 8px 1px #80808073;
                }

                .social_list > li > img:hover{
                  cursor:pointer;
                  transform:scale(1.1)
                }
                .social_icon_container{
                  border-radius:0 0 12px 12px;
                }
             `}
          </style>
      </>
    );
}


const Marker = (props) => {
    const { color, name } = props;
    return (
    <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
    />
    );
};

const Location = ({data}) => {
  return <section>
            <LocationMap data={data} />
          </section>
}


const MetaInfo = ({data}) => {
  let desc = data.intro.replace('<p>','').replace('</p>','');
  desc = desc.replace(/(([^\s]+\s\s*){400})(.*)/);
  const meta = {
    title:`${data.name} | UniAcco`,
    description:desc,
    url: `https://uniacco.com/${data.country}/${data.city}/${data.code}`,
  };
  return <NextSeo
      title = {meta.title}
      description = {meta.description}
      cononical = {meta.url}
      openGraph= {{title: meta.title, description: meta.description, url: meta.url, images:[{url:`${data.images[0].url.split('?')[0]}`}]}}
    />
}

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  return <div>
  <MetaInfo data={this.props}/>
  <ListBanner data={this.props} />
  <InfoSection data={this.props} />
  <Location data={this.props} />
  <SimilarProp country={this.props.country} city={this.props.city} propCode={this.props.code}/>
  <section className="pb-0">
    <Image src="/list-images/listingimg.svg" fluid/>
  </section>
</div>;
}
}

const pageWithLayout = withLayout(Page);
pageWithLayout.getInitialProps = async ({ req, query }) => {
  const url = urls.getPropDetailsPath(query.country, query.city, query.propCode);
  const res = await fetch(url);
  if(res.status !== 200){
    const e = new Error("Property not found");
    e.code = "ENOENT";  // Triggers a 404
    throw e;
  }
  const json = await res.json();
  json.country = query.country;
  json.city = query.city;
  if (!json.images || json.images.length == 0) {
    json.images = [
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
      {url: '/list-images/list-slide.png', caption: 'Property Image'},
    ];
  }

  return {props: json}
}
export default pageWithLayout;
