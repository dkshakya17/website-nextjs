import React, { useState } from "react";
import { connect } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import MonthPickerInput from 'react-month-picker-calendar';
require('react-month-picker-calendar/dist/react-month-picker-input.css');

class Hero extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moveIn: {month:'', year:''},
            moveOut: {month:'',year:''},
            moveInText: 'Move In',
            moveOutText:'Move Out',
            moveInIsOpen: false,
            moveOutIsOpen: false,
            firstDown:true,
            activeSuggestion: 0,
            suggestions: [],
            showSuggestions: false,
            userInput: "",
            showClear: false,
            path:"",
            inputMap : new Map()
          };

        this.openMoveInPicker = this.openMoveInPicker.bind(this);
        this.openMoveOutPicker = this.openMoveOutPicker.bind(this)

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

      openMoveInPicker() {
          if(!this.state.showSuggestions) {
            this.setState({
                moveInIsOpen: !this.state.moveInIsOpen,
                moveOutIsOpen:false
            });
          }
      };

      openMoveOutPicker() {
        this.setState({
            moveOutIsOpen: !this.state.moveOutIsOpen,
            moveInIsOpen:false
        });
      };

      updateMoveIn(selectedYear, selectedMonth) {
        let results = selectedMonth.split("/");
        let moveIn = {month: results[0], year: selectedYear};
        let moveInText = `${selectedMonth}`;
        this.setState({moveIn: moveIn, moveInIsOpen: false, moveInText: moveInText});
      }

      updateMoveOut(selectedYear, selectedMonth) {
        let results = selectedMonth.split("/");
        let moveOut = {month: results[0], year: selectedYear};
        let moveOutText = `${selectedMonth}`;
        this.setState({moveOut: moveOut, moveOutIsOpen: false, moveOutText});
      }

      onChange = e => {
        const userInput = e.currentTarget.value;
        let suggestions = this.state.inputMap.get(userInput);

        if(suggestions) {
            this.setState({
                activeSuggestion: 0,
                suggestions: suggestions,
                showSuggestions: true,
                userInput : userInput
             });
        }
        else {
            this.setState({userInput }, () => {
                axios.get(`https://uniacco.com/api/v1/search?q=${userInput}`).then((res)=> {
                    let suggestions = res.data.results;
                    let showSuggestions = suggestions.length > 0 ? true:false;
                      this.setState((prevState)=> {
                          const temp = new Map(prevState.suggestions);
                          temp.set(userInput, suggestions);

                         return  {
                             activeSuggestion: 0,
                             suggestions: suggestions,
                             inputMap: temp,
                             showSuggestions: showSuggestions                          };
                      });
                 }).catch((err)=> {
                     console.log("error",err);
                 })
            })
        }
    };

    formatSuggestion = (suggestion) => {
        let result = suggestion.title;
        result = result ? ` ${result}, ${suggestion.city}`: `${suggestion.city}`;
        result = suggestion.state?`, ${suggestion.state}` : `${result}`;
        result = result ? `${result}, ${suggestion.country}`: '';

        return result;
    }

    onClick = e => {
        let suggestion = this.state.suggestions[e];
        if(suggestion) {
            let input = this.formatSuggestion(suggestion);

            this.setState({
                activeSuggestion: e,
                showSuggestions: false,
                userInput: input,
                path: suggestion.link
            });
        }
    };

    onKeyDown = e => {

        const {
            activeSuggestion,
            suggestions
        } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            if(suggestions[activeSuggestion]) {
                let suggestion = suggestions[activeSuggestion];
                let input = this.formatSuggestion(suggestion);
                this.setState({
                    activeSuggestion: activeSuggestion,
                    showSuggestions: false,
                    userInput: input,
                    path: suggestion.link
                }, () => {
                    window.location = suggestion.link;
                });
            }
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            let suggestion = suggestions[activeSuggestion - 1];
            let input = this.formatSuggestion(suggestion);

            this.setState({
                activeSuggestion : activeSuggestion - 1,
                userInput : input,
                path : suggestion.link
            });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (this.state.activeSuggestion === suggestions.length -1) {
                return;
            }

            let activeSuggestion = !this.state.firstDown? this.state.activeSuggestion + 1 :  this.state.activeSuggestion;
            let suggestion = suggestions[activeSuggestion];
            if(suggestion) {
                let input = this.formatSuggestion(suggestion);

                this.setState({
                    userInput:input,
                    activeSuggestion: activeSuggestion,
                    firstDown:false,
                    path: suggestion.link
                });
            }
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
              activeSuggestion,
              suggestions,
              showSuggestions,
              userInput
            }
          } = this;


    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (suggestions.length) {

        suggestionsListComponent = (
            <div className="suggestion_postion">
          <div className="suggestions">
            {
                suggestions.map((suggestion, index) => {
                let sugesstioncClass = index === suggestions.length -1 ? "d-flex align-items-center suggestion_wrapper": "d-flex align-items-center bottom_highlighter suggestion_wrapper";

                return (
                    <React.Fragment key={index}>
                        <a href={suggestion.link}>
                        <div className={sugesstioncClass}>
                            <div className="location_img">
                                <img src="/location.png"></img>
                            </div>
                            <div className="suggestion_content" onClick={()=>onClick(index)}>
                                <span className="font_primary_color">{suggestion.title? suggestion.title: suggestion.city} <br/> <span className="font_secondary_color">{suggestion.title? `${suggestion.city}, ${suggestion.country}`: suggestion.country}</span></span>

                            </div>
                        </div>
                        </a>
                    </React.Fragment>
              );
            })}
          </div>
          </div>
        );
      }
    }

return <section>
<Container fluid className="hero_img align_center">
    <div>
        <div md={12} lg={12} sm={12}>
            <p className="header_text_font_size white">redefining
                    student<br /> accommodation  & living </p>
        </div>
        <div className="header_input">
        <div className="width_100">
                <input type="text" className="uniacco_input" placeholder="Search by college or city... "
                 onChange={onChange}
                 onKeyDown={onKeyDown}
                 value={this.state.userInput} />
            </div>
            <div className="d-flex flex_wrap justify-content-center align-items-center">
            {/* <Button className="UniAcco_btn move  input_btn_font Input_btn_mr" onClick={this.openMoveInPicker}>{this.state.moveInText}</Button>
                <div className="moveIn">
                    <MonthPickerInput
                        value={new Date()}
                        onChangeYearUpdate={true}
                        closeOnSelect={true}
                        isOpen ={this.state.moveInIsOpen}
                        onChange={(selectedMonth, selectedYear) => this.updateMoveIn(selectedYear, selectedMonth) }/>
                </div>

                <Button className="UniAcco_btn move input_btn_font Input_btn_mr"  onClick={this.openMoveOutPicker}>{this.state.moveOutText}</Button>
                <div className="moveOut">
                    <MonthPickerInput
                        value={new Date()}
                        onChangeYearUpdate={true}
                        closeOnSelect={true}
                        isOpen ={this.state.moveOutIsOpen}
                        onChange={(selectedMonth, selectedYear) => this.updateMoveOut(selectedYear, selectedMonth) }/>
                </div> */}
               {
                   this.state.userInput ?   <div className="d-flex flex_wrap justify-content-center clearAll" onClick= {()=> { this.setState({userInput:''});}}> <img className="cross_icon" src="/icons/noun_Cross.svg"/></div>
                   :null
               }

                <Button className="UniAcco_btn primary_color Input_btn_mr submit_btn_wd">
                   <Link href={{ pathname: this.state.path, query: { moveInMonth: this.state.moveIn.month, moveInYear: this.state.moveIn.year, moveOutMonth: this.state.moveOut.month, moveOutYear: this.state.moveOut.year}}}>
                    <Image src="/icons/left-arrow.svg" alt="" />
                   </Link>
                </Button>
            </div>
        </div>
        {suggestionsListComponent}


    </div>
    {/* <div className="hero_explore">
        <Button className="hero_explore_btn"  href={`/uk/chester`}>explore all homes<br/><span className="icon"></span></Button>
    </div> */}
</Container>
<style type="text/css"> {`
    .cross_icon {
        width:20px;
        height:20px;
    }

    .clearAll {
        height:10px;
        align-items:center;
    }

    .active_search {
        background-color:grey;
    }

    .cross_icon_wrap {
        text-align:center;
    }

    section {
        padding: 0px !important;
    }
    .suggestion_content {
        padding: 8px 30px;
    }

    .hero_explore {
        position: absolute;
        text-align: right;
        right: 0;
        top: 400px;
    }

    .hero_explore_btn {
        background-color: #054d7f;

    }

    .hero_explore_btn:hover {
        background-color: #054d7f;
    }

    .hero_explore_btn span.icon {
        background: url('./arrow.png') no-repeat;
        float: left;
        margin-top: 10px;
        width: 10px;
        height: 40px;
    }

    .location_img{
        padding-left:10px;
    }

   .moveIn input {
        display:none;
   }

   .moveOut input {
        display:none;
   }

   .bottom_highlighter {
         border-bottom: 1px solid #e2e0de;
   }

.suggestions {
    border-radius: 12px;
    /* padding: 14px; */
    /* margin-top: 4px; */
    position: absolute;
    border: 1px solid #e2e0de;
    color: #f05c4e;
    margin-bottom: 0px;
    box-shadow: 0px grey;
    z-index: 1;
    width: 100%;
}
.suggestions a:hover {
    text-decoration: none;
}

.suggestion_wrapper:hover {
    background-color: #F4F4F4;;
}

.suggestion_postion{
    position:relative;
}
.review_card img {
    max-width: 70px;
    margin-bottom: 15px;
}
.suggestions:hover {
    cursor: pointer;
}


.selected_cell{
    background-color: #F05B4E !important;
}

.col_mp:hover{
    background-color: #F05B4E!important;
}

.header_text_font_size {
    font-size: 60px;
    font-family: 'Conv_clarika-grot-bold';
    line-height: 1.3;
}

.hero_img {
    background-image: url("/homebanner.jpg");
    background-repeat: no-repeat;
    width: 100%;
    height: 81vh;
    background-color: white;
    background-size: cover;
    background-position: bottom;
}

.hero_img:after {
    content: '';
    background-image: url("/side_line.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    height: 81vh;
    width: 10px;
}

.header_input {
    background-color: #fff;
    width: 100%;
    height: 55px !important;
    box-shadow: 10px 10px 10px 0 rgba(155, 167, 190, 0.2) !important;
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 5px solid rgba(155, 167, 190, 0.38);
    background: #fff;
}
.header_input>div{
    padding:10px 0;
}

.align_center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.uniacco_input {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.uniacco_input:focus {
    outline: none;
}

.input_btn_font {
    font-size: 16px;
    font-family: 'Conv_clarika-grot-regular';
    color: #9ba7be;
    background-color: #f4f6f8;
}

.input_btn_font:focus {
     color: #fff;
}


.input_btn_font:hover {
    color: #fff;
}


.Input_btn_mr{
    margin: 5px;
}

.suggestions{
    background-color: white;
    border-radius: 12px;
}

@media only screen and (min-width: 320px) and (max-width: 768px) {
    .cross_icon {
        margin-top: -10px;
    }

    .header_text_font_size{
        font-size: 25px;
    }
    .hero_img {
        height:20rem;
        background-color: white;
        background-size: contain;
        background-position: top;
    }
    .header_input>div {
        width:100%;
        padding: 0px 0 !important;
      }
    .react-multi-carousel-dot--active button
    {
        background: #101A42;
    }

    .move {
        display:none;
    }

    .hero_explore {
        top:430px;
    }

    .hero_img:after{
        display: none;
    }

    .header_input{
        flex-wrap: wrap;
        min-height: 100px;
        box-shadow: 1px 9px 18px 0px #e6d4c9;
        justify-content:center;
        border-radius: 12px;
    }

    .flex_wrap{
        flex-wrap: wrap;
    }

    .submit_btn_wd{
        width: 100%;
    }
}


.uniacco_input{
    /* margin-top:10px; */
}



`}
</style>
</section>
    }
}

export default Hero
