import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";

const Checkbox = ({ type = 'checkbox', name, checked = false, label, onChange }) => (
    <Form.Check
    name= {name}
    type={type}
    id={name}
    inline
    checked={checked}
    label={label} 
    onChange={onChange} />
  );
  
  Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  export default Checkbox;