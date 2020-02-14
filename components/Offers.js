import React, {useState, useEffect} from 'react'
import {getOfferPath} from './urls'
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import fetch from "isomorphic-unfetch"


const OfferCard = ({offer}) => <div className="gift_voucher pb-1">
  <h2><span className="timer"><img src="/icons/timer.svg"/> limited time offer</span></h2>
  <h5>{offer.title}</h5>
  <p className="info_cont" dangerouslySetInnerHTML={{__html: offer.details}}></p>
</div>;

const Offers = ({city , propCode}) => {
  const [props, setProps] = useState([]);
  useEffect(()=>{
      const urlPath = getOfferPath(city, propCode);
      fetch(urlPath).then((res) => res.json())
      .then((result) => {setProps(result.offers)})
      .catch((error) => {console.log(error)});
  },[]);

  return (
    !props.length?null:
        props.map((val, indx) => (<OfferCard key={indx} offer={val} />))
  );
}

export default Offers;
