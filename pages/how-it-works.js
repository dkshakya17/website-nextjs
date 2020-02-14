import React from 'react';
import withLayout from '../components/MyLayout';
import Page from '../components/PageLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { CardBody } from 'react-bootstrap/Card';
import css from '../public/style.css';
import Image from 'react-bootstrap/Image';
import Lottie from 'react-lottie';
import animationData from '../public/vectors/step1.json'
import animationData2 from '../public/vectors/step2.json'
import animationData3 from '../public/vectors/step3.json'
import HowItWorks from '../components/how-it-works';


const title = {blue: 'how it', orange: 'works'}
 
const pageWithLayout = withLayout(Page(title, HowItWorks));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
  