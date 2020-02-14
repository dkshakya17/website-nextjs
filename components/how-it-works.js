import React from 'react';
import withLayout from '../components/MyLayout';
import Page from '../components/PageLayout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { CardBody } from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import css from "../public/style.css";
import Lottie from 'react-lottie';
import animationData from '../public/vectors/step1.json'
import animationData2 from '../public/vectors/step2.json'
import animationData3 from '../public/vectors/step3.json'
import {NextSeo} from 'next-seo';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const MetaInfo = () => {
    const meta = {
      title:'How to Book Student Accommodation | UniAcco',
      description:'Step-by-step guide to book your accommodation with UniAcco. Explore our wide range of premium and affordable student flats, lodges, studio apartments, ensuits, premium halls and more near your university. ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.',
      keywords:'how to book student accommodation, how to book student homes',
      url: 'https://uniacco.com/how-to-book',
      type:'generic'
    };
    return <NextSeo
        title = {meta.title}
        description = {meta.description}
        cononical = {meta.url}
        keywords = {meta.keywords}
        openGraph= {{title: meta.title, description: meta.description, url: meta.url, type:meta.type}}
      />
  }

const HowItWorks = ()=> (<div>
    <MetaInfo />
    <Container fluid>
        <Row>
            <Col md={{ span: 5, offset: 1 }}>

                <div className="howitworksCard">

                        <div>
                            <Lottie options={defaultOptions}

                                    />
                        </div>

                </div>
            </Col>
            <Col className="howBox" md={{ span: 4 }}>
                <h1 className="step1"><span className="hiwBullet bgBlue shadow">1</span> select your room</h1>
                <p>Enter your University, locality or property name and choose between various options based on your budget preferences, amenity requirements etc.</p>
            </Col>
        </Row>
       {/* <div className="separatorline"></div> */}
        <Row className="howRow">
            <Col className="howBox" md={{ span: 5, offset: 1 }}>
                <h1 className="step2"><span className="hiwBullet bgOrange shadow">2</span> click on book now</h1>
                <p>When you find your room of choice, make a request to book and fill in the required details after which our booking experts will call you and guide you on the next steps, all for free. Alternatively, you can also put down the deposit on the portal itself.</p>
            </Col>
            <Col md={{ span: 5 }}>
                <div className="howitworksCard">
                    <div>
                            <Lottie options={defaultOptions2}
                                    />
                        </div>
                </div>
            </Col>
        </Row>
       {/* <div className="separatorline2"></div> */}
        <Row className="howRow">
            <Col md={{ span: 5, offset: 1 }}>
                <div className="howitworksCard">
                    <div>
                            <Lottie options={defaultOptions3}

                                    />
                        </div>
                </div>
            </Col>
            <Col className="howBox" md={{ span: 5 }}>
                <h1 className="step3"><span className="hiwBullet bgdarkblue shadow">3</span> sign your contract</h1>
                <p>Sign your contract digitally on the portal and you're all set. You will pay your rent directly to the property. The services that we provide are completely free of cost.</p>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col md={{ span: 8, offset: 2 }} className="px-1 px-md-1 pt-1 my-1">
                <Card className="giftBox px-md-1 pt-1">
                    <Card.Body>
                        <h3> have <span className="orangeText">questions?</span></h3><br/>
                        <Row>
                            <Col md={6} xs={12}>
                                <Card className="innerCardhiw bgOrange">
                                    <Card.Body>

                                    <Image className='cardIcons' src='/mail.svg' fluid/>
                                        <a href="mailto:contact@uniacco.com">contact@uniacco.com</a>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} xs={12}>
                                <Card className="innerCardhiw bgBlue">
                                    <Card.Body>


                                    <Image className='cardIcons' src='/phone.svg' fluid/>


                                        <a href="tel:+44 742 887 9521" className='contact-text'>+44 742 887 9521</a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <style jsx>{`
        .step1 {
            color: #054D7F;
        }

        .step2 {
            color: #F05B4E;
        }

        .step3 {
            color: #101A42;
        }
        p {
          text-align: left;
        }
        h1 {
            padding-top: 1em;
            font-family: 'Clarika Grotesque';
            font-weight: 600;
            text-align: left;
            color: #054D75;
        }
        h2 {
            font-family: 'Clarika Grotesque';
            font-size: 3.6em;
            font-weight: 600;
            text-align: center;
            color: #054D75;
        }

        h3 {
            padding-top: 0.5em;
            font-family: 'Clarika Grotesque';
            font-size: 1.6em;
            font-weight: 600;
            text-align: center;
            color: #101A42;
        }
        p {
            margin-left: 3em;
            padding-top: 0.5;
            line-height: 1.4em;
            color: #101A42;
            opacity : 85%;
            font-size: 18px;
            font-family: 'Clarika Grotesque';
            text-align: left;
        }

        .lotties{
            display: grid;
            grid-template-columns: auto auto;
          }

        .orangeText{
            color: #F05B4E;
        }
        @media (max-width: 768px) and (min-width: 320px) {
            div.howBox>h1 {
            font-size: 26px !important;
            }

        }

        `}</style>
    </Container>
    </div>);

export default HowItWorks;
