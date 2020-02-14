import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Header from './Header';
import Footer from './Footer';
import TagManager from 'react-gtm-module';
import {NextSeo} from 'next-seo';


const tagManagerArgs = {
    gtmId: 'GTM-58BDCBD',
}

const cookies = new Cookies();

const withLayout = Page => {
    if (process.browser && process.env.NODE_ENV == 'production') {
        TagManager.initialize(tagManagerArgs)
    }

    return class extends React.Component {
        constructor(props) {
            super(props);
            if(!cookies.get('referrer')){
                cookies.set("referrer",ReactDOM.referrer,{ path: '/' });
            }

            if(props.url.query.utm_campaign) {
                cookies.set("utm_campaign", props.url.query.utm_campaign);
            }

            if(props.url.query.utm_medium) {
                cookies.set("utm_medium", props.url.query.utm_medium);
            }

            if(props.url.query.utm_term) {
                cookies.set("utm_term", props.url.query.utm_term);
            }

            if(props.url.query.utm_content) {
                cookies.set("utm_content", props.url.query.utm_content);
            }

            if(props.url.query.utm_source) {
                cookies.set("utm_source", props.url.query.utm_source);
            }
        }

        componentDidMount(){
          if(!cookies.get('referrer') || cookies.get('referrer') === 'undefined'){
              let val = document.referrer;
              cookies.set("referrer",val,{ path: '/' });
          }
        }

        render() {
            return  <div>
                    <head>
                        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                        <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                       />
                    </head>

                    <NextSeo
                      title = 'Student Accommodation ◆ Compare, Consult & Choose ◆ UniAcco'
                      description = 'Compare, consult & choose your Student Accommodation from a wide range of premium and affordable student flats, lodges, studio apartments, ensuites, premium halls and more near your university.  ✔Property Consultation  ✔Student Loan  ✔Concierge Services  ✔Guarantor  ✔Community  ✔Visa Consultation.'
                      openGraph = {{
                        type: 'website',
                        locale: 'en_IE',
                        url: 'https://uniacco.com/',
                        title: 'Student Accommodation ◆ Compare, Consult & Choose ◆ UniAcco',
                        description: 'Compare, consult & choose your Student Accommodation from a wide range of premium and affordable student flats, lodges, studio apartments, ensuites, premium halls and more near your university.  ✔Property Consultation  ✔Student Loan  ✔Concierge Services  ✔Guarantor  ✔Community  ✔Visa Consultation.',
                        images: [{url:'https://uniacco.com/uniacco-logo.jpg'}],
                        site_name: 'UniAcco',
                        imageWidth: 1200,
                        imageHeight: 1200
                      }}
                    />

                    <div>
                    <Header />
                      <Page {...this.props.props}/>
                    <Footer />
                    </div>
                    <>
                    <style type="text/css">{`
                        @font-face {
                            font-family: 'Clarika Grotesque';
                            src: url("/clarika-grot-regular.otf") format("opentype");
                        }
                        @font-face {
                            font-family: 'Clarika Grotesque';
                            font-weight: bold;
                            src: url("/clarika-grot-bold.otf") format("opentype");
                        }
                        body {
                            font-family: 'Clarika Grotesque','sans-serif';
                        }
                        div.formBox .form-control {
                            background-color: rgba(155, 167, 190, 0.1 );
                            border: none;
                        }
                        .footerDiv .list-group-item {
                            border: none;
                        }
                        .bookAccBox {
                            // max-width: 18em;
                            // padding: 4em;
                        }
                        .carousel-item img {
                            min-height: 26em;
                            max-width: 80%;
                            position: relative;
                            left: 10.4%;
                        }
                        #studentButton, #listhomeButton, #contactButton {
                            background-color: #F05B4E;
                            border: 1px solid #F05B4E;
                        }
                        #studentButton:hover, #listhomeButton:hover, #contactButton:hover {
                            background-color: #C22C1E;
                            border: 1px solid #C22C1E;
                        }
                        .footerDiv button {
                            background-color: #054D7F;
                            padding: 0.7em 3em;
                            box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
                            font-weight: 600;
                        }
                        .bg-l-orange {
                            background-color: #F05B4E;
                        }
                        .f4 {font-size: 1.5em;}
                        .f6 {font-size: 1em;}
                        .px-15 {
                            padding-left: 8rem !important;
                            padding-right: 8rem !important;
                        }

                        .minHeight28 {
                            min-height: 28em;
                        }
                    `}</style>
                    </>
                </div>
        }
    }
};

export default withLayout;
