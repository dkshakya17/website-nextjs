import React, {useState, useEffect} from 'react'
import Select from "react-select" // v1
import "react-select/dist/react-select.css"
import axios from 'axios'

const UniversityField = ({pageUrl, getValue}) =>{
  const [placeData, setData] = useState();
  const [selectValue, setCurrValue] = useState();
  const handleChange = (val) =>{
      if(val){
        getValue(val);
        setCurrValue(val);
      }
  }
  useEffect(() => {
        axios.get(pageUrl).then((res) => {
          let wholeData = res.data.places.map((ele) =>{return {value:ele.code,label:ele.name}});
          setData(wholeData);
        }).catch(e => console.log(e));
  },[]);
  return (
    placeData? <Select
     name="university"
     placeholder="Enter university"
     onChange={(val) =>  handleChange(val)}
     value={selectValue}
     options={placeData}
     isMulti={false}
     isSearchable
     className="university_filter"
     />
        :null

  );
}

export default UniversityField;
