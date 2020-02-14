import React , {useState} from 'react'
import axios from 'axios'
import withLayout from '../components/MyLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import * as urls from '../components/urls';
import fetch from 'isomorphic-unfetch';

class Page extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          cityData:props,
          prevCount:0,
          UniversityDetails:[],
          fetchData:true
        }
    }

    componentDidMount(){
      if(this.state.fetchData){
          this.fetchUniversityDetails();
      }
    }

    async fetchUniversityDetails(){
      const url = urls.getPlacesInCountry(this.state.cityData.country,this.state.prevCount+1);
      var res;
      var json;
      try{
        res = await fetch(url);
        json = await res.json();
      }catch(e){
        return;
      }
      let arr = this.state.UniversityDetails;
      this.setState({UniversityDetails:arr.concat(json.places)});
      if(json.places.length === 0){
          return;
      }
      let intVal = this.state.prevCount;
      this.setState({prevCount:intVal+1});
      this.fetchUniversityDetails();
    }

    render(){
        return <>
            <Hero />
            <DataSection cityData = {this.state.cityData} />
            <UniversitySection uniData = {this.state.UniversityDetails} />
            </>
        }

}

const Hero = () => {
  return <>
    <Container fluid className="d-flex country_hero align-items-center justify-content-lg-end">
      <div class="time_square_img">
        <img src="/Layer.svg"></img>
      </div>
      <Row className="justify-content-end px-4 justify-content-sm-center align-items-center">
          <Col lg={6} md={8} xs={12} className="justify-content-center align-items-center">
            <h2 className="country_heading_first">Where are you <span>going?</span></h2>
            <h5 className="country_heading_intro">Find the best student housing in United Kingdom</h5>
            <p className="country_heading_context">Find out more about most popular United Kingdom cities and universities for student housing by selecting below or try searching by university, city or neighborhood.</p>
          </Col>
      </Row>
    </Container>
    <style type="text/css">
      {`
      .country_hero{
        background:url('/Artboard.png') no-repeat;
        height:400px;
        background-position:bottom;
        background-size:cover;
        background-color:#c1cbdd2b;
        width:100%;
        position:relative;
        margin:0;

      }

      .time_square_img{
        position:absolute;
        bottom:0;
        left:10%;
        max-height: 400px;
      }
      .time_square_img > img{
        max-height:200px;
        max-width:459px;
        opacity:0.2;
      }
      .country_heading_first{
        font-size: 2.5rem;
        color: #101a42;
        font-weight: bold;
        margin-bottom:1rem;
      }
      .country_heading_intro{
        color: #66728a;
        font-size: 0.9rem;
        font-weight: bold;
        margin-top:1rem 0;
      }
      .country_heading_context{
          color: #4e5365;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.21;
      }

      @media screen and (min-width:540px){
        .country_hero{
          height:340px;
        }
        .time_square_img > img{
          max-height:310px;
        }
      }

      @media screen and (min-width:1024px){
        .country_hero{
          height:450px;
          background-position:bottom;
          background-size:contain;
        }
        .time_square_img > img{
          max-height:400px;
          max-width:459px;
          opacity:1;
        }
      }

      `}
    </style>
    </>
}

const DataSection = ({cityData}) => {
    let cityList = (
      <Container className="justify-content-center mt-5">
        <Row sm={10} md={10} xs={10} lg={10}>
          <Col xs={{span:12,offset:0}} sm={{span:11, offset:1}} lg={{span:11,offset:1}} xl={{span:11,offset:1}}>
            <h3 className="country_page_headings">Student housing in United Kingdom</h3>
          </Col>
        </Row>
        <Row sm={10} md={10} xs={10} lg={10} className="country_content_container d-flex flex-wrap px-3 justify-content-between">{
          cityData.cities.map((val,key) => {
            return (
              <Col xs={{span:6,offset:0}} sm={{span:5, offset:1}} lg={{span:3,offset:1}} xl={{span:2,offset:1}} className="py-2 pt-1" key={key}>
                    <a className="city_link_item" href={val.link}>{val.name}</a>
              </Col>
            );
          })}
        </Row>
        <style type="text/css" jsx>
          {`
            .country_content_container{
              border-bottom:1px solid #00000036;
            }
          `}
        </style>
     </Container>
    )
    return(
      <div>
        {cityList}
      </div>
    );
}

const UniversitySection = ({uniData}) => {
  let uniList = (
    <Container  className="justify-content-center mt-5">
      <Row sm={10} md={10} xs={10} lg={10}>
        <Col xs={{span:12,offset:0}} sm={{span:11, offset:1}} lg={{span:11,offset:1}} xl={{span:11,offset:1}}>
          <h3 className="country_page_headings">Student housing for universities in United Kingdom</h3>
        </Col>
      </Row>
      <Row sm={10} md={10} xs={10} lg={10} className="d-flex flex-wrap px-3 country_content_container justify-content-between">{
          uniData.map((val,key) => {
          return (
            <Col xs={{span:12,offset:0}} sm={{span:5, offset:1}} lg={{span:3,offset:1}} xl={{span:2,offset:1}} className="px-2 py-1" key={key}>
                <a className="city_link_item" href={val.link}>{val.name}</a>
            </Col>
          );
        })}
      </Row>
      <style type="text/css">{`
        .city_link_item{
          color:#000000;
          opacity: 0.75;
          font-size: 16px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.5;
          letter-spacing: normal;
          text-align: left;
        }
        .city_link_item:hover{
          text-decoration:none;
          color:#f05b4e;
        }
        .country_content_container{
            padding-top:1.5rem;
            padding-bottom:1.5rem;
        }
        .country_page_headings{
          font-size: 24px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          text-align: left;
          color: #f05b4e;
          margin:0;
        }

        @media screen and (max-width:540px){
          .country_page_headings{
            font-size:20px;
          }
        }
        `}</style>
    </Container>
  )

  return (
    <>
      {uniList}
    </>
  );
}

const pagewithLayout = withLayout(Page);
pagewithLayout. getInitialProps = async ({ req, query }) => {
  const url = urls.getCitiesInCountry(query.country);
  const res = await fetch(url);
  if(res.status !== 200){
    return {};
  }
  const json = await res.json();

   json.country = query.country;
   return {props: json};
}

export default pagewithLayout;
