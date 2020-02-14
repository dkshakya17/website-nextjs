import withLayout from '../components/MyLayout';
import Page from '../components/PageLayout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {NextSeo} from 'next-seo';

function getTeam() {
    return [
      { image: '/team/nikhil.jpeg', name: 'Nikhil Soni', designation: 'Head, Technology & Product', bio: 'IIT Mumbai Alumni', linkedin: 'https://www.linkedin.com/in/krsoninikhil/' },
      { image: '/team/abhishek.png', name: 'Abhishek Sharma', designation: 'VP Marketing & Demand Sourcing', bio: 'IIT Mumbai Alumni', linkedin: 'https://www.linkedin.com/in/abhisheksharma-1/'},
      { image: '/team/animesh.png', name: 'Animesh Banerjee', designation: 'Business Analyst & Growth Influencer', bio: 'IIT Mumbai Alumni', linkedin: 'https://in.linkedin.com/in/animesh-banerjee-b57008107' },
      { image: '/team/aditya.jpeg', name: 'Aditya Shukla', designation: 'Brand Manager', bio: 'IIT Mumbai Alumni', linkedin: 'https://www.linkedin.com/in/adityashukla08'},
      { image: '/team/sanya.png', name: 'Sanya Singh', designation: 'Head, Growth & International Relations', bio: 'IIT Mumbai Alumni', linkedin: 'https://in.linkedin.com/in/sanya-singh-b58b55143' },
      { image: '/team/gajendra.png', name: 'Gajendra Garg', designation: 'Head, Supply & Portfolio', bio: 'IIT Mumbai Alumni', linkedin: 'https://www.linkedin.com/in/gajendra-garg-46ba8491' },
    ];
}

const MetaInfo = () => {
  const meta = {
    title:'About Us | UniAcco',
    description:'	UniAcco intends to take up the challenge by strengthening disruptive prop-tech and innovation driven approaches by integrating technology and machine learning. Our services include ✔Property Consultation ✔Student Loan ✔Concierge Services ✔Guarantor ✔Community ✔Visa Consultation.',
    keywords:'about uniacco, what is uniacco, uniacco team, uniacco founder',
    url: 'https://uniacco.com/about-us',
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

const Team = () => <Row>
    <div className="w-100">
        <Row className="container w-100 mx-auto">
            {getTeam().map(post => (
                <Col md={4} className="mt-3 px-md-4">
                    <Card className="text-left mx-3 teamCard">
                        <Card.Body className="p-0">
                            <Image src={post.image} className="teamSinglePhoto col-12 p-0" fluid/>
                            <div className="p-3 mt-1">
                                <h5>{post.name}</h5>
                                <p className="mb-1">{post.designation}</p>
                                <a href={post.linkedin} target="_blank"><img src="/icons/linkedin2.svg" /></a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
    <style jsx>{`
    h1 {
        color: white;
        font-weight: 600;
    }
    hr {
        background-color: #F05B4E;
        width: 4em;
        height: .2em;
        //margin-bottom: 5px;
    }
    h5 {
        color: #054D7F;
        text-align: center;
        font-family: 'Clarika Grotesque';
        line-height: 1em;
        //font-size: 22px;
        //margin-top: 1em;
    }
    h6 {
        font-family: 'Clarika Grotesque';
        //font-size: 32px;
        //font-weight: 600;
        // margin-top: 2em;
        color: #054D7F;
        text-align: center;
    }
    p {
        line-height: 4em;
        color: rgba(16, 26, 66, 0.5);
        font-size: 18px;
        font-family: 'Clarika Grotesque';
        text-align: center;
    }
    div {
        margin-top: 2em;
        padding-top: 5em;
    }
    div.card {
        min-height: 21em;
    }
    div.card-body {padding: 0 !important;}
    img {width: 20px;}
    `}</style>
</Row>;

const content = () => <div>
    <MetaInfo />
    <Container>
        <Row>
            <Col md={{ span: 4 }}>
                <Image src="/aboutus-img.png" fluid />
            </Col>
            <Col className="textBox" md={{ span: 7, offset: 1 }}>
                <h3><span>We help students find their perfect home.</span></h3>
                <p>UniAcco is a platform that aims to make your transition to the student life easier and smoother, as flat as a pancake.</p>
                <p>"Adventure must start with running away from home", and we help you with it by building a strong foundation and providing you with the most budget friendly and verified accommodations.</p>
                <p>We cut down on your worries with our consultation services, giving your decisions a quicker turn round and proffer a better sense of how your journey will transpire.</p>
            </Col>
        </Row>
        <Row>
            <Col className="textBox" md={{ span: 7 }}>
                <h3><span>Our Logo.</span></h3>
                <p>UniAcco logo represents a home, elucidating with its sharp edges, the strength and futuristic aspects along with the comfort signified by the curved edges. The “A” shaped roof-top stands for Accommodation and the bottom shaped “U” stands for University, bringing together its meaning of University Accommodation.</p>
                <p>Orange being the colour of enthusiasm, creativity and change perfectly depicts our millennial friendly approach and the blue represents the comfort, safety and security that we aim to provide.</p>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
                <Image src="/about-logo.png" fluid />
            </Col>
        </Row>
    </Container>
    <div className="mt-5 pt-md-5" fluid>
        <Container>
            <Image src="/top_header.png" fluid />
            <Row className="heroRow pb-md-5">
                <Col>
                    <h2 className="teamHeading">team</h2>
                </Col>
            </Row>
        </Container>
    </div>
    <Container fluid className="p-2">
        <Row>
            <Col md={{ span: 4, offset: 1 }} className="mt-5">
                <Image src="/amit.png" fluid />
            </Col>
            <Col md={{ span: 6 }} className="p-0 p-md-2">
                <Card className="p-md-3 shadow">
                    <Card.Body>
                        <h2 className="teamName">Amit <span>Singh</span></h2>
                        <p>Amit has spent 20 years in Financial Service and Real Estate Industry commanding particular areas like Corporate, Distribution, Treasury Sales and Product Structuring. He is a High-profile expert in constructing relationships with UNHW clients and manifesting creative ideas. He has been an essential part of esteemed organizations like Birla Sunlife Asset Management Company, Standard Chartered Bank, IDFC Investment Advisors and Tata AMC. His self-determination and mind have always preferred possibilities which happen due to pragmatic measures.</p>
                        <a href="https://in.linkedin.com/in/amit-singh-aa09b2137" target="_blank"><img src="/icons/linkedin2.svg" /></a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={{ span: 6, offset: 1}} className="order-1 md-order-2 p-0 p-md-2">
                <Card className="p-md-3 shadow">
                    <Card.Body>
                        <h2 className="teamName">Sayantan <span>Biswas</span></h2>
                        <p>Hailing from an IIT background, Sayantan Biswas has 4+ experience working in the core team of prop-tech startups. His recognition at the prestigious Thiel Fellowship Summit and at Draper University substantiate his business acumen. During his professional stint at Fella Homes and Amberstudent, he was spearheading sales team and was responsible for evolving sales processes as well as driving efficiencies.</p>
                        <a href="https://www.linkedin.com/in/sayantan-biswas-76918a82/" target="_blank"><img src="/icons/linkedin2.svg" /></a>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={{ span: 4, offset: 0 }} className="pt-3 order-2 md-order-1">
                <Image src="/sayantan.png" fluid />
            </Col>
        </Row>
    </Container>
    <style jsx>{`
        .teamHeading {
            margin-top: -1.7em;
            text-align: center;
            font-weight: bold;
            font-size: 3em;
            color: white;
        }
        @media only screen and (max-width: 600px) {
            .teamHeading {
                margin-top: -1.2em;
                font-size: 1.5em;
            }
        }
        a img {width: 20px;}
    `}</style>
    <Team></Team>
    <p></p>
</div>;

const title = {blue: 'about', orange: 'us'};

const pageWithLayout = withLayout(Page(title, content));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
