import React, {useState} from 'react';
import Image from 'react-bootstrap/Image';
 
const Loader = (props) => {
 return (<React.Fragment>
<div className="loader d-flex align-items-center">
    <Image src="/loader-V2.gif"/>
</div>
<style>
{`
.loader {
    opacity:0.8;
    background-color:white;
    position:fixed;
    width:100%;
    height:100%;
    justify-content:center;
    top:0px;
    left:0px;
    z-index:1000;
}
.loader img {
    max-width: 100px;
}
`}
    </style>
    </React.Fragment>);
}

export default Loader;