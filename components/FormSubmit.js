import React from 'react';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Link from 'next/link';

const FormSubmit = (props) => {
    return (
      <div className="form_submit" >
        <p className="img"><Image src="/success.gif" fluid/></p>
        <h5>Your enquiry has been successfully
        received. You will be contacted within
        <b className="red"> 24 hours </b>
         via email/phone</h5>

        {
          props.data && props.userInformation ?
          <React.Fragment>
          <p>To complete your booking, please provide
        additional details via the
        link below.</p>
          <Link href={{pathname:`/booking`, query: {fullname: props.userInformation.fullname, email:props.userInformation.email, countryCode:props.userInformation.countryCode,phone:props.userInformation.phone, university: props.userInformation.university,leadId:props.userInformation.leadId}}}>
          <Button variant="primary" size="md" className="btn primary-btn btn-block complete_btn">
          Complete your booking
           </Button>
         </Link>
         </React.Fragment>
         :
           null
        }

      </div>
    );
  };

  export default FormSubmit;
