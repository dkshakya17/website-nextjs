import React, { useState } from 'react';
import PopularCities from '../components/popular-cities';
import PopularProperties from '../components/popular-properties';
import Hero from  '../components/hero';
import OurServices from '../components/our-services';
import withLayout from '../components/MyLayout';
import BookAccomodation from '../components/book-accomodation';
import CustomerReviews from '../components/customer-reviews';
import Image from "react-bootstrap/Image";
import FeaturedIn from "../components/FeaturedIn";
import { connect } from 'react-redux';

const LandingPage = () => (
 <main>
  <Hero/>
  <OurServices />
  <PopularProperties />
 <PopularCities/>
 <BookAccomodation/>
 <CustomerReviews/>
 <FeaturedIn/>
 <section>
    <Image src="/list-images/listingimg.svg" fluid/>
  </section>
 <style type="text/css"> {`
  .card_sub_heading{
    font-size: 14px;
    font-family: 'Conv_clarika-grot-regular';
    color: #9ba7be;
}
 `}
 </style>
 </main>
)

const pageWithLayout = withLayout(LandingPage);
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
