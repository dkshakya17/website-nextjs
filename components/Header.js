import React from "react";
import Link from 'next/link';
import Container from 'react-bootstrap/Container';

import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CookiesDisplay from '../components/CookiesDisplay'

// const linkStyle = {
//   marginRight: 15
// };

// const layoutStyle = {
//     margin: 20,
//     padding: 20,
//   };

const Header = () => (
  <header>
    <CookiesDisplay/>
    <Navbar collapseOnSelect expand="lg">
    <Navbar.Brand href="/">
      <Image src="/logo.svg" alt="logo"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
  </Nav>
        <Nav>
        <Nav.Item className="contact_text_margin">
      <div className="align_center mr-5">
                      <div className="header_icon_bg mr-2">
                      <a target="_blank" href="https://api.whatsapp.com/send?phone=447428879521">
                        <img src="/icons/whatsapp.svg" />
                      </a>
                      </div>
                      <div className="whatsApp_text">
                          <a target="_blank" href="https://api.whatsapp.com/send?phone=447428879521" className="mb-0 contact_color header_contact_text"><img src="/icons/whatsapp_text.svg" /></a>
                      </div>
                  </div>

      </Nav.Item>
      <Nav.Item className="contact_text_margin">
      <div className="align_center mr-5">
                      <div className="header_icon_bg  mr-2">
                      <a href="tel:+44 808 168 1080" >
                        <img src="/icons/Phone.svg" />
                      </a>
                      </div>
                      <div>
                           <a href="tel:+44 808 168 1080" className="mb-0 contact_color header_contact_text">+44 808 168 1080</a>
                      </div>
                  </div>

      </Nav.Item>


        <Nav.Item>
            <Nav.Link href="/how-it-works">how it works</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/list-home">host a home</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                <Link href="/#explore"><Button className="UniAcco_btn primary_color login_btn_shadow explore_btn_wd contact_text_margin">explore</Button></Link>
                </Nav.Item> */}

    </Nav>
    </Navbar.Collapse>
      </Navbar>
        <style type="text/css"> {`

        .whatsApp_text img{
            width: 65px;
        }

        .align_center {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
      }

  .contact_email_content a:hover {
    color: #f05c4e !important;
  }

  .navbar {
    border-left: 10px solid #f05c4e;
    padding: 0.6rem 4rem;
  }


.navbar-nav{
  align-items: center;
}

.navbar .nav-item .nav-link{
  font-size: 15px;
  color: #2a2e31;
  font-family: 'Conv_clarika-grot-bold';
  margin-right: 20px;
  border: 1px solid transparent;
  /* padding-top: 12px; */
}

.navbar .nav-item .nav-link:hover{
  color: #2a2e31;
}


.header_contact_text{
  font-family: 'Conv_clarika-grot-bold';
  font-size: 15px;
}

.contact_color{
  color: #054d7f;
}

.mr-5 {
  margin-right:2rem !important;
}

.login_btn_shadow{
  box-shadow:4px 3px 14px 0px #fbdab6;
}

  .header_icon_bg{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27px;
    height: 27px;

    box-shadow: 4px 2px 14px 0px #efe4d8;
    border-radius: 50%;
  }

  .header_icon_bg img {
    width:25px;
    height:25px;
  }

 .UniAcco_btn {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding:  5px 15px;
    font-family: 'Conv_clarika-grot-bold';
    font-size: 15px;
    line-height: 1.5;
    border-radius: 12px;
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #fff;
}
.primary_color{
  background-color: #f05c4e;
}

.nav{
  justify-content: space-between;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  color: #fff !important;
  background-color: #f05c4e !important;
  border-color: 1px solid transparent !important;
}

.nav-tabs .nav-link{
  /* border: 1px solid #f05c4e!important; */
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-radius: 0.25rem !important;
}

.nav-link_tab{
  font-size: 18px;
  color: #f05c4e;
  font-family: 'Conv_clarika-grot-regular';
}

.nav-tabs{
  border: 1px solid transparent !important;
}



@media only screen and (min-width: 320px) and (max-width: 575px){

  .navbar {
    border-left: 0px solid #f05c4e;
    padding: 0.5rem 1rem;
  }


.navbar-nav .nav-link {
  padding-right: 10px;
  margin: 0px;
  padding-left: 10px;
  text-align: center;
}
}

.navbar-nav{
  align-items: flex-start;
}

.explore_btn_wd{
  width: 100%;
}

@media screen and (max-width: 991px){
.contact_text_margin{
margin: 20px 0px;
}
.header_contact_text{
  font-size: 18px;
}
}

.contact_text_margin {
  margin-top: 5px;
}

`}
    </style>
</header>
);

export default Header;
