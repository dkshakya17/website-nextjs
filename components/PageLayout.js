import Container from 'react-bootstrap/Container'
import React from "react";
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const layoutStyle = {
    margin: 0,
    padding: 45,
};

const Page = (title, Content) => {
    return () => <div>
        <Container fluid>
            <div className="watermark pt-1 pt-md-5">
            <Row className="heroRow pt-md-5">
                <Col md={{ span: 10, offset: 2 }}>
                    <h1> {title.blue} <span class="orangeText"> {title.orange} </span></h1>
                </Col>
            </Row>
            </div>
            <style jsx>{`
            span {
            color: #F05B4E;
            }
            h1 {
                font-family: 'Clarika Grotesque';
                font-size: 4rem;
                font-weight: 600;
                color: #101a42;
            }
            .watermark {
                background-image: url("/UniAcco.png");
                min-height: 30vh;            
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            `}</style>

            <div className="mx-md-5 my-5">
                <div className="center">
                    <article className="center mb-5 pb-5 px-md-5">  
                        <Content />
                    </article>
                </div>
            </div>
        </Container>
    </div>;
}

export default Page;