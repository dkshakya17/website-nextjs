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

// const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   const defaultOptions2 = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData2,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   const defaultOptions3 = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData3,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

const GetInTouchSteps = ()=> (<div>
    <Container fluid>
        <Row>
            <Col md={{ span: 5, offset: 1 }}>

                <div className="howitworksCard">

                        <div>
                        <Image className='hiw_img' src='/hiw-step-1.png' fluid/>
                        </div>

                </div>
            </Col>
            <Col md={{ span: 4 }}>
              <div className="howBox">
                <h1 className="step1"><span className="hiwBullet bgBlue shadow">1</span> select your room</h1>
                <p>Enter your University, locality or property name and choose between various options based on your budget preferences, amenity requirements etc.</p>
                </div>
            </Col>
        </Row>
       {/* <div className="separatorline"></div> */}
        <Row className="howRow my-4 my-md-0 flex-wrap-reverse">
            <Col md={{ span: 5, offset: 1 }}>
            <div className="howBox">
                <h1 className="step2"><span className="hiwBullet bgOrange shadow">2</span> click on book now</h1>
                <p>When you find your room of choice, make a request to book and fill in the required details after which our booking experts will call you and guide you on the next steps, all for free. Alternatively, you can also put down the deposit on the portal itself.</p>
            </div>
            </Col>
            <Col md={{ span: 5 }}>
                <div className="howitworksCard">
                    <div>
                    <Image className='hiw_img' src='/hiw-step-2.png' fluid/>
                        </div>
                </div>
            </Col>
        </Row>
       {/* <div className="separatorline2"></div> */}
        <Row className="howRow">
            <Col md={{ span: 5, offset: 1 }}>
                <div className="howitworksCard">
                    <div>
                    <Image className='hiw_img' src='/hiw-step-3.png' fluid/>
                    </div>
                </div>
            </Col>
            <Col md={{ span: 5 }}>
             <div className="howBox">
                <h1 className="step3"><span className="hiwBullet bgdarkblue shadow">3</span> sign your contract</h1>
                <p>Sign your contract digitally on the portal and you're all set. You will pay your rent directly to the property. The services that we provide are completely free of cost.</p>
              </div>
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
        .howitworksCard{
          text-align:center;
        }
        .howitworksCard>div{
          max-width: 300px;
          margin:0 auto;
        }
        p {
            margin-left: 3rem;
            padding-top: 0.5;
            line-height: 1.4em;
            color: #101A42;
            opacity : 85%;
            font-size: 18px;
            font-family: 'Clarika Grotesque';
            text-align: left;
        }
        div.howBox{
          margin-top: 10%;
        }
        .lotties{
            display: grid;
            grid-template-columns: auto auto;
          }

        .orangeText{
            color: #F05B4E;
        }


        img.hiw_img.img {
            max-width: 400px;
        }
        @media screen and (max-width:700px){
           div.howBox{
             margin-top:0 !important;
           }

           h1{
             margin-left:1rem;
             padding-top:0.5rem;
           }

           p{
             margin-left:1rem;
           }
        }

        `}</style>
    </Container>
    </div>);

export default GetInTouchSteps;
